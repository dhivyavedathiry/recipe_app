const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dietaryPreference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  difficultyLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preparationTime: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true,
  },
});

module.exports = Recipe;
