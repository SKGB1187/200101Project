/*logic for selecting and deselecting favorite stories*/

"use strict";

async function toggleFavorite(evt) {
  
    console.debug("toggle Favorite Called")
  
    let $tgt = $(evt.target);
    let tgt = evt.target;

    let storyId = tgt.dataset.storyid;
    let isFavorite = tgt.dataset.isfavorite == "true";
  
    if (isFavorite) {
      //unfavorite it here
      tgt.dataset.isfavorite = false;
    } else {
      //favorite it
      tgt.dataset.isfavorite = true;
    }
  
    console.debug("toggling in model and writing to server");
    currentUser.toggleFavorite(storyList, storyId, !isFavorite);
    
    //tgt.innerText = tgt.dataset.isfavorite == "true" ? "Un-Favorite" : "Favorite";
    $tgt.closest("i").toggleClass("fas far");    

  }

  $listsOfStories.on("click", ".favoritestar", toggleFavorite);