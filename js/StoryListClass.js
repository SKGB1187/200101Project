/*Previous devlopment called API in many different classes, leading to no trusted
source of truth in program, this is similar to the issue that occurs on the Springboard
website for % completion, where I student can see different % completions and does not
know which to trust. To alleviate this issue, the StoryList class was made the main
source of truth*/

"use strict";

/*StoryList acts similarly to a data transfer object, an intermediary between the API
and the business/UI concerns of the page*/
class StoryList {
  //IDs only
  allStoryIDs = [];

  //IDs only
  favoriteStoryIDs = [];

  //IDs only
  ownStoryIDs = [];

  //replacement for StoryList.stories
  storyIndex = {}

  constructor(stories) {
    for (let i of stories) {
      this.storyIndex[i.storyId] = i;
      this.allStoryIDs.push(i.storyId);
    }
    this.stories = stories;
  }

  getStories() {
    return this.allStoryIDs
               .map(a => { return this.storyIndex[a]; })
               .filter(a => { return a != null; });
  }

  getFavoriteStories() {
    return this.favoriteStoryIDs
      .map(a => { return this.storyIndex[a]; })
      .filter(a => { return a != null; })
      ;
  }

  getOwnStories() {
    return this.ownStoryIDs
      .map(a => { return this.storyIndex[a]; })
      .filter(a => { return a != null; });
  }

  static async getStoriesFromAPI() {
    return new StoryList(await HackOrSnoozeAPI.stories_GetAllStories());
  }

  getStoryById(storyId) {
    return storyIndex[storyId];
  }

  isFavorite(storyId) {
    let found = this.favoriteStoryIDs.filter(a => { return a == storyId; });
    return found.length > 0;
  }

  addFavorite(storyId) {
    this.favoriteStoryIDs.push(storyId);
  }

  removeFavorite(storyId) {
    this.favoriteStoryIDs = this.favoriteStoryIDs.filter(a => { return a != storyId });
  }

  isOwnStory(storyId) {
    let found = this.ownStoryIDs.filter(a => { return a == storyId; });
    return found.length > 0;
  }

  addOwnStory(storyId) {
    this.ownStoryIDs.push(storyId);
  }

  removeOwnStory(storyId) {
    this.ownStoryIDs = this.ownStoryIDs.filter(a => { return a != storyId });
  }

  removeStory(storyId) {
    this.storyIndex[storyId] = null;
    this.allStoryIDs = this.allStoryIDs.filter(a => {return a != storyId});
    this.removeFavorite(storyId);
    this.removeOwnStory(storyId);
  }

  refreshStoriesAfterUserLoginLogoff(currentUser) {
    if (currentUser) {
      this.ownStoryIDs = currentUser.stories.map(a => { return a.storyId });
      this.favoriteStoryIDs = currentUser.favorites.map(a => { return a.storyId });  
    } else {
      this.ownStoryIDs = [];
      this.favoriteStoryIDs = [];
    }
  }
  /*Previous Developer's notes and code*/
  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  async createNewStory(user, newStory) {
    console.debug("StoryList->createNewStory")

    let addedStory = await HackOrSnoozeAPI.stories_CreateNewStory(user, newStory);

    this.allStoryIDs.unshift(addedStory.storyId);
    this.ownStoryIDs.unshift(addedStory.storyId);
    this.storyIndex[addedStory.storyId] = addedStory;

    return addedStory;
  }

}