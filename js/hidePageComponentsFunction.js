/*only variables added to function, and separation of function into own file,
no other work done to original developer's code or comments*/

"use strict";

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
    const components = [
      $allStoriesList,
      $loginForm,
      $signupForm,
      $addStoryForm,
      $favoriteStoriesList,
      $myStoriesList
    ];
    components.forEach(c => c.hide());
  }