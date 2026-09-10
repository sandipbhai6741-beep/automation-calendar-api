const axios = require('axios');

class JokeService {
  constructor() {
    this.apiUrl = process.env.JOKE_API_URL || 'https://v2.jokeapi.dev/joke';
  }

  /**
   * Get a random joke from external API
   * @param {string} category - Category of joke (general, programming, knock-knock, etc.)
   * @returns {Promise<Object>} - Joke object
   */
  async getRandomJoke(category = 'Any') {
    try {
      const response = await axios.get(`${this.apiUrl}/${category}`);
      
      if (response.data.error) {
        throw new Error('Failed to fetch joke from API');
      }

      return {
        success: true,
        data: {
          type: response.data.type,
          category: response.data.category,
          joke: response.data.type === 'single' 
            ? response.data.joke 
            : `${response.data.setup} ${response.data.delivery}`,
          flags: response.data.flags
        }
      };
    } catch (error) {
      console.error('Error fetching joke:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get multiple random jokes
   * @param {number} count - Number of jokes to fetch
   * @param {string} category - Category of jokes
   * @returns {Promise<Array>} - Array of jokes
   */
  async getMultipleJokes(count = 5, category = 'Any') {
    try {
      const jokes = [];
      for (let i = 0; i < count; i++) {
        const joke = await this.getRandomJoke(category);
        if (joke.success) {
          jokes.push(joke.data);
        }
      }
      return {
        success: true,
        count: jokes.length,
        data: jokes
      };
    } catch (error) {
      console.error('Error fetching multiple jokes:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get available joke categories
   * @returns {Array} - List of categories
   */
  getCategories() {
    return ['Any', 'General', 'Programming', 'Knock-Knock'];
  }
}

module.exports = new JokeService();
