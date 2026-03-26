/**
 * SM-2 Algorithm Implementation for Spaced Repetition
 * Source: SuperMemo 2 Algorithm
 */

class SM2 {
  /**
   * Process a review and return the next state
   * @param {Object} card Current card state { interval, repetition, easeFactor }
   * @param {number} grade The grade given by user: 
   *    0: Blackout (完全忘记 - 忘记)
   *    1: Incorrect with hesitation (困难，且答错)
   *    2: Incorrect but easily recalled upon seeing answer
   *    3: Correct but with serious difficulty (困难)
   *    4: Correct with hesitation (掌握/良好)
   *    5: Perfect response (简单)
   * 
   * In our simple UI, we'll map buttons to:
   * "忘记" (Forgot) -> Grade 0
   * "困难" (Hard)   -> Grade 3
   * "掌握" (Good)   -> Grade 4
   * "简单" (Easy)   -> Grade 5
   * 
   * @returns {Object} New card state { interval, repetition, easeFactor, nextReviewDate }
   */
  static processReview(card, grade) {
    let { interval = 0, repetition = 0, easeFactor = 2.5 } = card;

    if (grade >= 3) {
      // User remembered the card
      if (repetition === 0) {
        interval = 1; // 1 day interval for first successful review
      } else if (repetition === 1) {
        interval = 6; // 6 days interval for second successful review
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetition++;
    } else {
      // User forgot the card
      repetition = 0;
      interval = 1; // Start over tomorrow (or could be 0 for today)
    }

    // Update Ease Factor
    // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    
    // Ease Factor should not fall below 1.3
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }

    // Calculate next review timestamp (Midnight of the target day)
    const now = new Date();
    // Reset to start of current day for consistent daily intervals
    now.setHours(0, 0, 0, 0); 
    const nextReviewDate = now.getTime() + (interval * 24 * 60 * 60 * 1000);

    return {
      interval,
      repetition,
      easeFactor,
      nextReviewDate,
      lastReviewed: Date.now()
    };
  }

  /**
   * Create an initial state for a new flashcard
   */
  static createInitialState() {
    return {
      interval: 0,
      repetition: 0,
      easeFactor: 2.5,
      nextReviewDate: 0, // 0 means it should be reviewed immediately
      lastReviewed: null
    };
  }
}

export default SM2;
