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
    SEARCH;
}
};

//search is for anything to do with the fetch api
const SEARCH = {
  results: ["Scarlett Johansson", "Brad Pitt", "Dwayne Johnson", "Tom Hanks", "Will Smith", "Johnny Depp", "Arnold Schwarzenegger"],
findActors: (ev) => {
ev.preventDefault();
let txt = document.getElementById('search').value.trim();
//user has filled in search word
let url = APP.baseURL.concat('&query=', txt);
fetch(url)
.then((resp)=>{
if(resp.ok){
return resp.json();
}else{
throw new Error('Failed to fetch search results');
}
});
.then((data)=>{
//data is the object returned from the API
//save in the SEARCH.results property
SEARCH.results = data.results;
ACTORS;
    })
  }
};

//actors is for changes connected to content in the actors section
const ACTORS = {
  cards: 
};

//media is for changes connected to content in the media section
const MEDIA = {

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
