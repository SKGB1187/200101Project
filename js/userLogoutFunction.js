/*Previous Developer's code and comments untouched, only moved to its own file 
to make it easier to find*/

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
    console.debug("logout", evt);
    localStorage.clear();
    location.reload();
  }
  
  $navLogOut.on("click", logout);