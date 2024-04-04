/*This code has been signifcantly reworked from its original form. This was done to
help me learn how to separate concerns (the original code alluded to this, but separated
concerns in a challenging way). This code separates the concerns using a external, model,
view methodology. This separates the concerns into the external i.e. the Hack or Snooze API, 
the model i.e. the Story, Storylist and User classes with associated functions, and the
view i.e. the UI concerns. Much of the code base was pair programmed between myself and 
my personal mentor Mike Burr (not associated with Springboard)*/
"use strict";

/*created an API class to isolate the external concerns associated with using this API.
This should make it easier to debug if an issue occurs with this API in the future, and
simplifies the code so that multiple APIs could be implemented on the same website, each
under their own class*/

class HackOrSnoozeAPI {

    static BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

    //Previous developer's notes 
    // Note presence of `static` keyword: this indicates that getStories is
    // **not** an instance method. Rather, it is a method that is called on the
    // instance method?  
    // query the /stories endpoint (no auth required)
    // turn plain old story objects from API into instances of Story class
    // build an instance of our own class using the new array of stories
    // class directly. Why doesn't it make sense for getStories to be an

    static async stories_GetAllStories() {
        console.debug("API -> Get All Stories")
        let ret = null;

        try {
            const response = await axios({
                url: `${HackOrSnoozeAPI.BASE_URL}/stories`,
                method: "GET",
            });

            const stories = response.data.stories.map(story => new Story(story));

            ret = stories; //Array<Story>

        } catch (ex) {
            console.debug("error: " + JSON.stringify(ex))
        }

        return ret;
    }

    //Previous developer's notes 
    /** Adds story data to API, makes a Story instance, adds it to story list.
     * - user - the current instance of User who will post the story
     * - obj of {title, author, url}
     *
     * Returns the new Story instance
     */
    static async stories_CreateNewStory(user, newStory) {
        console.debug("API -> Create New Story")
        let ret = null;

        console.debug("add Story Called")
        try {
            const response = await axios({
                url: `${HackOrSnoozeAPI.BASE_URL}/stories`,
                method: "POST",
                data: {
                    token: user.loginToken,
                    story: newStory
                },
            });

            console.debug("response is " + JSON.stringify(response));

            const story = response.data.story;
            const addedStory = new Story(story);
            ret = addedStory;
           
        } catch (error) {
            console.error("Error adding story:", error);
            throw error;
        }

        console.debug("addedStory being returned from addStory is " + JSON.stringify(ret));
        return ret;
    }

    /*connects to the API for deleting a story from the API*/
    static async stories_DeleteStory(user, storyId) {
        try {
            await axios({
              url: `${HackOrSnoozeAPI.BASE_URL}/stories/${storyId}`,
              method: "DELETE",
              data: {
                token: user.loginToken
              }
            });
          } catch (error) {
            console.error("Error deleting story:", error);
          }
    }

    /*allows user to add favorite stories through API call*/
    /* static implementation for user and story ID parameters*/
    static async user_AddFavorite(user, storyId) {
        console.debug("API -> Add Favorite")

        let ret = true;

        if (user) {
            if (storyId) {
                try {
                    await axios({
                        url: `${HackOrSnoozeAPI.BASE_URL}/users/${user.username}/favorites/${storyId}`,
                        method: "POST",
                        data: {
                            token: user.loginToken
                        }
                    });
                } catch (error) {
                    ret = false;
                    console.error("Error updating favorites:", error);
                }
            } else {
                console.warn("Attempt to call API method with invalid input - storyId is: " + JSON.stringify(storyId));
                ret = false;
            }
        } else {
            console.warn("Attempt to call authenticated API method with invalid or missing user - user is: " + JSON.stringify(user));
            ret = false;
        }
        return ret;
    }

    /*allows user to delete stories they have added to the API using API call*/
    static async user_DeleteFavorite(user, storyId) {
        console.debug("API -> Delete Favorite")

        let ret = true;

        if (user) {
            if (storyId) {
                try {
                    await axios({
                        url: `${HackOrSnoozeAPI.BASE_URL}/users/${user.username}/favorites/${storyId}`,
                        method: "DELETE",
                        data: {
                            token: user.loginToken
                        }
                    });

                } catch (error) {
                    ret = false;
                    console.error("Error updating favorites:", error);
                }
            } else {
                console.warn("Attempt to call API method with invalid input - storyId is: " + JSON.stringify(storyId));
                ret = false;
            }
        } else {
            console.warn("Attempt to call authenticated API method with invalid or missing user - user is: " + JSON.stringify(user));
            ret = false;
        }
        return ret;
    }

    /*retrieves a single user document, namely token through API call*/   
    static async user_getUser(token, username) {
        const response = await axios({
            url: `${HackOrSnoozeAPI.BASE_URL}/users/${username}`,
            method: "GET",
            params: { token },
        });

        let { user } = response.data;

        return new User(user, token);
    }

    /*post to the API to login a user using credentials*/
    static async user_loginUser(username, password) {
        const response = await axios({
            url: `${HackOrSnoozeAPI.BASE_URL}/login`,
            method: "POST",
            data: { user: { username, password } },
        });

        let { user, token } = response.data;

        return new User(user, token);
    }

    /*allows a user to create a login via a post to API*/
    static async user_newSignup(username, password, name) {
        const response = await axios({
            url: `${HackOrSnoozeAPI.BASE_URL}/signup`,
            method: "POST",
            data: { user: { username, password, name } },
          });
      
          let { user, token } = response.data

          return new User(user, token);
    }

}