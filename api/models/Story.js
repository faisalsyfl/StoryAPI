const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'stories';

const Story = sequelize.define('stories', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  by: {
    type: Sequelize.STRING,
  },
  descendants: {
    type: Sequelize.INTEGER
  },
  kids: {
    type: Sequelize.INTEGER
  },
  score: {
    type: Sequelize.INTEGER
  },
  time: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  isFavorite: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, { tableName });

module.exports = Story;
