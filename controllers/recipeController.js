const Recipe = require('../models/Recipe');
const AWS = require('aws-sdk');
const s3 = require('../config/s3');

// Create a Recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `recipes/${image.originalname}`,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    const upload = await s3.upload(params).promise();

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      imageUrl: upload.Location,
      userId: req.user.id,
    });

    res.status(201).json({ message: 'Recipe created successfully', recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};

// Edit a Recipe
exports.editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions } = req.body;
    const image = req.file;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Ensure the user owns the recipe
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // If a new image is provided, upload it to S3
    if (image) {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `recipes/${image.originalname}`,
        Body: image.buffer,
        ContentType: image.mimetype,
      };

      const upload = await s3.upload(params).promise();

      // Delete the old image from S3
      const oldImageKey = recipe.imageUrl.split('/').pop();
      await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `recipes/${oldImageKey}`,
        })
        .promise();

      recipe.imageUrl = upload.Location;
    }

    // Update recipe details
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    await recipe.save();

    res.status(200).json({ message: 'Recipe updated successfully', recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
};

// Delete a Recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Ensure the user owns the recipe
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete the recipe image from S3
    const imageKey = recipe.imageUrl.split('/').pop();
    await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `recipes/${imageKey}`,
      })
      .promise();

    // Delete the recipe from the database
    await recipe.destroy();

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};
//Add Recipe to Favorites
exports.addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    // Fetch the user
    const user = await User.findByPk(req.user.id);

    // Add the recipe to the user's favorites
    await user.addFavorite(recipeId);

    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// Remove Recipe from Favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    // Fetch the user
    const user = await User.findByPk(req.user.id);

    // Remove the recipe from the user's favorites
    await user.removeFavorite(recipeId);

    res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};
