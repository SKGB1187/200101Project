/*Previous Developer's code and comments untouched, only moved to its own file 
to make it easier to find*/

"use strict";

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $navSubmit.show();
  $navFavorites.show();
  $navMyStories.show();
  $allStoriesList.show();

  updateNavOnLogin();

  storyList.refreshStoriesAfterUserLoginLogoff(currentUser);
}
