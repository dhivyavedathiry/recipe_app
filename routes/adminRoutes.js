const express = require('express');
const { getUsers, deleteUser, manageRecipes } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const router = express.Router();

// Get all users
router.get('/users', authMiddleware, isAdmin, getUsers);

// Delete a user
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);

// Manage recipes (view and delete)
router.get('/recipes', authMiddleware, isAdmin, manageRecipes);

module.exports = router;
