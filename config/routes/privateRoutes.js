const privateRoutes = {
  // 'GET /users': 'UserController.getAll',
  'GET /topstories': 'StoryController.getTopStory',
  'GET /fetchSources': 'StoryController.fetchSource',
  'GET /fetchStories': 'StoryController.fetchStory',  
  'GET /story' : 'StoryController.getStory',
  'GET /story/:id' : 'StoryController.getStory',
  'POST /story/:id/favorite': 'StoryController.favorite',
};

module.exports = privateRoutes;
