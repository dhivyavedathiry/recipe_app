const express = require('express');
const { createRecipe, getAllRecipes, searchRecipes, updateRecipe, deleteRecipe, editRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middlewares/multerMiddleware'); // Middleware for file uploads
const router = express.Router();


// Create a recipe
router.post('/recipes', authMiddleware, upload.single('image'), createRecipe);

// Get all recipes
router.get('/', getAllRecipes);

// Search recipes
router.get('/search', searchRecipes);

// Update a recipe
router.put('/:id', authMiddleware, upload.single('image'), updateRecipe);

// Edit a recipe
router.put('/recipes/:id', authMiddleware, upload.single('image'), editRecipe);
// Delete a recipe
router.delete('/recipes/:id', authMiddleware, deleteRecipe);


module.exports = router;
