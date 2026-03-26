import { reactionDB, topicDB, customDB } from './data.js';
import { checkByRuleEngine } from './chemEngine.js';

/* ========================================
   化学反应连连看 - 核心逻辑文件
   ======================================== */

// ========================================
// 关卡配置 (基础关卡，第5关开始为无尽模式)
// ========================================

const levels = [
    { level: 1, rows: 4, cols: 4, time: 60, modules: ['oxygen'] },
    { level: 2, rows: 6, cols: 4, time: 90, modules: ['oxygen', 'carbonAndMetal'] },
    { level: 3, rows: 6, cols: 6, time: 120, modules: ['carbonAndMetal', 'acidBaseSalt'] },
    { level: 4, rows: 8, cols: 6, time: 150, modules: ['oxygen', 'carbonAndMetal', 'acidBaseSalt'] }
];

// 无尽模式配置
const ENDLESS_CONFIG = {
    rows: 8,
    cols: 6,
    modules: ['oxygen', 'carbonAndMetal', 'acidBaseSalt']
};

/**
 * 获取关卡配置（支持无尽模式）
 * @param {number} levelNum - 关卡数
 * @returns {object} 关卡配置
 */
function getLevelConfig(levelNum) {
    if (levelNum <= 4) {
        return levels[levelNum - 1];
    }
    
    // 无尽模式：动态计算时间
    // 第4关为150秒，之后每升一关减少10秒，最低90秒
    const time = Math.max(90, 150 - (levelNum - 4) * 10);
    
    return {
        level: levelNum,
        rows: ENDLESS_CONFIG.rows,
        cols: ENDLESS_CONFIG.cols,
        time: time,
        modules: ENDLESS_CONFIG.modules
    };
}

// ========================================
// 音效管理器 - Web Audio API
// ========================================

const SoundManager = {
    audioContext: null,
    isInitialized: false,
    
    init() {
        if (this.isInitialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
        } catch (e) {
            console.warn('Web Audio API 不可用');
        }
    },
    
    ensureContext() {
        if (!this.isInitialized) this.init();
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },
    
    playClick() {
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    },
    
    playMatchSuccess() {
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        
        [[880, 0, 0.2], [1320, 0.08, 0.35], [1760, 0.15, 0.4]].forEach(([freq, delay, duration]) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + delay);
            gain.gain.setValueAtTime(0.2, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + duration);
        });
    },
    
    playMatchFail() {
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    },
    
    playTickTock() {
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        [[1000, 0], [800, 0.1]].forEach(([freq, delay]) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + delay);
            gain.gain.setValueAtTime(0.15, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.05);
        });
    },
    
    playWin() {
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const notes = [
            { freq: 523, delay: 0, duration: 0.15 },
            { freq: 659, delay: 0.12, duration: 0.15 },
            { freq: 784, delay: 0.24, duration: 0.15 },
            { freq: 1047, delay: 0.36, duration: 0.3 },
            { freq: 1319, delay: 0.5, duration: 0.4 }
        ];
        notes.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.freq, now + note.delay);
            gain.gain.setValueAtTime(0.2, now + note.delay);
            gain.gain.setValueAtTime(0.2, now + note.delay + note.duration * 0.7);
            gain.gain.exponentialRampToValueAtTime(0.01, now + note.delay + note.duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + note.delay);
            osc.stop(now + note.delay + note.duration);
        });
    }
};

// ========================================
// 物质类别判断工具函数
// ========================================

/**
 * 判断物质属于哪种类别
 * @param {string} htmlContent - 物质的HTML内容（可能包含<sub>标签）
 * @returns {string} 物质类别：'acid' | 'base' | 'metal' | 'other'
 */
function getSubstanceCategory(htmlContent) {
    // 移除HTML标签和系数，获取纯文本化学式
    const formula = htmlContent.replace(/<[^>]*>/g, '').replace(/^(\d+)/, '');
    
    // 酸类判断：以H开头（常见酸：HCl, H2SO4, HNO3, H2CO3, H3PO4, H2S）
    if (/^H(?:Cl|2SO4|NO3|2CO3|3PO4|2S|2SO3)/i.test(formula) || formula.match(/^H[A-Z]/) || formula.match(/^\d*H\d*[A-Z]/)) {
        return 'acid';
    }
    
    // 碱类判断：以OH结尾或含有(OH)（常见碱：NaOH, KOH, Ca(OH)2, Ba(OH)2）
    if (/\(OH\)|OH$|NH3/i.test(formula) || formula.match(/OH/) || formula.match(/\(OH\)/)) {
        return 'base';
    }
    
    // 金属判断：以金属元素符号开头
    if (/^(Mg|Zn|Fe|Cu|Al|Ca|Ba|Na|K|Ag|Mn|Pb|Sn|Hg|Au|Pt)/i.test(formula) || 
        formula.match(/^(Na|K|Ca|Mg|Al|Zn|Fe|Cu|Ag|Ba|Hg)$/) ||
        formula.match(/^(CuO|Fe2O3|Fe3O4|MgO|CaO|ZnO|Al2O3)$/)) {
        return 'metal';
    }
    
    // 其他类别
    return 'other';
}

// ========================================
// 全局变量定义
// ========================================

// 得分与扣分数值
const SCORE_PER_MATCH = 10;
const PENALTY_PER_MISS = 1;

let gameBoard = [];
let selectedTile = null;
let score = 0;
let remainingTiles = 0;
let currentMode = 'easy';
let currentReactions = [];
let currentLevel = 1;
let currentLevelConfig = null;
let currentLevelReactions = [];
let timeLeft = 0;
let timerInterval = null;
let gameStartTime = 0;
let isGameRunning = false;

let currentStage = 'high';
let isHardMode = false;
let selectedTopics = [];

let currentEqType = 'chemical'; // 'chemical', 'ionic', 'mixed'

// 专题模式相关变量
let currentTopic = null; // 当前选中的专题，null 表示普通全库随机模式
let topicReactions = []; // 当前专题的反应对列表

let boardElement, scoreElement, shuffleButton, lineCanvas, lineCtx;
let easyModeBtn, hardModeBtn, restartBtn;
let levelDisplay, timerDisplay, timerElement;
let modalOverlay, modalBox, modalContent, modalButtons;

// ========================================
// 菜单流转控制函数
// ========================================

function goToStep(stepNumber) {
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    document.getElementById('step-' + stepNumber).classList.remove('hidden');
}

function selectStage(stage) {
    currentStage = stage;
    document.getElementById('btn-custom-scope').style.display = (stage === 'middle') ? 'none' : 'block';
    goToStep(2);
}

function startGame(stage) {
    currentStage = stage;
    isHardMode = false;
    currentMode = 'easy';
    currentTopic = null;
    topicReactions = [];
    selectedTopics = [];
    launchGame();
}

function selectMode(mode) {
    isHardMode = (mode === 'hard');
    currentMode = isHardMode ? 'hard' : 'easy';
    goToStep(3);
}

function selectScope(scopeType) {
    if (scopeType === 'all') {
        selectedTopics = [];
        currentTopic = null;
        topicReactions = [];
        launchGame();
    }
}

function openCustomScope() {
    document.getElementById('topic-modal').classList.add('show');
}

function launchGame() {
    document.getElementById('start-menu').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    currentLevel = 1;
    initGame();
}

window.resetToMainMenu = function() {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('tutorial-modal').classList.add('hidden');
    document.getElementById('start-menu').classList.remove('hidden');
    
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    
    if (typeof timerInterval !== 'undefined' && timerInterval) clearInterval(timerInterval);
    if (typeof selectedTopics !== 'undefined') selectedTopics = [];
    if (typeof currentTopic !== 'undefined') currentTopic = null;
    if (typeof topicReactions !== 'undefined') topicReactions = [];
    if (typeof score !== 'undefined') score = 0;
    if (typeof currentLevel !== 'undefined') currentLevel = 1;
};

// ========================================
// 成就系统定义
// ========================================

const ACHIEVEMENTS = [
    { id: 'first_match', name: '初试身手', desc: '完成第一次匹配', icon: '🎯', condition: (stats) => stats.totalMatches >= 1 },
    { id: 'score_100', name: '百分达人', desc: '单局得分达到100分', icon: '💯', condition: (stats) => stats.currentScore >= 100 },
    { id: 'score_500', name: '化学高手', desc: '单局得分达到500分', icon: '⚗️', condition: (stats) => stats.currentScore >= 500 },
    { id: 'score_1000', name: '化学大师', desc: '单局得分达到1000分', icon: '🏆', condition: (stats) => stats.currentScore >= 1000 },
    { id: 'level_5', name: '无尽探索', desc: '到达第5波', icon: '🌊', condition: (stats) => stats.maxLevel >= 5 },
    { id: 'level_10', name: '化学狂人', desc: '到达第10波', icon: '🔥', condition: (stats) => stats.maxLevel >= 10 },
    { id: 'level_20', name: '反应之王', desc: '到达第20波', icon: '👑', condition: (stats) => stats.maxLevel >= 20 },
    { id: 'matches_50', name: '连连看达人', desc: '累计匹配50对', icon: '🔗', condition: (stats) => stats.totalMatches >= 50 },
    { id: 'matches_100', name: '连线大师', desc: '累计匹配100对', icon: '✨', condition: (stats) => stats.totalMatches >= 100 },
    { id: 'speed_demon', name: '速度恶魔', desc: '在30秒内完成一关', icon: '⚡', condition: (stats) => stats.fastestLevelTime > 0 && stats.fastestLevelTime <= 30 },
    { id: 'no_shuffle', name: '完美主义', desc: '不使用洗牌完成一关', icon: '💎', condition: (stats) => stats.noShuffleLevel },
    { id: 'hard_master', name: '困难大师', desc: '在困难模式下到达第5波', icon: '🎖️', condition: (stats) => stats.hardModeLevel >= 5 }
];

let playerStats = {
    totalMatches: 0,
    currentScore: 0,
    maxLevel: 0,
    maxScore: 0,
    fastestLevelTime: 0,
    noShuffleLevel: false,
    hardModeLevel: 0,
    usedShuffleThisLevel: false
};

let unlockedAchievements = [];

// ========================================
// 工具函数
// ========================================

function removeCoefficient(formula) {
    return formula.replace(/^(\d+)/, '');
}

/**
 * 判断是否为离子方程式
 * 检测是否包含正负电荷上标符号（兼容 Unicode 和 HTML 标签）
 */
function isIonicEquation(pair) {
    const strA = pair[0] || "";
    const strB = pair[1] || "";
    
    // 检测 Unicode 上标电荷符号
    const unicodeRegex = /[⁺⁻]/;
    
    // 检测 HTML 上标电荷标签
    const htmlRegex = /<sup[^>]*>.*[+-].*<\/sup>/i;
    
    // 检测带电荷的离子符号（如 H⁺, OH⁻, Fe³⁺ 等）
    const ionicPattern = /[A-Za-z][⁺⁻]|[A-Za-z]\d*[⁺⁻]/;
    
    return unicodeRegex.test(strA) || unicodeRegex.test(strB) || 
           htmlRegex.test(strA) || htmlRegex.test(strB) ||
           ionicPattern.test(strA) || ionicPattern.test(strB);
}

/**
 * 根据方程式类型过滤反应对
 */
function filterByEquationType(reactions) {
    if (currentEqType === 'mixed') {
        return reactions; // 混合全开，不过滤
    }
    
    return reactions.filter(pair => {
        const ionic = isIonicEquation(pair);
        if (currentEqType === 'chemical') {
            return !ionic; // 只要化学方程式
        }
        if (currentEqType === 'ionic') {
            return ionic; // 只要离子方程式
        }
        return true;
    });
}

/**
 * 处理反应数据，根据模式决定是否保留系数
 * 同时保留特效标签（第三个元素）
 */
function processReactionsForMode(reactions) {
    // 先按方程式类型过滤
    let filtered = filterByEquationType(reactions);
    
    if (currentMode === 'hard') {
        return filtered.map(reaction => [...reaction]);
    } else {
        return filtered.map(reaction => {
            // 处理前两个元素（反应物），移除系数
            const processed = reaction.slice(0, 2).map(r => removeCoefficient(r));
            // 如果有第三个元素（特效标签），保留它
            if (reaction.length > 2) {
                processed.push(reaction[2]);
            }
            return processed;
        });
    }
}

function generateLevelReactions(levelConfig) {
    let reactions = [];
    
    // 合并教材库和自定义库
    if (Array.isArray(reactionDB)) {
        reactions = [...reactionDB];
    }
    
    // 合并自定义题库
    if (typeof customDB !== 'undefined' && Array.isArray(customDB)) {
        reactions = [...reactions, ...customDB];
    }
    
    console.log(`[题库合并] 教材库: ${reactionDB.length}, 自定义库: ${customDB?.length || 0}, 总计: ${reactions.length}`);
    
    return reactions;
}

/**
 * 获取反应的特效类型
 * @param {string} substance1 - 反应物1
 * @param {string} substance2 - 反应物2
 * @returns {string|null} 特效类型：'gas' | 'ppt' | 'fire' | null
 */
function getReactionEffect(substance1, substance2) {
    for (let reaction of currentReactions) {
        if ((reaction[0] === substance1 && reaction[1] === substance2) ||
            (reaction[0] === substance2 && reaction[1] === substance1)) {
            // 返回第三个元素（特效标签），如果没有则返回null
            return reaction.length > 2 ? reaction[2] : null;
        }
    }
    return null;
}

// ========================================
// 视觉特效系统
// ========================================

/**
 * 播放视觉特效
 * @param {HTMLElement} blockElement - 方块元素
 * @param {string} effectType - 特效类型：'gas' | 'ppt' | 'fire'
 */
function playVisualEffect(blockElement, effectType) {
    if (!effectType) return;
    
    // 获取方块在屏幕上的绝对坐标
    const rect = blockElement.getBoundingClientRect();
    
    // 特效配置
    const effectConfig = {
        'gas': { emoji: '🫧', className: 'effect-gas' },
        'ppt': { emoji: '⬇️', className: 'effect-ppt' },
        'fire': { emoji: '✨', className: 'effect-fire' }
    };
    
    const config = effectConfig[effectType];
    if (!config) return;
    
    // 创建特效元素
    const effectEl = document.createElement('div');
    effectEl.className = `reaction-effect ${config.className}`;
    effectEl.textContent = config.emoji;
    
    // 设置绝对定位到方块中心
    effectEl.style.left = `${rect.left + rect.width / 2}px`;
    effectEl.style.top = `${rect.top + rect.height / 2}px`;
    
    // 添加到body
    document.body.appendChild(effectEl);
    
    // 动画播放完毕后移除
    setTimeout(() => {
        effectEl.remove();
    }, 800);
}

// ========================================
// 初始化 DOM 引用
// ========================================

function initDOMReferences() {
    boardElement = document.getElementById('game-board');
    scoreElement = document.getElementById('score');
    shuffleButton = document.getElementById('shuffle-btn');
    lineCanvas = document.getElementById('line-canvas');
    lineCtx = lineCanvas.getContext('2d');
    
    easyModeBtn = document.getElementById('easy-mode-btn');
    hardModeBtn = document.getElementById('hard-mode-btn');
    restartBtn = document.getElementById('btn-restart');
    
    levelDisplay = document.getElementById('level-display');
    timerDisplay = document.getElementById('timer-display');
    timerElement = document.querySelector('.info-timer');
    
    modalOverlay = document.getElementById('modal-overlay');
    modalBox = document.getElementById('modal-box');
    modalContent = modalBox.querySelector('.modal-content');
    modalButtons = modalBox.querySelector('.modal-buttons');
}

// ========================================
// 计时器功能
// ========================================

function startTimer() {
    stopTimer();
    gameStartTime = Date.now();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 10 && timeLeft > 0) {
            timerElement.classList.add('warning');
            SoundManager.playTickTock();
        } else {
            timerElement.classList.remove('warning');
        }
        
        if (timeLeft <= 0) {
            stopTimer();
            showTimeUpModal();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
}

function getElapsedTime() {
    if (gameStartTime > 0) {
        return currentLevelConfig.time - timeLeft;
    }
    return 0;
}

// ========================================
// 模态框功能
// ========================================

function showModal(content, buttons) {
    modalContent.innerHTML = content;
    modalButtons.innerHTML = '';
    
    for (let btn of buttons) {
        const btnEl = document.createElement('button');
        btnEl.className = `modal-btn ${btn.class}`;
        btnEl.textContent = btn.text;
        btnEl.onclick = btn.action;
        modalButtons.appendChild(btnEl);
    }
    
    modalOverlay.style.display = 'block';
    modalBox.style.display = 'block';
}

function hideModal() {
    modalOverlay.style.display = 'none';
    modalBox.style.display = 'none';
}

function showTimeUpModal() {
    isGameRunning = false;
    showModal(
        `<span class="big-emoji">⏰</span>
         时间到！
         <div class="sub-text">最终生存波数：第 ${currentLevel} 波</div>
         <div class="sub-text">最终得分：${score}</div>`,
        [
            { text: '🔄 重新开始挑战', class: 'modal-btn-primary', action: () => { hideModal(); resetGame(); } }
        ]
    );
}

function showLevelCompleteModal() {
    stopTimer();
    isGameRunning = false;
    SoundManager.playWin();
    
    // 通关奖励：额外加100分
    score += 100;
    updateDisplay();
    
    const elapsed = getElapsedTime();
    
    // 更新玩家统计
    playerStats.currentScore = score;
    if (currentLevel > playerStats.maxLevel) {
        playerStats.maxLevel = currentLevel;
    }
    if (score > playerStats.maxScore) {
        playerStats.maxScore = score;
    }
    if (elapsed > 0 && (playerStats.fastestLevelTime === 0 || elapsed < playerStats.fastestLevelTime)) {
        playerStats.fastestLevelTime = elapsed;
    }
    if (!playerStats.usedShuffleThisLevel) {
        playerStats.noShuffleLevel = true;
    }
    if (currentMode === 'hard' && currentLevel > playerStats.hardModeLevel) {
        playerStats.hardModeLevel = currentLevel;
    }
    
    // 更新排行榜
    updateLeaderboard(score, currentLevel);
    
    // 检查成就
    checkAchievements();
    
    // 保存数据
    savePlayerData();
    
    // 计算下一关编号
    const nextLevel = currentLevel + 1;
    
    // 无尽模式：所有关卡都显示同样的胜利弹窗
    showModal(
        `<span class="big-emoji">🎉</span>
         第 ${currentLevel} 波防守成功！
         <div class="sub-text">当前得分：${score}</div>
         <div class="sub-text">准备迎接第 ${nextLevel} 波！</div>`,
        [
            { text: '➡️ 进入下一波', class: 'modal-btn-primary', action: () => { hideModal(); startLevel(nextLevel); } }
        ]
    );
}

// ========================================
// 游戏初始化函数
// ========================================

function startLevel(levelNum) {
    if (levelNum < 1) {
        levelNum = 1;
    }
    
    currentLevel = levelNum;
    currentLevelConfig = getLevelConfig(levelNum);
    
    currentLevelReactions = generateLevelReactions(currentLevelConfig);
    currentReactions = processReactionsForMode(currentLevelReactions);
    
    // 专题模式：将专题题库合并到 currentReactions 中
    if (currentTopic && topicReactions.length > 0) {
        // 对专题题库也进行模式处理（移除系数等）
        const processedTopicReactions = processReactionsForMode(topicReactions);
        
        // 将处理后的专题题库合并
        for (const reaction of processedTopicReactions) {
            const exists = currentReactions.some(r => r[0] === reaction[0] && r[1] === reaction[1]);
            if (!exists) {
                currentReactions.push(reaction);
            }
        }
        console.log(`[专题模式] 已将专题题库合并，当前题库大小: ${currentReactions.length}`);
    }
    
    selectedTile = null;
    isGameRunning = true;
    playerStats.usedShuffleThisLevel = false;
    playerStats.noShuffleLevel = false;
    
    const totalTiles = currentLevelConfig.rows * currentLevelConfig.cols;
    remainingTiles = totalTiles;
    
    // 放宽初始时间：基础60秒 + 每关递增15秒，缓解玩家焦虑
    timeLeft = 60 + currentLevel * 15;
    
    // 生成纯净化学式版本的反应数据库（用于死局检测）
    generatePureReactions();
    
    levelDisplay.textContent = currentLevel;
    updateTimerDisplay();
    timerElement.classList.remove('warning');
    updateDisplay();
    
    generateBoard();
    renderBoard();
    resizeCanvas();
    
    startTimer();
}

function initGame() {
    SoundManager.init();
    stopTimer();
    hideModal();
    score = 0;
    playerStats.currentScore = 0;
    playerStats.usedShuffleThisLevel = false;
    
    // 确保读取当前下拉框的值
    const settingMode = document.getElementById('setting-mode');
    if (settingMode) {
        currentMode = settingMode.value === 'hard' ? 'hard' : 'easy';
    }
    
    const settingStage = document.getElementById('setting-stage');
    if (settingStage) {
        currentStage = settingStage.value;
    }
    
    const settingEqType = document.getElementById('setting-eq-type');
    if (settingEqType) {
        currentEqType = settingEqType.value;
    }
    
    updateDisplay();
    startLevel(1);
}

function resetGame() {
    stopTimer();
    hideModal();
    score = 0;
    playerStats.currentScore = 0;
    playerStats.usedShuffleThisLevel = false;
    updateDisplay();
    startLevel(1);
}

/**
 * 生成游戏棋盘数据
 * 包含物质类别信息（用于颜色区分）
 */
function generateBoard() {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    const totalTiles = rows * cols;
    let pairsNeeded = totalTiles / 2;
    
    let selectedReactions = selectReactionsForBoard(pairsNeeded);
    
    if (selectedReactions.length < pairsNeeded) {
        console.warn(`[棋盘调整] 题库仅 ${selectedReactions.length} 对，调整棋盘大小`);
        pairsNeeded = selectedReactions.length;
    }
    
    selectedReactions = selectedReactions.filter(pair => pair && pair[0] && pair[1]);
    
    let tiles = [];
    
    for (let reaction of selectedReactions) {
        if (!reaction || !reaction[0] || !reaction[1]) continue;
        
        tiles.push({
            htmlContent: reaction[0],
            isEmpty: false,
            category: getSubstanceCategory(reaction[0]) || 'other'
        });
        tiles.push({
            htmlContent: reaction[1],
            isEmpty: false,
            category: getSubstanceCategory(reaction[1]) || 'other'
        });
    }
    
    tiles = tiles.filter(tile => tile && tile.htmlContent !== undefined);
    
    if (tiles.length < totalTiles) {
        console.warn(`[棋盘填充] 方块数 ${tiles.length} < 目标 ${totalTiles}，填充空位`);
        while (tiles.length < totalTiles) {
            tiles.push({
                htmlContent: '空',
                isEmpty: true,
                category: 'other'
            });
        }
    }
    
    shuffleArray(tiles);
    
    gameBoard = [];
    let tileIndex = 0;
    for (let row = 0; row < rows; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < cols; col++) {
            if (tileIndex < tiles.length) {
                gameBoard[row][col] = tiles[tileIndex];
            } else {
                gameBoard[row][col] = { htmlContent: '空', isEmpty: true, category: 'other' };
            }
            tileIndex++;
        }
    }
}

/**
 * 80/20 混编出题机制
 * @param {number} pairsNeeded - 需要的反应对数量
 * @returns {Array} 选中的反应对数组
 */
function selectReactionsForBoard(pairsNeeded) {
    let finalPairs = [];
    
    const RARE_SUBSTANCES = [
        'koh', 'k2co3', 'khco3', 'kcl', 'kno3', 'k2so4',
        'nai', 'hi', 'ki',
    ];
    
    function cleanSubstance(str) {
        if (!str) return '';
        return str.replace(/<[^>]+>/g, '').replace(/[0-9]/g, '').toLowerCase().trim();
    }
    
    function hasRareSubstance(pair) {
        let cleanA = cleanSubstance(pair[0]);
        let cleanB = cleanSubstance(pair[1]);
        return RARE_SUBSTANCES.some(rare => cleanA.includes(rare) || cleanB.includes(rare));
    }
    
    if (currentStage === 'middle') {
        const middleSchoolReactions = typeof topicDB !== 'undefined' ? (topicDB.middleSchool || []) : [];
        const customReactions = typeof customDB !== 'undefined' ? customDB : [];
        
        const processedMiddle = processReactionsForMode(middleSchoolReactions);
        const processedCustom = processReactionsForMode(customReactions);
        
        const cleanMiddle = processedMiddle.filter(pair => !hasRareSubstance(pair));
        const cleanCustom = processedCustom.filter(pair => !hasRareSubstance(pair));
        
        const totalAvailable = cleanMiddle.length + cleanCustom.length;
        if (totalAvailable < pairsNeeded) {
            pairsNeeded = totalAvailable;
            console.log(`[初中模式] 题库不足，调整抽取数量为: ${pairsNeeded}`);
        }
        
        let attempts = 0;
        const MAX_ATTEMPTS = 1000;
        
        while (finalPairs.length < pairsNeeded && attempts < MAX_ATTEMPTS) {
            attempts++;
            let pair;
            if (Math.random() < 0.95) {
                if (cleanMiddle.length > 0) {
                    const idx = Math.floor(Math.random() * cleanMiddle.length);
                    pair = cleanMiddle[idx];
                } else if (processedMiddle.length > 0) {
                    const idx = Math.floor(Math.random() * processedMiddle.length);
                    pair = processedMiddle[idx];
                }
            } else {
                if (cleanCustom.length > 0) {
                    const idx = Math.floor(Math.random() * cleanCustom.length);
                    pair = cleanCustom[idx];
                } else if (processedCustom.length > 0) {
                    const idx = Math.floor(Math.random() * processedCustom.length);
                    pair = processedCustom[idx];
                }
            }
            
            if (pair) {
                const exists = finalPairs.some(p => 
                    stripHtmlTags(p[0]) === stripHtmlTags(pair[0]) && 
                    stripHtmlTags(p[1]) === stripHtmlTags(pair[1])
                );
                if (!exists) {
                    finalPairs.push(pair);
                }
            } else {
                break;
            }
        }
        
        if (attempts >= MAX_ATTEMPTS) {
            console.warn(`[初中模式] 达到最大尝试次数，已抽取 ${finalPairs.length} 对`);
        }
        
        console.log(`[初中模式] 95%教材纯度抽取: ${finalPairs.length} 对`);
        return finalPairs;
    }
    
    if (currentTopic && topicReactions.length > 0) {
        const numTopic = Math.floor(pairsNeeded * 0.8);
        
        const processedTopic = processReactionsForMode(topicReactions);
        const filteredTopic = processedTopic.filter(pair => !hasRareSubstance(pair));
        const shuffledTopic = [...filteredTopic].sort(() => 0.5 - Math.random());
        const chosenTopic = shuffledTopic.slice(0, Math.min(numTopic, filteredTopic.length));
        
        const numReview = pairsNeeded - chosenTopic.length;
        
        const filteredGeneral = currentReactions.filter(pair => !hasRareSubstance(pair));
        const shuffledGeneral = [...filteredGeneral].sort(() => 0.5 - Math.random());
        const chosenGeneral = shuffledGeneral.slice(0, numReview);
        
        finalPairs = [...chosenTopic, ...chosenGeneral];
        
        console.log(`[专题模式] 专题题: ${chosenTopic.length}, 复习题: ${chosenGeneral.length}, 总计: ${finalPairs.length}`);
    } else {
        const filteredGeneral = currentReactions.filter(pair => !hasRareSubstance(pair));
        const shuffledGeneral = [...filteredGeneral].sort(() => 0.5 - Math.random());
        finalPairs = shuffledGeneral.slice(0, pairsNeeded);
        
        if (finalPairs.length < pairsNeeded) {
            const remaining = currentReactions.filter(p => !finalPairs.includes(p));
            const shuffledRemaining = remaining.sort(() => 0.5 - Math.random());
            finalPairs = [...finalPairs, ...shuffledRemaining.slice(0, pairsNeeded - finalPairs.length)];
        }
        
        console.log(`[普通模式] 随机抽取: ${finalPairs.length} 对`);
    }
    
    finalPairs.sort(() => 0.5 - Math.random());
    
    return finalPairs;
}

/**
 * 从反应数组中随机抽取指定数量的反应对
 * @param {Array} reactions - 反应对数组
 * @param {number} count - 需要抽取的数量
 * @returns {Array} 抽取的反应对数组
 */
function selectRandomReactions(reactions, count) {
    if (reactions.length === 0 || count <= 0) return [];
    
    const shuffled = [...reactions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, reactions.length));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * 渲染游戏棋盘
 * 为每个方块添加类别样式（颜色区分）
 */
function renderBoard() {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    boardElement.innerHTML = '';
    
    // 动态计算方块尺寸，适配竖屏
    const containerWidth = Math.min(window.innerWidth - 40, 500);
    const gapSize = window.innerWidth <= 600 ? 2 : 8;
    const paddingSize = window.innerWidth <= 600 ? 4 : 18;
    const availableWidth = containerWidth - paddingSize * 2 - gapSize * (cols - 1);
    const tileSize = Math.min(68, Math.floor(availableWidth / cols));
    
    boardElement.style.gridTemplateColumns = `repeat(${cols}, ${tileSize}px)`;
    boardElement.style.gridTemplateRows = `repeat(${rows}, ${tileSize}px)`;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tileData = gameBoard[row][col];
            const tile = createTileElement(tileData, row, col);
            boardElement.appendChild(tile);
        }
    }
}

/**
 * 创建方块元素
 * 视觉看 HTML，逻辑读属性 - 完美隔离
 */
function createTileElement(tileData, row, col) {
    const tile = document.createElement('div');
    
    // 基础类名 + 物质类别类名
    let classNames = ['tile', `block-${tileData.category}`];
    
    if (tileData.isEmpty) {
        classNames.push('empty');
    }
    
    // 存储纯净化学式（去除HTML标签），用于死局检测和逻辑判断
    const pureFormula = stripHtmlTags(tileData.htmlContent);
    tile.dataset.formula = pureFormula;
    
    // 存储HTML格式的化学式，用于与reactionDB匹配
    tile.dataset.htmlContent = tileData.htmlContent;
    
    // 智能字号缩放：根据纯文本长度动态分配CSS类
    const pureTextLength = pureFormula.length;
    if (pureTextLength >= 8) {
        classNames.push('text-xs'); // 极长字符（如复盐、长复合物）
    } else if (pureTextLength >= 5) {
        classNames.push('text-sm'); // 中长字符
    }
    
    tile.className = classNames.join(' ');
    tile.dataset.row = row;
    tile.dataset.col = col;
    
    // 使用 innerHTML 渲染 HTML 格式化学式（显示上下标）
    tile.innerHTML = tileData.htmlContent;
    
    tile.addEventListener('click', () => handleTileClick(row, col));
    
    return tile;
}

/**
 * 去除HTML标签，返回纯净文本
 * 例如：'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' => 'Fe2(SO4)3'
 */
function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, '');
}

// ========================================
// 方块点击处理
// ========================================

function handleTileClick(row, col) {
    if (!isGameRunning) return;
    
    const tileData = gameBoard[row][col];
    
    if (tileData.isEmpty) return;
    
    SoundManager.playClick();
    
    const tileElement = getTileElement(row, col);
    
    if (selectedTile === null) {
        selectedTile = { row, col };
        tileElement.classList.add('selected');
    }
    else if (selectedTile.row === row && selectedTile.col === col) {
        tileElement.classList.remove('selected');
        selectedTile = null;
    }
    else {
        const prevTileElement = getTileElement(selectedTile.row, selectedTile.col);
        
        if (canMatch(selectedTile.row, selectedTile.col, row, col)) {
            matchTiles(selectedTile.row, selectedTile.col, row, col);
        } else {
            // 点错时不扣分，只做视觉提示和打断
            SoundManager.playMatchFail();
            
            // 显示中性提示
            let toast = document.createElement('div');
            toast.className = 'toast-reaction';
            toast.innerHTML = `<span style="color:#FF9800;">不反应 / 未收录</span>`;
            
            let rectA = prevTileElement.getBoundingClientRect();
            let rectB = tileElement.getBoundingClientRect();
            toast.style.left = ((rectA.left + rectB.left) / 2 + rectA.width / 2) + 'px';
            toast.style.top = ((rectA.top + rectB.top) / 2) + 'px';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 1000);
            
            // 给两个选错的方块加上摇晃动画
            prevTileElement.classList.add('shake-error');
            tileElement.classList.add('shake-error');
            
            setTimeout(() => {
                prevTileElement.classList.remove('shake-error');
                tileElement.classList.remove('shake-error');
            }, 500);
            
            prevTileElement.classList.remove('selected');
        }
        
        selectedTile = null;
    }
}

function playShakeAnimation(tile1, tile2) {
    tile1.classList.add('shake');
    tile2.classList.add('shake');
    
    setTimeout(() => {
        tile1.classList.remove('shake');
        tile2.classList.remove('shake');
    }, 400);
}

function getTileElement(row, col) {
    const cols = currentLevelConfig.cols;
    const index = row * cols + col;
    return boardElement.children[index];
}

// ========================================
// 连连看核心算法 - 匹配检测
// ========================================

function checkReaction(substance1, substance2) {
    // 先尝试字典匹配
    for (let reaction of currentReactions) {
        if ((reaction[0] === substance1 && reaction[1] === substance2) ||
            (reaction[0] === substance2 && reaction[1] === substance1)) {
            return reaction;
        }
    }
    
    // 字典匹配失败，尝试规则引擎推演
    if (typeof checkByRuleEngine === 'function') {
        let ruleResult = checkByRuleEngine(substance1, substance2);
        if (ruleResult) {
            // 将规则引擎结果转换为统一格式
            return [substance1, substance2, ruleResult.effect, ruleResult.equation];
        }
    }
    
    return null;
}

function canMatch(row1, col1, row2, col2) {
    const tile1 = gameBoard[row1][col1];
    const tile2 = gameBoard[row2][col2];
    
    if (row1 === row2 && col1 === col2) return null;
    if (tile1.htmlContent === tile2.htmlContent) return null;
    const matchedPair = checkReaction(tile1.htmlContent, tile2.htmlContent);
    if (!matchedPair) return null;
    
    // 废除路径检查，全盘任意匹配
    return { path: [{ row: row1, col: col1 }, { row: row2, col: col2 }], matchedPair };
}

// ========================================
// 连连看核心算法 - 路径检测
// ========================================

function findPath(row1, col1, row2, col2) {
    if (canConnectDirect(row1, col1, row2, col2)) {
        return [{ row: row1, col: col1 }, { row: row2, col: col2 }];
    }
    
    const path1 = findPathWithOneTurn(row1, col1, row2, col2);
    if (path1) return path1;
    
    const path2 = findPathWithTwoTurns(row1, col1, row2, col2);
    if (path2) return path2;
    
    return null;
}

function canConnectDirect(row1, col1, row2, col2) {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    if (row1 !== row2 && col1 !== col2) return false;
    
    if (row1 === row2) {
        const minCol = Math.min(col1, col2);
        const maxCol = Math.max(col1, col2);
        for (let col = minCol + 1; col < maxCol; col++) {
            if (!gameBoard[row1][col].isEmpty) return false;
        }
        return true;
    }
    
    if (col1 === col2) {
        const minRow = Math.min(row1, row2);
        const maxRow = Math.max(row1, row2);
        for (let row = minRow + 1; row < maxRow; row++) {
            if (!gameBoard[row][col1].isEmpty) return false;
        }
        return true;
    }
    
    return false;
}

function findPathWithOneTurn(row1, col1, row2, col2) {
    if (isValidTurnPoint(row1, col2, row1, col1, row2, col2)) {
        if (canConnectDirect(row1, col1, row1, col2) && canConnectDirect(row1, col2, row2, col2)) {
            return [
                { row: row1, col: col1 },
                { row: row1, col: col2 },
                { row: row2, col: col2 }
            ];
        }
    }
    
    if (isValidTurnPoint(row2, col1, row1, col1, row2, col2)) {
        if (canConnectDirect(row1, col1, row2, col1) && canConnectDirect(row2, col1, row2, col2)) {
            return [
                { row: row1, col: col1 },
                { row: row2, col: col1 },
                { row: row2, col: col2 }
            ];
        }
    }
    
    return null;
}

function isValidTurnPoint(turnRow, turnCol, row1, col1, row2, col2) {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    if (turnRow < 0 || turnRow >= rows || turnCol < 0 || turnCol >= cols) return true;
    return gameBoard[turnRow][turnCol].isEmpty;
}

function findPathWithTwoTurns(row1, col1, row2, col2) {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    for (let row = row1 - 1; row >= -1; row--) {
        if (row >= 0 && !gameBoard[row][col1].isEmpty && row !== row1) break;
        if (canConnectWithOneTurnFrom(row, col1, row2, col2)) {
            const turnPoint2 = findSecondTurnPoint(row, col1, row2, col2);
            if (turnPoint2) {
                return [
                    { row: row1, col: col1 },
                    { row, col: col1 },
                    turnPoint2,
                    { row: row2, col: col2 }
                ];
            }
        }
    }
    
    for (let row = row1 + 1; row <= rows; row++) {
        if (row < rows && !gameBoard[row][col1].isEmpty && row !== row1) break;
        if (canConnectWithOneTurnFrom(row, col1, row2, col2)) {
            const turnPoint2 = findSecondTurnPoint(row, col1, row2, col2);
            if (turnPoint2) {
                return [
                    { row: row1, col: col1 },
                    { row, col: col1 },
                    turnPoint2,
                    { row: row2, col: col2 }
                ];
            }
        }
    }
    
    for (let col = col1 - 1; col >= -1; col--) {
        if (col >= 0 && !gameBoard[row1][col].isEmpty && col !== col1) break;
        if (canConnectWithOneTurnFrom(row1, col, row2, col2)) {
            const turnPoint2 = findSecondTurnPoint(row1, col, row2, col2);
            if (turnPoint2) {
                return [
                    { row: row1, col: col1 },
                    { row: row1, col },
                    turnPoint2,
                    { row: row2, col: col2 }
                ];
            }
        }
    }
    
    for (let col = col1 + 1; col <= cols; col++) {
        if (col < cols && !gameBoard[row1][col].isEmpty && col !== col1) break;
        if (canConnectWithOneTurnFrom(row1, col, row2, col2)) {
            const turnPoint2 = findSecondTurnPoint(row1, col, row2, col2);
            if (turnPoint2) {
                return [
                    { row: row1, col: col1 },
                    { row: row1, col },
                    turnPoint2,
                    { row: row2, col: col2 }
                ];
            }
        }
    }
    
    return null;
}

function canConnectWithOneTurnFrom(midRow, midCol, row2, col2) {
    if (canConnectDirectExtended(midRow, midCol, row2, col2)) return true;
    
    if (isValidPoint(midRow, col2) && 
        canConnectDirectExtended(midRow, midCol, midRow, col2) && 
        canConnectDirectExtended(midRow, col2, row2, col2)) return true;
    
    if (isValidPoint(row2, midCol) && 
        canConnectDirectExtended(midRow, midCol, row2, midCol) && 
        canConnectDirectExtended(row2, midCol, row2, col2)) return true;
    
    return false;
}

function findSecondTurnPoint(midRow, midCol, row2, col2) {
    if (canConnectDirectExtended(midRow, midCol, midRow, col2) && 
        canConnectDirectExtended(midRow, col2, row2, col2)) {
        return { row: midRow, col: col2 };
    }
    
    if (canConnectDirectExtended(midRow, midCol, row2, midCol) && 
        canConnectDirectExtended(row2, midCol, row2, col2)) {
        return { row: row2, col: midCol };
    }
    
    return null;
}

function isValidPoint(row, col) {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    return row >= -1 && row <= rows && col >= -1 && col <= cols;
}

function canConnectDirectExtended(row1, col1, row2, col2) {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    if (row1 !== row2 && col1 !== col2) return false;
    
    if (row1 === row2) {
        const minCol = Math.min(col1, col2);
        const maxCol = Math.max(col1, col2);
        for (let col = minCol + 1; col < maxCol; col++) {
            if (col >= 0 && col < cols && row1 >= 0 && row1 < rows) {
                if (!gameBoard[row1][col].isEmpty) return false;
            }
        }
        return true;
    }
    
    if (col1 === col2) {
        const minRow = Math.min(row1, row2);
        const maxRow = Math.max(row1, row2);
        for (let row = minRow + 1; row < maxRow; row++) {
            if (row >= 0 && row < rows && col1 >= 0 && col1 < cols) {
                if (!gameBoard[row][col1].isEmpty) return false;
            }
        }
        return true;
    }
    
    return false;
}

// ========================================
// 消除方程式漂浮特效
// ========================================

function getFullEquation(formulaA, formulaB) {
    let allData = [];
    if (typeof reactionDB !== 'undefined') allData = allData.concat(reactionDB);
    if (typeof customDB !== 'undefined') allData = allData.concat(customDB);
    if (typeof topicDB !== 'undefined') {
        for (let key in topicDB) allData = allData.concat(topicDB[key]);
    }

    // 强力清洗函数：剥除所有 HTML 标签，统一转小写并去空格
    function sanitize(str) {
        if (!str) return "";
        return str.replace(/<[^>]+>/g, '').toLowerCase().trim();
    }

    let cleanA = sanitize(formulaA);
    let cleanB = sanitize(formulaB);

    for (let pair of allData) {
        let targetA = sanitize(pair[0]);
        let targetB = sanitize(pair[1]);
        let fullEq = pair[3];
        
        if (!fullEq) continue;

        if (isHardMode) {
            if ((cleanA === targetA && cleanB === targetB) || (cleanA === targetB && cleanB === targetA)) return fullEq;
        } else {
            let stripA = removeCoefficient(cleanA);
            let stripB = removeCoefficient(cleanB);
            let stripTargetA = removeCoefficient(targetA);
            let stripTargetB = removeCoefficient(targetB);
            if ((stripA === stripTargetA && stripB === stripTargetB) || (stripA === stripTargetB && stripB === stripTargetA)) return fullEq;
        }
    }
    
    return null;
}

function showReactionToast(blockA, blockB) {
    let formulaA = blockA.getAttribute('data-formula');
    let formulaB = blockB.getAttribute('data-formula');
    
    // 1. 第一道防线：查字典全方程
    let fullEq = getFullEquation(formulaA, formulaB);
    
    // 2. 第二道防线：字典没查到，呼叫化学规则引擎推演！
    if (!fullEq && typeof checkByRuleEngine === 'function') {
        let ruleResult = checkByRuleEngine(formulaA, formulaB);
        if (ruleResult && ruleResult.equation) {
            fullEq = ruleResult.equation;
        }
    }
    
    // 获取中点坐标
    let rectA = blockA.getBoundingClientRect();
    let rectB = blockB.getBoundingClientRect();
    let centerX = (rectA.left + rectB.left) / 2 + rectA.width / 2;
    let centerY = (rectA.top + rectB.top) / 2;
    
    let toast = document.createElement('div');
    toast.className = 'toast-reaction';
    
    // 3. 终极显示逻辑：如果连引擎都推演不出具体产物，也显示得更有化学味
    if (fullEq) {
        toast.innerHTML = `${fullEq} <br><span style="color:#4CAF50; font-size:18px;">+3秒</span>`;
    } else {
        toast.innerHTML = `${formulaA} + ${formulaB} → 发生反应 <br><span style="color:#4CAF50; font-size:18px;">+3秒</span>`;
    }
    
    toast.style.left = centerX + 'px';
    toast.style.top = centerY + 'px';
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ========================================
// 消除方块和绘制连线
// ========================================

function matchTiles(row1, col1, row2, col2) {
    const path = findPath(row1, col1, row2, col2);
    
    if (path) {
        SoundManager.playMatchSuccess();
        drawLine(path);
        
        // 获取反应的特效类型和匹配的反应对
        const tile1 = gameBoard[row1][col1];
        const tile2 = gameBoard[row2][col2];
        const effectType = getReactionEffect(tile1.htmlContent, tile2.htmlContent);
        const matchedPair = checkReaction(tile1.htmlContent, tile2.htmlContent);
        
        setTimeout(() => {
            gameBoard[row1][col1].isEmpty = true;
            gameBoard[row2][col2].isEmpty = true;
            
            const tile1El = getTileElement(row1, col1);
            const tile2El = getTileElement(row2, col2);
            
            // 播放视觉特效（在两个方块位置）
            playVisualEffect(tile1El, effectType);
            playVisualEffect(tile2El, effectType);
            
            tile1El.classList.remove('selected');
            tile1El.classList.add('removing');
            tile2El.classList.add('removing');
            
            // 显示消除方程式漂浮特效
            showReactionToast(tile1El, tile2El);
            
            setTimeout(() => {
                tile1El.classList.add('empty');
                tile2El.classList.add('empty');
                tile1El.classList.remove('removing');
                tile2El.classList.remove('removing');
            }, 400);
            
            score += SCORE_PER_MATCH;
            remainingTiles -= 2;
            
            // 更新玩家统计
            playerStats.currentScore = score;
            playerStats.totalMatches++;
            
            // 消除加时机制：每次消除增加3秒，不超过关卡初始时间上限
            const maxTime = 60 + currentLevel * 15;
            const oldTimeLeft = timeLeft;
            timeLeft = Math.min(timeLeft + 3, maxTime);
            const addedTime = timeLeft - oldTimeLeft;
            
            updateDisplay();
            
            // 检查成就
            checkAchievements();
            
            // 加时视觉反馈
            if (addedTime > 0) {
                showTimeBonus(addedTime);
            }
            
            clearLine();
            
            if (remainingTiles === 0) {
                setTimeout(showLevelCompleteModal, 500);
            } else {
                setTimeout(() => {
                    // 检测死局并自动洗牌
                    if (checkDeadlock()) {
                        showDeadlockToast();
                        autoShuffleBoard();
                    }
                }, 500);
            }
        }, 300);
    }
}

// ========================================
// 死局检测与智能救援
// ========================================

// 纯净化学式版本的反应数据库（运行时生成）
let pureReactions = [];

/**
 * 生成纯净化学式版本的反应数据库
 * 在游戏初始化时调用，将所有HTML格式的化学式转换为纯文本格式
 */
function generatePureReactions() {
    pureReactions = currentReactions.map(reaction => {
        const pureReaction = [
            stripHtmlTags(reaction[0]),
            stripHtmlTags(reaction[1])
        ];
        if (reaction.length > 2) {
            pureReaction.push(reaction[2]);
        }
        return pureReaction;
    });
}

/**
 * 检查纯净化学式是否可以反应
 * @param {string} formula1 - 纯净化学式1
 * @param {string} formula2 - 纯净化学式2
 * @returns {boolean}
 */
function checkPureReaction(formula1, formula2) {
    for (let reaction of pureReactions) {
        if ((reaction[0] === formula1 && reaction[1] === formula2) ||
            (reaction[0] === formula2 && reaction[1] === formula1)) {
            return true;
        }
    }
    return false;
}

/**
 * 检查是否存在可匹配的反应对（使用纯净化学式）
 * @returns {boolean} true表示存在可匹配对，false表示死局
 */
function checkAvailableMatches() {
    // 获取所有可见的方块元素
    const tileElements = document.querySelectorAll('.tile:not(.empty)');
    
    if (tileElements.length < 2) return false;
    
    // 提取所有方块的纯净化学式
    const formulas = [];
    tileElements.forEach(el => {
        const formula = el.dataset.formula;
        if (formula) {
            formulas.push(formula);
        }
    });
    
    if (formulas.length < 2) return false;
    
    // 两两检查是否存在可反应的对
    for (let i = 0; i < formulas.length; i++) {
        for (let j = i + 1; j < formulas.length; j++) {
            if (formulas[i] !== formulas[j] && checkPureReaction(formulas[i], formulas[j])) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * 检查是否为死局（没有任何可反应的方块对）
 * @returns {boolean} true表示是死局，false表示不是死局
 */
function checkDeadlock() {
    return !checkAvailableMatches();
}

/**
 * 自动换牌（死局救援，更换全新的反应对）
 * 核心逻辑：从题库中抽取全新的反应对，替换现有的方块
 */
function autoShuffleBoard() {
    // 获取所有存活的方块元素
    const tileElements = document.querySelectorAll('.tile:not(.empty)');
    const remainingCount = tileElements.length;
    
    if (remainingCount < 2) return;
    
    // 计算需要抽取的反应对数量
    const pairCount = remainingCount / 2;
    
    // 从当前题库中随机抽取 pairCount 对反应
    const newSubstances = drawRandomReactionPairs(pairCount);
    
    if (newSubstances.length !== remainingCount) {
        console.error('抽取的反应物质数量不匹配');
        return;
    }
    
    // Fisher-Yates 洗牌算法打乱新物质
    for (let i = newSubstances.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newSubstances[i], newSubstances[j]] = [newSubstances[j], newSubstances[i]];
    }
    
    // 将新物质写回DOM元素
    tileElements.forEach((el, index) => {
        const substance = newSubstances[index];
        const pureFormula = stripHtmlTags(substance.htmlContent);
        
        // 更新数据属性（用于逻辑判断）
        el.dataset.htmlContent = substance.htmlContent;
        el.dataset.formula = pureFormula;
        
        // 使用 innerHTML 渲染 HTML 格式化学式（显示上下标）
        el.innerHTML = substance.htmlContent;
        
        // 更新类别样式（颜色）
        el.className = el.className.replace(/block-\w+/g, '');
        el.classList.add(`block-${substance.category}`);
        
        // 智能字号缩放
        if (pureFormula.length >= 8) {
            el.classList.add('text-xs');
        } else if (pureFormula.length >= 5) {
            el.classList.add('text-sm');
        }
    });
    
    // 清除选中状态
    selectedTile = null;
    
    // 同步更新 gameBoard 数据
    syncGameBoardFromDOM();
}

/**
 * 从当前题库中随机抽取指定数量的反应对（80/20混编机制）
 * @param {number} pairCount - 需要抽取的反应对数量
 * @returns {Array} 包含所有物质的数组（每个物质包含 htmlContent 和 category）
 */
function drawRandomReactionPairs(pairCount) {
    // 使用 80/20 混编出题机制获取反应对
    const selectedReactions = selectReactionsForBoard(pairCount);
    
    const substances = [];
    
    for (const reaction of selectedReactions) {
        substances.push({
            htmlContent: reaction[0],
            category: getSubstanceCategory(reaction[0])
        });
        
        substances.push({
            htmlContent: reaction[1],
            category: getSubstanceCategory(reaction[1])
        });
    }
    
    return substances;
}

/**
 * 手动洗牌（玩家点击洗牌按钮）- 仅打乱位置
 */
function shuffleBoard() {
    if (!isGameRunning) return;
    
    playerStats.usedShuffleThisLevel = true;
    
    // 获取所有存活的方块元素
    const tileElements = document.querySelectorAll('.tile:not(.empty)');
    
    if (tileElements.length < 2) return;
    
    // 备份关键数据
    const tilesData = [];
    tileElements.forEach(el => {
        tilesData.push({
            htmlContent: el.dataset.htmlContent,
            formula: el.dataset.formula,
            className: el.className
        });
    });
    
    // Fisher-Yates 洗牌算法
    for (let i = tilesData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilesData[i], tilesData[j]] = [tilesData[j], tilesData[i]];
    }
    
    // 重新发牌：将打乱后的数据写回DOM元素
    tileElements.forEach((el, index) => {
        const data = tilesData[index];
        el.dataset.htmlContent = data.htmlContent;
        el.dataset.formula = data.formula;
        // 使用 innerHTML 渲染 HTML 格式化学式（显示上下标）
        el.innerHTML = data.htmlContent;
        el.className = data.className;
    });
    
    // 清除选中状态
    selectedTile = null;
    
    // 同步更新 gameBoard 数据
    syncGameBoardFromDOM();
}

/**
 * 从DOM元素同步数据到gameBoard
 */
function syncGameBoardFromDOM() {
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    const tileElements = document.querySelectorAll('.tile');
    let index = 0;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const el = tileElements[index];
            if (el) {
                gameBoard[row][col].htmlContent = el.dataset.htmlContent || el.innerHTML;
                gameBoard[row][col].displayContent = el.dataset.htmlContent || el.innerHTML;
                gameBoard[row][col].isEmpty = el.classList.contains('empty');
                
                // 更新类别
                if (el.classList.contains('block-acid')) {
                    gameBoard[row][col].category = 'acid';
                } else if (el.classList.contains('block-base')) {
                    gameBoard[row][col].category = 'base';
                } else if (el.classList.contains('block-metal')) {
                    gameBoard[row][col].category = 'metal';
                } else {
                    gameBoard[row][col].category = 'other';
                }
            }
            index++;
        }
    }
}

/**
 * 显示死局自动洗牌提示
 */
function showDeadlockToast() {
    let toastEl = document.getElementById('deadlock-toast');
    
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'deadlock-toast';
        toastEl.className = 'deadlock-toast';
        document.body.appendChild(toastEl);
    }
    
    toastEl.innerHTML = '🔄 检测到死局，已为您更换全新反应对！';
    toastEl.classList.add('show');
    
    // 播放提示音
    SoundManager.playMatchSuccess();
    
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 1500);
}

function magicRescue() {
    showRescueMessage();
    
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    let positions = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!gameBoard[row][col].isEmpty) {
                positions.push({ row: row, col: col });
            }
        }
    }
    
    const count = positions.length;
    if (count === 0) return;
    
    const pairsNeeded = count / 2;
    let newTiles = [];
    
    for (let i = 0; i < pairsNeeded; i++) {
        const reactionIndex = Math.floor(Math.random() * currentReactions.length);
        const reaction = currentReactions[reactionIndex];
        
        newTiles.push({
            htmlContent: reaction[0],
            isEmpty: false,
            category: getSubstanceCategory(reaction[0])
        });
        newTiles.push({
            htmlContent: reaction[1],
            isEmpty: false,
            category: getSubstanceCategory(reaction[1])
        });
    }
    
    shuffleArray(newTiles);
    
    setTimeout(() => {
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            gameBoard[pos.row][pos.col] = newTiles[i];
        }
        
        selectedTile = null;
        renderBoard();
        hideRescueMessage();
    }, 1500);
}

function showRescueMessage() {
    let messageEl = document.getElementById('rescue-message');
    
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'rescue-message';
        messageEl.className = 'rescue-message';
        document.body.appendChild(messageEl);
    }
    
    messageEl.innerHTML = '🧪 化学反应陷入僵局啦！<br><small>系统正在加入神秘催化剂为您重置剩余物质...</small>';
    messageEl.style.display = 'block';
}

function hideRescueMessage() {
    const messageEl = document.getElementById('rescue-message');
    if (messageEl) {
        messageEl.style.display = 'none';
    }
}

// ========================================
// 绘制连接线
// ========================================

function drawLine(path) {
    const boardRect = boardElement.getBoundingClientRect();
    const rows = currentLevelConfig.rows;
    const cols = currentLevelConfig.cols;
    
    lineCanvas.width = window.innerWidth;
    lineCanvas.height = window.innerHeight;
    
    lineCtx.strokeStyle = '#ffd700';
    lineCtx.lineWidth = 4;
    lineCtx.lineCap = 'round';
    lineCtx.lineJoin = 'round';
    lineCtx.shadowColor = '#ffd700';
    lineCtx.shadowBlur = 10;
    
    lineCtx.beginPath();
    
    for (let i = 0; i < path.length; i++) {
        const point = path[i];
        
        let x, y;
        
        if (point.row < 0) {
            y = boardRect.top - 10;
        } else if (point.row >= rows) {
            y = boardRect.bottom + 10;
        } else {
            const tileElement = getTileElement(point.row, Math.max(0, Math.min(point.col, cols - 1)));
            const tileRect = tileElement.getBoundingClientRect();
            y = tileRect.top + tileRect.height / 2;
        }
        
        if (point.col < 0) {
            x = boardRect.left - 10;
        } else if (point.col >= cols) {
            x = boardRect.right + 10;
        } else {
            const tileElement = getTileElement(Math.max(0, Math.min(point.row, rows - 1)), point.col);
            const tileRect = tileElement.getBoundingClientRect();
            x = tileRect.left + tileRect.width / 2;
        }
        
        if (i === 0) {
            lineCtx.moveTo(x, y);
        } else {
            lineCtx.lineTo(x, y);
        }
    }
    
    lineCtx.stroke();
}

function clearLine() {
    lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
}

function resizeCanvas() {
    lineCanvas.width = window.innerWidth;
    lineCanvas.height = window.innerHeight;
}

// ========================================
// 模式切换功能
// ========================================

function switchMode(mode) {
    currentMode = mode;
    
    // 切换模式时重置专题状态
    currentTopic = null;
    topicReactions = [];
    
    // 更新按钮激活状态
    updateModeButtonState();
}

// ========================================
// 界面更新函数
// ========================================

function updateDisplay() {
    scoreElement.textContent = score;
}

/**
 * 显示加时视觉反馈
 * @param {number} addedTime - 增加的时间（秒）
 */
function showTimeBonus(addedTime) {
    const timerElement = document.getElementById('timer-display');
    if (!timerElement) return;
    
    // 创建 +3s 提示元素
    const bonusEl = document.createElement('span');
    bonusEl.className = 'time-bonus';
    bonusEl.textContent = `+${addedTime}s`;
    timerElement.parentElement.appendChild(bonusEl);
    
    // 计时器闪烁绿色
    timerElement.classList.add('time-flash');
    
    // 动画结束后移除元素和类
    setTimeout(() => {
        bonusEl.remove();
        timerElement.classList.remove('time-flash');
    }, 800);
}

// ========================================
// 成就系统函数
// ========================================

/**
 * 加载玩家数据
 */
function loadPlayerData() {
    try {
        const savedStats = localStorage.getItem('chemllk_stats');
        const savedAchievements = localStorage.getItem('chemllk_achievements');
        const savedLeaderboard = localStorage.getItem('chemllk_leaderboard');
        
        if (savedStats) {
            playerStats = { ...playerStats, ...JSON.parse(savedStats) };
        }
        if (savedAchievements) {
            unlockedAchievements = JSON.parse(savedAchievements);
        }
        if (savedLeaderboard) {
            leaderboard = JSON.parse(savedLeaderboard);
        }
    } catch (e) {
        console.log('无法加载玩家数据');
    }
}

/**
 * 保存玩家数据
 */
function savePlayerData() {
    try {
        localStorage.setItem('chemllk_stats', JSON.stringify(playerStats));
        localStorage.setItem('chemllk_achievements', JSON.stringify(unlockedAchievements));
        localStorage.setItem('chemllk_leaderboard', JSON.stringify(leaderboard));
    } catch (e) {
        console.log('无法保存玩家数据');
    }
}

/**
 * 检查并解锁成就
 */
function checkAchievements() {
    for (const achievement of ACHIEVEMENTS) {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition(playerStats)) {
            unlockAchievement(achievement);
        }
    }
}

/**
 * 解锁成就
 */
function unlockAchievement(achievement) {
    unlockedAchievements.push(achievement.id);
    savePlayerData();
    showAchievementNotification(achievement);
}

/**
 * 显示成就解锁通知
 */
function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievement-notification');
    const iconEl = notification.querySelector('.achievement-icon');
    const nameEl = notification.querySelector('.achievement-name');
    
    iconEl.textContent = achievement.icon;
    nameEl.textContent = achievement.name;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * 显示成就弹窗
 */
function showAchievementModal() {
    const modal = document.getElementById('achievement-modal');
    const list = document.getElementById('achievement-list');
    
    list.innerHTML = '';
    
    for (const achievement of ACHIEVEMENTS) {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
        item.innerHTML = `
            <span class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</span>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
            <span class="achievement-status">${isUnlocked ? '✅' : ''}</span>
        `;
        list.appendChild(item);
    }
    
    modal.classList.add('show');
}

/**
 * 隐藏成就弹窗
 */
function hideAchievementModal() {
    document.getElementById('achievement-modal').classList.remove('show');
}

// ========================================
// 排行榜系统函数
// ========================================

let leaderboard = [];

/**
 * 更新排行榜
 */
function updateLeaderboard(newScore, level) {
    const entry = {
        score: newScore,
        level: level,
        date: new Date().toLocaleDateString('zh-CN')
    };
    
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // 只保留前10名
    
    savePlayerData();
}

/**
 * 显示排行榜弹窗
 */
function showLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    const list = document.getElementById('leaderboard-list');
    
    list.innerHTML = '';
    
    if (leaderboard.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #6a8caf; padding: 20px;">暂无记录，快来创造历史吧！</div>';
    } else {
        leaderboard.forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <span class="leaderboard-rank">#${index + 1}</span>
                <span class="leaderboard-name">第${entry.level}波</span>
                <span class="leaderboard-score">${entry.score}分</span>
            `;
            list.appendChild(item);
        });
    }
    
    modal.classList.add('show');
}

/**
 * 隐藏排行榜弹窗
 */
function hideLeaderboardModal() {
    document.getElementById('leaderboard-modal').classList.remove('show');
}

// ========================================
// 事件监听器
// ========================================

function initEventListeners() {
    shuffleButton.addEventListener('click', shuffleBoard);
    
    // 重新开始按钮
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
        btnRestart.addEventListener('click', startGameLogic);
    }
    
    // 开始游戏按钮
    const btnStartGame = document.getElementById('btn-start-game');
    if (btnStartGame) {
        btnStartGame.addEventListener('click', startGameLogic);
    }
    
    // 自选范围按钮 - 打开专题选择弹窗
    const btnChooseScope = document.getElementById('btn-choose-scope');
    const topicModal = document.getElementById('topic-modal');
    const closeTopicModal = document.getElementById('close-topic-modal');
    const topicConfirmBtn = document.getElementById('topic-confirm-btn');
    const topicAllCheckbox = document.getElementById('topic-all');
    const topicCheckboxes = document.querySelectorAll('.topic-cb');
    
    if (btnChooseScope) {
        btnChooseScope.addEventListener('click', () => {
            if (topicModal) {
                topicModal.classList.add('show');
            }
        });
    }
    
    if (closeTopicModal) {
        closeTopicModal.addEventListener('click', () => {
            if (topicModal) {
                topicModal.classList.remove('show');
            }
        });
    }
    
    // 全选/取消全选
    if (topicAllCheckbox) {
        topicAllCheckbox.addEventListener('change', () => {
            topicCheckboxes.forEach(cb => {
                cb.checked = topicAllCheckbox.checked;
            });
        });
    }
    
    // 单选时检查是否需要更新全选状态
    topicCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = Array.from(topicCheckboxes).every(c => c.checked);
            const someChecked = Array.from(topicCheckboxes).some(c => c.checked);
            
            if (topicAllCheckbox) {
                topicAllCheckbox.checked = allChecked;
                topicAllCheckbox.indeterminate = someChecked && !allChecked;
            }
        });
    });
    
    // 专题确认按钮：保存选择并开始游戏
    if (topicConfirmBtn) {
        topicConfirmBtn.addEventListener('click', () => {
            selectedTopics = [];
            
            // 检查是否选择了全库复习
            if (topicAllCheckbox && topicAllCheckbox.checked) {
                currentTopic = null;
                topicReactions = [];
            } else {
                // 读取选中的元素
                topicCheckboxes.forEach(cb => {
                    if (cb.checked) {
                        selectedTopics.push(cb.value);
                    }
                });
                
                if (selectedTopics.length > 0) {
                    // 合并所有选中元素的题库
                    currentTopic = selectedTopics.join(',');
                    topicReactions = [];
                    
                    selectedTopics.forEach(topicKey => {
                        if (typeof topicDB !== 'undefined' && topicDB[topicKey]) {
                            topicReactions = topicReactions.concat(topicDB[topicKey]);
                        }
                    });
                } else {
                    currentTopic = null;
                    topicReactions = [];
                }
            }
            
            // 隐藏弹窗
            if (topicModal) {
                topicModal.classList.remove('show');
            }
            
            // 启动游戏
            launchGame();
        });
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    modalOverlay.addEventListener('click', hideModal);
    
    // 成就和排行榜按钮
    const achievementBtn = document.getElementById('achievement-btn');
    const leaderboardBtn = document.getElementById('leaderboard-btn');
    const closeAchievementBtn = document.getElementById('close-achievement');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard');
    
    if (achievementBtn) {
        achievementBtn.addEventListener('click', showAchievementModal);
    }
    if (leaderboardBtn) {
        leaderboardBtn.addEventListener('click', showLeaderboardModal);
    }
    if (closeAchievementBtn) {
        closeAchievementBtn.addEventListener('click', hideAchievementModal);
    }
    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', hideLeaderboardModal);
    }
}

/**
 * 开始游戏的统一逻辑函数
 * 由"开始游戏"按钮和"重新开始"按钮调用
 */
function startGameLogic() {
    // 1. 读取面板设置
    const settingStage = document.getElementById('setting-stage');
    const settingMode = document.getElementById('setting-mode');
    const settingEqType = document.getElementById('setting-eq-type');
    const scopeBtn = document.getElementById('btn-choose-scope');
    
    if (settingStage) {
        currentStage = settingStage.value;
    }
    if (settingMode) {
        // 下拉框值: 'simple' 或 'hard'，转换为 'easy' 或 'hard'
        currentMode = settingMode.value === 'hard' ? 'hard' : 'easy';
    }
    if (settingEqType) {
        currentEqType = settingEqType.value;
    }
    
    // 2. 读取自选范围 (如果是全库综合，则清空专题)
    const topicAllCheckbox = document.getElementById('topic-all');
    if (topicAllCheckbox && topicAllCheckbox.checked) {
        currentTopic = null;
        topicReactions = [];
    }
    
    // 3. 动态更新按钮文字
    if (scopeBtn) {
        const scopeText = currentTopic && topicReactions.length > 0 ? 
            "🎯 范围(已选)" : "🎯 自选范围";
        scopeBtn.innerText = scopeText;
    }
    
    console.log(`[游戏设置] 学段: ${currentStage}, 模式: ${currentMode}, 方程式类型: ${currentEqType}, 专题: ${currentTopic || '全库'}`);
    
    // 4. 重置状态并开始
    currentLevel = 1;
    initGame();
}

// ========================================
// 游戏启动
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initDOMReferences();
    initEventListeners();
    loadPlayerData();
});

// 将需要从 HTML onclick 中调用的函数挂载到 window 对象上
window.startGame = startGame;
window.selectStage = selectStage;
window.selectMode = selectMode;
window.goToStep = goToStep;
window.selectScope = selectScope;
window.openCustomScope = openCustomScope;
window.resetToMainMenu = resetToMainMenu;
window.selectRandomReactions = selectRandomReactions;
window.checkReaction = checkReaction;
window.canMatch = canMatch;
window.findPath = findPath;
window.matchTiles = matchTiles;
window.shuffleBoard = shuffleBoard;
window.autoShuffleBoard = autoShuffleBoard;
window.initGame = initGame;
window.startLevel = startLevel;
window.resetGame = resetGame;

