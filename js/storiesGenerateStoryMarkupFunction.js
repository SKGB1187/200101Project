/*generates story markup for when a user is or is not logged in to the application*/

"use strict";

function generateStoryMarkup(story) {
  const hostName = story.getHostName();

  let isFavorite = storyList.isFavorite(story.storyId);

  const starType = isFavorite ? "fas" : "far";

  return $(`
        <li id="${story.storyId}">
        ${currentUser ? `
          <div class="starDiv">
            <span class="favoritestar star">
              <i data-isfavorite="${isFavorite}" data-storyid="${story.storyId}" class="${starType} fa-star"></i>
            </span>
          </div>
          ` : ""}
          ${currentUser && story.username == currentUser.username ? `
          <div class="deleteDiv">
            <span class="deleteaction trash-can" data-storyid="${story.storyId}"><i data-storyid="${story.storyId}" class="fas fa-trash-alt"></i></span>
          </div>
          ` : ""
          }
          <div class="storyHostnameDiv">
            <a href="${story.url}" target="a_blank" class="story-link">
              ${story.title}
            </a>
            <small class="story-hostname">(${hostName})</small>
          </div>
          <div class="story-author">by ${story.author}</div>
          <div class="story-user">posted by ${story.username}</div>
          
        </li>
      `);
}