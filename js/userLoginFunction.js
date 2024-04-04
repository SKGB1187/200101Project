"use strict";

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
    console.debug("login", evt);
    evt.preventDefault();
  
    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();
  
    // User.login retrieves user info from API and returns User instance
    // which we'll make the globally-available, logged-in user.
    currentUser = await User.login(username, password);
  
    $loginForm.trigger("reset");
  
    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  }
  
$loginForm.on("submit", login);