const axios = require('axios');
const TopStory = require('../models/TopStory');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const TopStoryRepository = () => {

  const store = async (data) => {
    try {
      const topstory = await TopStory.create(data);
      return topstory;
    } catch (err) {
      throw (err);
    }
  }

  const index = async (limit, offset) => {
    try {
      const topstories = await TopStory.findAll({
        attributes: ['id'],
        offset: ((offset - 1) * limit),
        limit: limit,
        order: [
          ['id', 'ASC']
        ],
        subQuery: false
      });
      return topstories;
    } catch (err) {
      throw (err)
    }
  }

  const truncate = async () => {
    try {
      const topstories = await TopStory.destroy({ truncate: true, cascade: false });
      return topstories;
    } catch (err) {
      throw (err)
    }
  }

  return {
    store,
    index,
    truncate
  };
};

module.exports = TopStoryRepository
