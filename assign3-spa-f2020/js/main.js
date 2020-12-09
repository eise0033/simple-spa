//app is for general control over the application
//and connections between the other components

let baseURL = 'https://api.themoviedb.org/3/'
let configData= null;
let searchURL = null;
let api_key = '23c75e09b823ce4864be9c6b9a262615'
let df = document.createDocumentFragment();
const APP = {
  init: () => {
    //this function runs when the page loads
    let div = document.getElementById('content');
    df.append(div);
    SEARCH();
  },
};

//search is for anything to do with the fetch api
const SEARCH = function () {
  let url = "".concat(baseURL, 'configuration?api_key=', api_key);
  fetch(url)
  .then((result) => {
    return result
  })
  .then((data) => {
    console.log(data);
    searchURL = data.images.secure_base_url;
    configData = data.images;
    SEARCH("Scarlett");
  })
  .catch(function(err) {
    alert(err);
  });
}

//actors is for changes connected to content in the actors section
const ACTORS = function(keyword){
  let url = "".concat(baseURL, 'search/person?api_key=', api_key, '&query=', keyword);
  fetch(url)
  .then((result) => {
    return result;
  })
  .then((data) => {
    document.getElementById('actors').innerHTML = data.images;
  });
};

//media is for changes connected to content in the media section
const MEDIA = function(){
  let url = "".concat(baseURL, 'movie/767-478682', '?api_key=', api_key);
  fetch(url)
  .then((result) => {
    return result;
  })
  .then((data) => {
    document.getElementById('media').innerHTML = data.images;
  });
};

//storage is for working with localstorage
const STORAGE = {
  //this will be used in Assign 4
};

//nav is for anything connected to the history api and location
const NAV = {
  //this will be used in Assign 4
};

//Start everything running

document.addEventListener("DOMContentLoaded", APP.init);
