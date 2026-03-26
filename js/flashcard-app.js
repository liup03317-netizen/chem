import SM2 from './sm2-algorithm.js';
import { ELEMENT_FAMILIES } from '../data/transformations.js';

class FlashcardApp {
  constructor() {
    this.deck = []; // Cards to review today
    this.currentCardIndex = 0;
    this.isFlipped = false;
    
    // UI Elements
    this.container = document.getElementById('flashcard-container');
    this.cardElement = document.getElementById('flashcard');
    this.reactantsEl = document.getElementById('card-reactants');
    this.equationEl = document.getElementById('card-equation');
    this.typeEl = document.getElementById('card-type');
    this.btnControls = document.getElementById('rating-controls');
    this.remainingEl = document.getElementById('cards-remaining');
    this.doneState = document.getElementById('done-state');

    this._init();
  }

  _init() {
    try {
      this._loadData();
      this._bindEvents();
      this._renderCurrentCard();
    } catch (e) {
      document.body.innerHTML = `<h1>Init Error: ${e.message}</h1><pre>${e.stack}</pre>`;
    }
  }

  /**
   * Match reactionIds with actual reaction data from all element databases
   */
  _getAllReactionsMap() {
    const map = new Map();
    // ELEMENT_FAMILIES is an object: { C: {...}, H: {...} }
    Object.values(ELEMENT_FAMILIES).forEach(elementPack => {
      const edges = elementPack.edges || [];
      edges.forEach(edge => {
        // e.g. edge.id = "c-001"
        map.set(edge.id, edge);
      });
    });
    return map;
  }

  /**
   * Read localStorage and filter cards
   */
  _loadData() {
    const rawRecords = JSON.parse(localStorage.getItem('learning_records') || '{}');
    const allReactions = this._getAllReactionsMap();
    const today = Date.now();
    this.deck = [];

    for (const [reactionId, record] of Object.entries(rawRecords)) {
      if (!record.markedForReview) continue;

      let cardState = { ...record };
      
      // Initialize or Heal SM2 state if it doesn't exist
      if (cardState.nextReviewDate == null || cardState.interval == null) {
        Object.assign(cardState, SM2.createInitialState());
        // Save initial state back immediately
        rawRecords[reactionId] = cardState;
      }

      // Check if it's due today (nextReviewDate <= current time)
      if (cardState.nextReviewDate <= today) {
        // Find reaction data
        const reactionData = allReactions.get(reactionId);
        if (reactionData) {
          this.deck.push({
            id: reactionId,
            state: cardState,
            data: reactionData
          });
        }
      }
    }

    // Save any new initialization back
    localStorage.setItem('learning_records', JSON.stringify(rawRecords));
    
    // Shuffle the deck
    this._shuffle(this.deck);
  }

  _bindEvents() {
    // Flip card
    this.container.addEventListener('click', () => {
      if (!this.isFlipped && this.deck.length > 0) {
        this._flipCard();
      }
    });

    // Rating buttons
    const btns = this.btnControls.querySelectorAll('.rating-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card flip
        const grade = parseInt(e.currentTarget.getAttribute('data-grade'));
        this._handleRating(grade);
      });
    });
  }

  _renderCurrentCard() {
    try {
      this.remainingEl.textContent = this.deck.length - this.currentCardIndex;

      if (this.currentCardIndex >= this.deck.length) {
        this._showDoneState();
        return;
      }

      const currentItem = this.deck[this.currentCardIndex];
      if (!currentItem) return;

      // Reset UI
      this.isFlipped = false;
      this.cardElement.classList.remove('is-flipped');
      this.btnControls.classList.remove('visible');

      // Setup Front
      // Format "C + O2 = CO2" into reactants vs products
      const eqText = currentItem.data.equation || currentItem.id;
      const eqParts = eqText.split('=');
      let reactantsHtml = eqParts[0] || eqText;
      if (currentItem.data.condition) {
        reactantsHtml += `<span class="condition">条件：${currentItem.data.condition}</span>`;
      }
      this.reactantsEl.innerHTML = reactantsHtml;

      // Setup Back
      this.equationEl.innerHTML = eqText;
      this.typeEl.textContent = currentItem.data.type || '未知反应';

      // Update Rating Hints based on current card's SM2 state projection
      this._updateRatingHints(currentItem.state);
    } catch (e) {
      document.body.innerHTML = `<h1>Render Error: ${e.message}</h1><pre>${e.stack}</pre>`;
    }
  }

  _updateRatingHints(state) {
    const simulateSM2 = (grade) => SM2.processReview({ ...state }, grade);
    
    document.getElementById('hint-hard').textContent = `${simulateSM2(3).interval} 天`;
    document.getElementById('hint-good').textContent = `${simulateSM2(4).interval} 天`;
    document.getElementById('hint-easy').textContent = `${simulateSM2(5).interval} 天`;
  }

  _flipCard() {
    this.isFlipped = true;
    this.cardElement.classList.add('is-flipped');
    setTimeout(() => {
      this.btnControls.classList.add('visible');
    }, 300); // 延迟显示按钮，等翻页动画差不多完成
  }

  _handleRating(grade) {
    const currentItem = this.deck[this.currentCardIndex];
    
    // 1. Process via SM2
    const newState = SM2.processReview(currentItem.state, grade);
    
    // 2. Save back to localStorage
    const rawRecords = JSON.parse(localStorage.getItem('learning_records') || '{}');
    rawRecords[currentItem.id] = {
      ...rawRecords[currentItem.id],
      ...newState
    };
    localStorage.setItem('learning_records', JSON.stringify(rawRecords));

    // 3. Move to next card
    this.btnControls.classList.remove('visible');
    this.cardElement.classList.remove('is-flipped');
    this.isFlipped = false;
    
    this.currentCardIndex++;
    
    setTimeout(() => {
      this._renderCurrentCard();
    }, 300); // 等卡片翻转回正面后再渲染下一张
  }

  _showDoneState() {
    this.container.classList.add('hidden');
    this.btnControls.classList.add('hidden');
    document.querySelector('.stats-bar').style.display = 'none';
    this.doneState.classList.remove('hidden');
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
  new FlashcardApp();
});
