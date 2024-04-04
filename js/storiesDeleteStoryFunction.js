/*logic for removing a story the user created*/

"use strict";

async function deleteStory(evt) {
  console.debug("Delete Story Called")

  let tgt = evt.target;

  let storyId = tgt.dataset.storyid;

  $(tgt).closest("li").remove();
    
  await HackOrSnoozeAPI.stories_DeleteStory(currentUser, storyId);
  
  storyList.removeStory(storyId);
}

$(document).ready(function() {
  $("#add-story-form").on("submit", handleFormSubmission);
});

$listsOfStories.on("click", ".deleteaction", deleteStory);
