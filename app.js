const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/admin', adminRoutes);


const User = require('./User');
const Recipe = require('./Recipe');
const Review = require('./Review');

// User-Recipe Relationship
User.hasMany(Recipe, { foreignKey: 'userId', onDelete: 'CASCADE' });
Recipe.belongsTo(User, { foreignKey: 'userId' });

// User-Review Relationship
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Recipe-Review Relationship
Recipe.hasMany(Review, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
Review.belongsTo(Recipe, { foreignKey: 'recipeId' });

module.exports = { User, Recipe, Review };

const sequelize = require('./config/db');
const { User, Recipe, Review } = require('./models');

// Test and sync database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true }); // Updates schema without dropping tables
  })
  .then(() => console.log('Models synchronized.'))
  .catch((err) => console.error('Database error:', err));

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
