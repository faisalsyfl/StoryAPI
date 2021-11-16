const axios = require('axios');
const storyRepo = require('../repositories/StoryRepository')();
const topStoryRepo = require('../repositories/TopStoryRepository')();
const { hacker_url } = require('../../config/constant');
const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const storyService = () => {

  // Fetch Top Stories from sources
  const fetchAll = async () => {
    try {
      const response = await axios.get(hacker_url + '/topstories.json');
      if (response.data) {
        const truncate = await topStoryRepo.truncate();
        for (value of response.data) {
          const repo = await topStoryRepo.store({ id: value });
        }
      }
      return true;
    } catch (err) {
      throw (err);
    }
  };

  // Fetch detail each Top Stories into stories
  const fetchId = async (query) => {
    try {
      let limit = query?.limit ?? null;
      let offset = query?.offset ?? null

      const topStories = await topStoryRepo.index(limit, offset);
      let count = 0;
      for (v of topStories) {
        if (await storyRepo.check(v.id)) {
          const response = await axios.get(hacker_url + '/item/' + v.id + '.json').then((response) => {
            return response.data
          });
          const story = await storyRepo.store({
            id: response.id,
            by: response.by,
            descendants: response.descendants,
            kids: response.kids,
            score: response.score,
            time: response.time,
            title: response.title,
            type: response.type,
            url: response.url
          });
          if (story) count++;
        }
      }
      return count;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  /**
   * Get all top stories from database
   * @returns array of ids
   */
  const getTopStory = async () => {
    const topstories = await topStoryRepo.index(null, null);
    return topstories.map(({ id }) => id);
  }
  /**
   * 
   * @returns 
   */
  const getStory = async (params) => {
    const story = await storyRepo.show(params);
    return story;
  }

  const getFilter = async (params) => {
    const story = await storyRepo.index(params);
    return story;
  }

  return {
    fetchAll,
    fetchId,
    getTopStory,
    getStory,
    getFilter
  };
};

module.exports = storyService;
