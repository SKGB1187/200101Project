/*Code updated to call StoryList for single point of truth, moved to its own file 
to make it easier to find*/

"use strict";

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStoriesFromAPI();
    $storiesLoadingMsg.remove();
  
    putStoriesOnPage();
  }