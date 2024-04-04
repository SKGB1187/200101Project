/*Previous Developer's code and comments untouched, only moved to its own file 
to make it easier to find*/
"use strict";

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
    console.debug("checkForRememberedUser");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username || token == "undefined") return false;
  
    // try to log in with these credentials (will be null if login failed)
    currentUser = await User.loginViaStoredCredentials(token, username);
  }
  
  /** Sync current user information to localStorage.
   *
   * We store the username/token in localStorage so when the page is refreshed
   * (or the user revisits the site later), they will still be logged in.
   */
  
  function saveUserCredentialsInLocalStorage() {
    console.debug("saveUserCredentialsInLocalStorage");
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }