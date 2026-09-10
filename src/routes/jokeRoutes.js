const express = require('express');
const jokeController = require('../controllers/jokeController');

const router = express.Router();

/**
 * GET /api/jokes/random
 * Get a random joke
 * Query params: category (optional)
 */
router.get('/random', (req, res) => jokeController.getRandomJoke(req, res));

/**
 * GET /api/jokes/multiple
 * Get multiple random jokes
 * Query params: count (optional, default 5), category (optional)
 */
router.get('/multiple', (req, res) => jokeController.getMultipleJokes(req, res));

/**
 * GET /api/jokes/categories
 * Get available joke categories
 */
router.get('/categories', (req, res) => jokeController.getCategories(req, res));

module.exports = router;
