const axios = require('axios');
const Story = require('../models/Story');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const StoryRepository = () => {

  const index = async (filters) => {
    try{
      const story = await Story.findAll({where:filters});
      return story;
    }catch(err){
      throw(err);
    }
  }

  const store = async (data) => {
    try{
      const story = await Story.create(data);
      return story;
    }catch(err){
      throw(err);
    }
  }

  const show = async (params) => {
    try{
      const story = await Story.findByPk(params.id,{attributes:{exclude:['createdAt','updatedAt']}})
      return story;
    }catch(err){
      throw(err);
    }
  }
  const truncate = async () => {
    try{
      const story = await Story.destroy({truncate:true, cascade: false});
      return story;
    }catch(err){
      throw(err)
    }
  }


  return {
    index,
    store,
    show,
    truncate
  };
};

module.exports = StoryRepository
