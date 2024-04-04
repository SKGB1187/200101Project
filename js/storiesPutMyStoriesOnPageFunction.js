/*puts my stories on page while returning if no my stories exist*/
"use strict";

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage")
  $myStoriesList.empty();

  let mystories = storyList.getOwnStories();

  if (mystories.length == 0) {
    let li = `
    <li>
      <p> Sorry You Have Not Submitted Any Stories <p>
    </li>
    `;
    $myStoriesList.append(li);

  } else {
    for (let story of mystories) {
      const $story = generateStoryMarkup(story);
      $myStoriesList.append($story);
    }
  }

  $myStoriesList.show();
}