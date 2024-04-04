/*my story submit form logic*/

"use strict";

async function handleFormSubmission(event) {
  event.preventDefault();

  let title = $("#title").val();
  let url = $("#url").val();
  const author = $("#author").val();

  if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  const newStory = {
    title: title,
    url: url,
    author: author
  };

  let addedStory = await storyList.createNewStory(currentUser, newStory)

  $("#add-story-form").trigger("reset");
  $("#add-story-form").hide();

  putStoriesOnPage();
  putMyStoriesOnPage();

}