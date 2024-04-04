/*puts favorite stories on page while returning if no favorite stories exist*/

"use strict";

function putFavoritesOnPage() {
    console.debug("putFavoritesOnPage")
    $favoriteStoriesList.empty();
  
    let favorites = storyList.getFavoriteStories();
  
    if (favorites.length == 0) {
      let li = `
      <li>
        <p> Sorry You Do Not Have Any Favorite Stories <p>
      </li>
      `;
      $favoriteStoriesList.append(li);
  
    } else {
      for (let story of favorites) {
        const $story = generateStoryMarkup(story);
        $favoriteStoriesList.append($story);
      }
    }
  
    $favoriteStoriesList.show();
  }