const Sequelize = require('sequelize');
const sequelize = require('../../config/database');



const tableName = 'top_stories';

const TopStory = sequelize.define('top_stories', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
  },
}, { tableName });



module.exports = TopStory;
