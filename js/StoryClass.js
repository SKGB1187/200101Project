/*Story Class is important because of how it deals with the data that comes in 
from the API and how the hostname is gained, otherwise it simply acts as a base
class for the rest of the application*/
"use strict";

class Story {

    /** Make instance of Story from data object about story:
     *   - {title, author, url, username, storyId, createdAt}
     */
  
    constructor({ storyId, title, author, url, username, createdAt }) {
      this.storyId = storyId;
      this.title = title;
      this.author = author;
      this.url = url;
      this.username = username;
      this.createdAt = createdAt;
    }
  
    /** Parses hostname out of URL and returns it. */
  
    getHostName() {
      const hostname = this.url
  
      if (!hostname){
        return undefined;
      }
  
      return (new URL(hostname)).hostname;
    }
  }