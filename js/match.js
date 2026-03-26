import { ELEMENTS, LEVELS, getReactions, getAvailableElements } from './data/reactions.js';
import './style.css';

// ==========================================
//  State
// ==========================================
const state = {
    // Setup
    level: null,       // "初中" / "高中"
    difficulty: null,   // "easy" / "hard"
    mode: null,         // "random" / "custom"
    selectedElements: [],

    // Game
    currentLevel: 0,   // 0-indexed into LEVELS
    score: 0,
    combo: 0,
    maxCombo: 0,
    timer: 0,
    timerInterval: null,
    cards: [],
    reactions: [],      // all available reactions for this session
    levelReactions: [],  // reactions used in current level (for matching lookup)
    usedReactionIds: new Set(),
    selectedCards: [],
    matchedReactions: [],
    isProcessing: false,
};

// ==========================================
//  DOM References
// ==========================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
    setup: $('#setup-screen'),
    game: $('#game-screen'),
    levelup: $('#levelup-screen'),
    result: $('#result-screen'),
};

// ==========================================
//  Screen Management
// ==========================================
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

// ==========================================
//  Setup Flow
// ==========================================
function initSetup() {
    // Option button clicks
    $$('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            const value = btn.dataset.value;

            // Select this option
            btn.closest('.step-options').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Save state
            if (key === 'level') state.level = value;
            else if (key === 'difficulty') state.difficulty = value;
            else if (key === 'mode') state.mode = value;

            // Mark current step done, activate next
            const currentStep = btn.closest('.step');
            const currentStepNum = parseInt(currentStep.dataset.step);
            currentStep.classList.remove('active');
            currentStep.classList.add('done');

            if (key === 'mode') {
                if (value === 'custom') {
                    showElementPanel();
                } else {
                    hideElementPanel();
                    showStartButton();
                }
            } else {
                const nextStep = document.querySelector(`.step[data-step="${currentStepNum + 1}"]`);
                if (nextStep) {
                    nextStep.classList.add('active');
                }
            }
        });
    });
}

function showElementPanel() {
    const panel = $('#element-panel');
    panel.classList.remove('hidden');
    const grid = $('#element-grid');
    grid.innerHTML = '';

    const elements = getAvailableElements(state.level);
    state.selectedElements = [];

    elements.forEach(el => {
        const btn = document.createElement('button');
        btn.className = 'element-btn';
        btn.innerHTML = `
      <span class="el-icon">${el.icon}</span>
      <span class="el-symbol">${el.symbol}</span>
      <span class="el-name">${el.name}</span>
      <span class="el-count">${el.reactionCount} 个反应</span>
    `;
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            if (btn.classList.contains('selected')) {
                state.selectedElements.push(el.symbol);
            } else {
                state.selectedElements = state.selectedElements.filter(s => s !== el.symbol);
            }
            updateStartButton();
        });
        grid.appendChild(btn);
    });

    showStartButton();
    updateStartButton();
}

function hideElementPanel() {
    $('#element-panel').classList.add('hidden');
    state.selectedElements = [];
}

function showStartButton() {
    $('#start-btn').classList.remove('hidden');
}

function updateStartButton() {
    const btn = $('#start-btn');
    if (state.mode === 'custom' && state.selectedElements.length === 0) {
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
    } else {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    }
}

// ==========================================
//  Game Initialization
// ==========================================
function startGame() {
    // Get all reactions
    state.reactions = getReactions(state.level, state.selectedElements);
    shuffleArray(state.reactions);

    // Reset game state
    state.currentLevel = 0;
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.usedReactionIds = new Set();
    state.matchedReactions = [];
    state.timer = 0;

    startTimer();
    loadLevel();
}

function loadLevel() {
    const levelConfig = LEVELS[state.currentLevel];
    if (!levelConfig) {
        endGame();
        return;
    }

    // Check available reactions
    const availableReactions = state.reactions.filter(r => !state.usedReactionIds.has(r.id));
    if (availableReactions.length < levelConfig.pairs) {
        endGame();
        return;
    }

    // Pick reactions for this level
    const levelReactions = availableReactions.slice(0, levelConfig.pairs);
    levelReactions.forEach(r => state.usedReactionIds.add(r.id));
    state.levelReactions = levelReactions;

    // Create cards: each reaction produces 2 cards (the two reacting substances)
    state.cards = [];
    state.selectedCards = [];
    state.isProcessing = false;

    levelReactions.forEach(reaction => {
        state.cards.push({
            id: `${reaction.id}-1`,
            reactionId: reaction.id,
            text: reaction.card1.text,
            type: reaction.card1.type,
            matched: false,
        });
        state.cards.push({
            id: `${reaction.id}-2`,
            reactionId: reaction.id,
            text: reaction.card2.text,
            type: reaction.card2.type,
            matched: false,
        });
    });

    // Shuffle cards
    shuffleArray(state.cards);

    // Render
    showScreen('game');
    renderGameBoard(levelConfig);
    updateGameHeader();
}

// ==========================================
//  Rendering
// ==========================================
function renderGameBoard(levelConfig) {
    const board = $('#game-board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${levelConfig.cols}, 1fr)`;

    state.cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = 'card';
        el.dataset.index = index;
        el.dataset.type = card.type;
        el.innerHTML = `<span class="card-text">${card.text}</span>`;

        el.addEventListener('click', () => onCardClick(index));

        // Staggered entrance
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5)';
        setTimeout(() => {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }, index * 30);

        board.appendChild(el);
    });
}

function updateGameHeader() {
    $('#level-display').textContent = state.currentLevel + 1;
    $('#score-display').textContent = state.score;
    $('#combo-display').textContent = state.combo;
    updateTimer();
}

function updateTimer() {
    const m = String(Math.floor(state.timer / 60)).padStart(2, '0');
    const s = String(state.timer % 60).padStart(2, '0');
    $('#timer-display').textContent = `${m}:${s}`;
}

function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        state.timer++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timerInterval);
}

// ==========================================
//  Card Click & Matching Logic
// ==========================================
function onCardClick(index) {
    if (state.isProcessing) return;

    const card = state.cards[index];
    if (!card || card.matched) return;

    // Already selected? Deselect
    if (state.selectedCards.includes(index)) {
        state.selectedCards = state.selectedCards.filter(i => i !== index);
        getCardElement(index).classList.remove('selected');
        updateEquationDisplay();
        return;
    }

    // Select
    state.selectedCards.push(index);
    getCardElement(index).classList.add('selected');
    updateEquationDisplay();

    // Two cards selected → check match
    if (state.selectedCards.length === 2) {
        checkMatch();
    }
}

function getCardElement(index) {
    return $(`#game-board .card[data-index="${index}"]`);
}

function updateEquationDisplay() {
    const display = $('#equation-display');
    if (state.selectedCards.length === 0) {
        display.innerHTML = '<span class="eq-placeholder">选择两张可以发生反应的物质 💡</span>';
    } else if (state.selectedCards.length === 1) {
        const card = state.cards[state.selectedCards[0]];
        display.innerHTML = `<span class="eq-placeholder">已选: <strong>${card.text}</strong> — 再选一张能与之反应的物质</span>`;
    }
}

/**
 * 核心匹配逻辑：检查两张卡牌上的物质是否能发生反应
 * 关键：同一反应的 card1 和 card2 才能消除
 */
async function checkMatch() {
    state.isProcessing = true;
    const [i1, i2] = state.selectedCards;
    const card1 = state.cards[i1];
    const card2 = state.cards[i2];

    // 查找是否存在一个反应，使得 card1 和 card2 分别对应该反应的两个物质
    const matchedReaction = findReaction(card1, card2);

    if (matchedReaction) {
        if (state.difficulty === 'hard') {
            const correct = await showCoefficientModal(matchedReaction);
            if (correct) {
                handleCorrectMatch(i1, i2, matchedReaction);
            } else {
                handleWrongMatch(i1, i2);
            }
        } else {
            handleCorrectMatch(i1, i2, matchedReaction);
        }
    } else {
        handleWrongMatch(i1, i2);
    }
}

/**
 * 查找两张卡牌对应的反应
 * 只要两张卡牌上的物质名能匹配任意一个已知反应即可消除
 */
function findReaction(card1, card2) {
    if (card1.id === card2.id) return null;
    const t1 = card1.text;
    const t2 = card2.text;
    // 在当前关卡的所有反应中查找：card1 和 card2 的物质名是否构成某个反应的一对
    return state.levelReactions.find(r =>
        (r.card1.text === t1 && r.card2.text === t2) ||
        (r.card1.text === t2 && r.card2.text === t1)
    ) || null;
}

function handleCorrectMatch(i1, i2, reaction) {
    state.combo++;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;

    const comboBonus = Math.min(state.combo - 1, 5) * 20;
    const points = 100 + comboBonus;
    state.score += points;

    state.matchedReactions.push(reaction);
    state.cards[i1].matched = true;
    state.cards[i2].matched = true;

    const el1 = getCardElement(i1);
    const el2 = getCardElement(i2);
    el1.classList.remove('selected');
    el2.classList.remove('selected');
    el1.classList.add('matched');
    el2.classList.add('matched');

    // Show balanced equation
    const display = $('#equation-display');
    display.innerHTML = `<span class="eq-success">✅ ${reaction.balanced}</span>`;

    if (state.combo > 1) {
        showToast(`🔥 ${state.combo}连击! +${points}分`);
    }

    setTimeout(() => {
        el1.classList.add('gone');
        el2.classList.add('gone');
    }, 500);

    state.selectedCards = [];
    updateGameHeader();

    setTimeout(() => {
        state.isProcessing = false;
        if (state.cards.every(c => c.matched)) {
            onLevelComplete();
        }
    }, 600);
}

function handleWrongMatch(i1, i2) {
    state.combo = 0;

    const el1 = getCardElement(i1);
    const el2 = getCardElement(i2);
    el1.classList.add('wrong');
    el2.classList.add('wrong');

    const display = $('#equation-display');
    display.innerHTML = `<span class="eq-error">❌ 这两个物质不能反应，再试试</span>`;

    setTimeout(() => {
        el1.classList.remove('selected', 'wrong');
        el2.classList.remove('selected', 'wrong');
        state.selectedCards = [];
        state.isProcessing = false;
    }, 600);

    updateGameHeader();
}

// ==========================================
//  Coefficient Modal (Hard mode)
// ==========================================
function showCoefficientModal(reaction) {
    return new Promise(resolve => {
        const modal = $('#coefficient-modal');
        const eqDisplay = $('#modal-equation');
        const optionsContainer = $('#coefficient-options');

        // Show the two substances
        eqDisplay.textContent = `${reaction.card1.text} + ${reaction.card2.text} → ?`;
        optionsContainer.innerHTML = '';

        const correctBalanced = reaction.balanced;
        const distractors = generateDistractors(reaction);
        const options = shuffleArray([correctBalanced, ...distractors]);

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'coeff-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => {
                const isCorrect = option === correctBalanced;
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');

                optionsContainer.querySelectorAll('.coeff-btn').forEach(b => {
                    if (b.textContent === correctBalanced) b.classList.add('correct');
                    b.style.pointerEvents = 'none';
                });

                setTimeout(() => {
                    modal.classList.add('hidden');
                    resolve(isCorrect);
                }, 800);
            });
            optionsContainer.appendChild(btn);
        });

        modal.classList.remove('hidden');
    });
}

function generateDistractors(reaction) {
    const distractors = [];
    distractors.push(tweakEquation(reaction.balanced, 1));
    distractors.push(tweakEquation(reaction.balanced, 2));
    return distractors.slice(0, 2);
}

function tweakEquation(balanced, variant) {
    const numbers = balanced.match(/\d+/g) || [];
    if (numbers.length === 0) return balanced + ' (×2)';

    let tweaked = balanced;
    if (variant === 1) {
        const idx = Math.floor(Math.random() * numbers.length);
        const target = numbers[idx];
        const replacement = String(parseInt(target) * 2);
        tweaked = replaceNth(balanced, target, replacement, idx);
    } else {
        const idx = Math.floor(Math.random() * numbers.length);
        const target = numbers[idx];
        const val = parseInt(target);
        const newVal = val > 1 ? val - 1 : val + 2;
        tweaked = replaceNth(balanced, target, String(newVal), idx);
    }
    return tweaked === balanced ? balanced.replace(/(\d)/, (m) => String(parseInt(m) + 1)) : tweaked;
}

function replaceNth(str, search, replacement, n) {
    let count = 0;
    return str.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), (match) => {
        if (count === n) { count++; return replacement; }
        count++;
        return match;
    });
}

// ==========================================
//  Level Completion
// ==========================================
function onLevelComplete() {
    const nextLevel = state.currentLevel + 1;
    const nextConfig = LEVELS[nextLevel];
    const remainingReactions = state.reactions.filter(r => !state.usedReactionIds.has(r.id));

    if (!nextConfig || remainingReactions.length < nextConfig.pairs) {
        endGame();
        return;
    }

    const stats = $('#levelup-stats');
    stats.innerHTML = `
    第 ${state.currentLevel + 1} 关完成！<br>
    当前得分: <strong>${state.score}</strong> 分<br>
    下一关: ${nextConfig.cols}×${nextConfig.rows} 网格 (${nextConfig.pairs} 对反应)
  `;

    showScreen('levelup');
}

// ==========================================
//  Game End
// ==========================================
function endGame() {
    stopTimer();

    const m = String(Math.floor(state.timer / 60)).padStart(2, '0');
    const s = String(state.timer % 60).padStart(2, '0');

    const statsEl = $('#result-stats');
    statsEl.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${state.score}</div>
      <div class="stat-label">总分</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.currentLevel + 1}</div>
      <div class="stat-label">通过关卡</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.maxCombo}</div>
      <div class="stat-label">最大连击</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${m}:${s}</div>
      <div class="stat-label">用时</div>
    </div>
  `;

    const reactionsEl = $('#result-reactions');
    if (state.matchedReactions.length > 0) {
        reactionsEl.innerHTML = `
      <h4>📖 本局匹配的方程式</h4>
      ${state.matchedReactions.map(r => `
        <div class="reaction-item">
          ${r.balanced}
          <span class="r-type">[ ${r.type}${r.condition ? ' · ' + r.condition : ''} ]</span>
        </div>
      `).join('')}
    `;
    } else {
        reactionsEl.innerHTML = '';
    }

    showScreen('result');
}

// ==========================================
//  Utility
// ==========================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ==========================================
//  Reset & Replay
// ==========================================
function resetSetup() {
    state.level = null;
    state.difficulty = null;
    state.mode = null;
    state.selectedElements = [];
    state.currentLevel = 0;
    state.score = 0;
    state.combo = 0;
    state.maxCombo = 0;
    state.timer = 0;
    state.usedReactionIds.clear();
    state.matchedReactions = [];
    stopTimer();

    $$('.step').forEach((step, i) => {
        step.classList.remove('done', 'active');
        if (i === 0) step.classList.add('active');
    });
    $$('.option-btn').forEach(b => b.classList.remove('selected'));
    hideElementPanel();
    $('#start-btn').classList.add('hidden');

    showScreen('setup');
}

// ==========================================
//  Event Bindings
// ==========================================
function init() {
    initSetup();

    $('#start-btn').addEventListener('click', () => {
        if (state.mode === 'custom' && state.selectedElements.length === 0) return;
        startGame();
    });

    $('#next-level-btn').addEventListener('click', () => {
        state.currentLevel++;
        loadLevel();
    });

    $('#back-btn').addEventListener('click', () => {
        if (confirm('确定要退出当前游戏吗？')) {
            resetSetup();
        }
    });

    $('#replay-btn').addEventListener('click', () => {
        resetSetup();
    });
}

init();
