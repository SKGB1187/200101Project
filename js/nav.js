"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/* When a user clicks the submit button the form will appear to submit a story*/
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  if ($("#add-story-form").is(":hidden")) {
    $("#add-story-form").show();
  } else {
    $("#add-story-form").hide();
  }
}

$body.on("click", "#nav-submit", navSubmitClick);

/*When a user clicks on favorites link only favorite stories will show*/
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);

  hidePageComponents();
  putFavoritesOnPage();

}

$body.on("click", "#nav-favorites", navFavoritesClick);

/*When a user clicks on my stories link only my stories will show*/
function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  
  hidePageComponents();
  putMyStoriesOnPage();

}

$body.on("click", "#nav-mystories", navMyStoriesClick);