/* User class communicates with the HackOrSnoozeAPI file to pull user data*/
"use strict";

/*Previous Developer's Notes*/
/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:*/

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                stories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.stories = stories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /*code updated from original to call to the API file instead of directly to
  the API*/
  async toggleFavorite(storyList, storyId, isFavorite) {
    
    if (isFavorite) {
      if (!storyList.isFavorite(storyId)) {
        storyList.addFavorite(storyId);
      }
      HackOrSnoozeAPI.user_AddFavorite(this, storyId);
    } else {
      storyList.removeFavorite(storyId);
      HackOrSnoozeAPI.user_DeleteFavorite(this, storyId);
    }

  }

  /*Previous Developer's Notes*/
  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  /*code updated from original to call to the API file instead of directly to
  the API*/
  static async signup(username, password, name) {
    let user = await HackOrSnoozeAPI.user_newSignup(username, password, name);
    
    return user;
  }

  /*Previous Developer's Notes*/
  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  /*code updated from original to call to the API file instead of directly to
  the API*/
  static async login(username, password) {
    let user = await HackOrSnoozeAPI.user_loginUser(username, password);

    return user;
  }

  /*Previous Developer's Notes*/
  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  /*code updated from original to call to the API file instead of directly to
  the API*/
  static async loginViaStoredCredentials(token, username) {
    let ret = null;
    try {
      ret = await HackOrSnoozeAPI.user_getUser(token, username);
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }

    return ret;
  }
}
