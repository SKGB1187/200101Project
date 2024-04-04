/*This page is a list of variable dependencies that are used in multiple locations 
of the code base*/

/*find DOM elements once:*/
const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoriteStoriesList = $('#favoriteStories');
const $myStoriesList = $('#myStories');

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $addStoryForm = $("#add-story-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit");
const $navFavorites = $("#nav-favorites");
const $navMyStories = $("#nav-mystories");

const $listsOfStories = $(".list-of-stories");

/*global currently-logged-in user*/
let currentUser;

/*global StoryList*/
let storyList;