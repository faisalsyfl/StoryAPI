const TopStory = require('../models/TopStory');
const storyService = require('../services/story.service')();
const Story = require('../models/Story');

const StoryController = () => {


  const getTopStory = async (req, res) => {
    try {
      const topstories = await storyService.getTopStory();
      return res.status(200).json(topstories.map((v)=>parseInt(v)));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const getStory = async (req, res) => {
    console.log(req);
    const { params, query } = req;
    try {
      if(params.id){
        // Get Specific id
        const story = await storyService.getStory({id: params.id});
        return res.status(200).json({
          id:story.id,
          by:story.by,
          descendants:story.descendants,
          type:story.type,
          time:story.time,
          text:story.text,
          kids:story.kids,
          url:story.url,
          score:story.score,
          title:story.title
        });
      }else if(query){
        //Get All with conditions

        const story = await storyService.getFilter({
          //filters down here..
          isFavorite: query.isFavorite ? query.isFavorite : 0,
          
        });
        return res.status(200).json(story.map((v) => v ));
      }else{
        return res.status(200).json({msg: "ID Not found"});
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const getFavorite = async (req, res) => {
    const { params } = req;
    try {
      if(params){
        const story = await storyService.getStory({
          isFavorite: true
        });
        return res.status(200).json({ story });
      }else{
        return res.status(200).json({msg: "ID Not found"});
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const fetchSource = async (req, res) => {
    try {
      const sources = await storyService.fetchAll();
      return res.status(200).json({ msg: 'Success fetch topstories.json into database'});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  
  const fetchStory = async (req, res) => {
    const { body } = req;
    try {
      const row_inserted = await storyService.fetchId();
      return res.status(200).json({msg: "Sucessfully added "+row_inserted+"row." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const favorite = async (req, res) => {
    const { body,params } = req;
    try {
      const story = await Story.findOne({where : {id : params.id}});
      if(story){
        story.update({
          isFavorite: body.isFavorite
        });
        return res.status(200).json({msg: "Sucesssfully change "+story.title+" favorite."});
      }else{
        return res.status(200).json({msg: "ID Not found."});
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };



  return {
    getTopStory,
    getStory,
    fetchSource,
    fetchStory,
    getFavorite,
    favorite
  };
};

module.exports = StoryController;