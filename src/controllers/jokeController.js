const jokeService = require('../services/jokeService');

class JokeController {
  /**
   * Get a random joke
   */
  async getRandomJoke(req, res) {
    try {
      const category = req.query.category || 'Any';
      const result = await jokeService.getRandomJoke(category);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get multiple random jokes
   */
  async getMultipleJokes(req, res) {
    try {
      const count = parseInt(req.query.count) || 5;
      const category = req.query.category || 'Any';

      if (count > 50) {
        return res.status(400).json({
          success: false,
          error: 'Maximum 50 jokes allowed per request'
        });
      }

      const result = await jokeService.getMultipleJokes(count, category);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get available categories
   */
  getCategories(req, res) {
    try {
      const categories = jokeService.getCategories();
      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

module.exports = new JokeController();
