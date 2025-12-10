/**
 * High Scores Module
 * Manages loading, saving, and validating high scores
 */

const HIGHSCORES_FILE = '/highscores.json';
const MAX_SCORES = 10;

export class HighScores {
  constructor() {
    this.scores = [];
  }

  /**
   * Load high scores from the JSON file
   * @returns {Promise<Array>} Array of high score objects
   */
  async load() {
    try {
      const response = await fetch(HIGHSCORES_FILE);
      if (!response.ok) {
        console.warn('Could not load high scores, starting with empty list');
        this.scores = [];
        return this.scores;
      }
      const data = await response.json();
      this.scores = Array.isArray(data) ? data : [];
      // Sort by score descending
      this.scores.sort((a, b) => b.score - a.score);
      return this.scores;
    } catch (error) {
      console.error('Error loading high scores:', error);
      this.scores = [];
      return this.scores;
    }
  }

  /**
   * Check if a score qualifies for the top 10
   * @param {number} score - The score to check
   * @returns {boolean} True if score qualifies
   */
  isHighScore(score) {
    if (this.scores.length < MAX_SCORES) {
      return true;
    }
    return score > this.scores[this.scores.length - 1].score;
  }

  /**
   * Add a new high score
   * @param {string} name - Player name
   * @param {number} score - Player score
   * @returns {Array} Updated scores array
   */
  addScore(name, score) {
    const entry = {
      name: name.trim() || 'Anonymous',
      score: score,
      date: new Date().toISOString()
    };
    
    this.scores.push(entry);
    this.scores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    if (this.scores.length > MAX_SCORES) {
      this.scores = this.scores.slice(0, MAX_SCORES);
    }
    
    return this.scores;
  }

  /**
   * Get the current high scores
   * @returns {Array} Array of high score objects
   */
  getScores() {
    return this.scores;
  }

  /**
   * Get the rank of a specific score (1-based)
   * @param {number} score - The score to check
   * @returns {number} The rank (1 = highest), or -1 if not in top 10
   */
  getRank(score) {
    const index = this.scores.findIndex(s => s.score === score);
    return index >= 0 ? index + 1 : -1;
  }

  /**
   * Save high scores to localStorage as a backup
   * Note: We can't write to the JSON file from the browser,
   * so we use localStorage for persistence between sessions
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem('catch-snowflake-highscores', JSON.stringify(this.scores));
    } catch (error) {
      console.error('Error saving high scores to localStorage:', error);
    }
  }

  /**
   * Load high scores from localStorage as fallback
   */
  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('catch-snowflake-highscores');
      if (data) {
        this.scores = JSON.parse(data);
        this.scores.sort((a, b) => b.score - a.score);
      }
    } catch (error) {
      console.error('Error loading high scores from localStorage:', error);
    }
  }

  /**
   * Initialize: load from JSON first, then merge with localStorage
   */
  async initialize() {
    await this.load();
    
    // Load from localStorage and merge
    const localData = localStorage.getItem('catch-snowflake-highscores');
    if (localData) {
      try {
        const localScores = JSON.parse(localData);
        // Merge local scores with file scores
        const allScores = [...this.scores, ...localScores];
        // Remove duplicates and sort
        const uniqueScores = allScores.reduce((acc, current) => {
          const exists = acc.find(item => 
            item.name === current.name && 
            item.score === current.score &&
            item.date === current.date
          );
          if (!exists) {
            acc.push(current);
          }
          return acc;
        }, []);
        
        uniqueScores.sort((a, b) => b.score - a.score);
        this.scores = uniqueScores.slice(0, MAX_SCORES);
      } catch (error) {
        console.error('Error merging localStorage scores:', error);
      }
    }
    
    return this.scores;
  }
}
