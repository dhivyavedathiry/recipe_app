const express = require('express');
const { addFavorite, getFavorites, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Update user profile
router.put('/profile', authMiddleware, updateProfile);

// Add recipe to favorites
router.post('/favorites', authMiddleware, addFavorite);

// Get favorite recipes
router.get('/favorites', authMiddleware, getFavorites);

router.delete('/favorites', authMiddleware, removeFavorite);

module.exports = router;
