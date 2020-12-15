//app is for general control over the application
//and connections between the other components
const APP = {
  baseURL: 'https://api.themoviedb.org/3/',
  configData: null,
  searchURL: null,
  api_key: '23c75e09b823ce4864be9c6b9a262615',
  df: document.createDocumentFragment(),
  init: () => {
    //this function runs when the page loads
    let form = document.getElementById('search-form');
    form.addEventListener("submit", SEARCH.findActors);
    SEARCH;
}
};

//search is for anything to do with the fetch api
const SEARCH = {
  results: [],
  findActors: (ev) => {
    console.log("inside findActors");
    ev.preventDefault();
    let txt = document.getElementById('search').value.trim();
//user has filled in search word
    let url = APP.baseURL.concat(`search/person?api_key=${APP.api_key}&query=`, txt);
    fetch(url)
    .then((resp)=>{
      if(resp.ok){
        return resp.json();
      }else{
        throw new Error('Failed to fetch search results');
      }
    })
    .then((data)=>{
//data is the object returned from the API
//save in the SEARCH.results property
      console.log(data);
      SEARCH.results = data.results;
      ACTORS.displayActors();
    })
  }
};

//actors is for changes connected to content in the actors section
const ACTORS = {
  displayActors: function() {
    SEARCH.results.forEach(Actors => {
      let img = document.createElement("img");
      let name = document.createElement("p");
      let popularity = document.createElement("p");
      let div = document.createElement("div");
      let content = document.getElementById("actors").getElementsByClassName("content")[0];
      name.innerText = Actors.name;
      popularity.innerText = Actors.popularity;
      img.src = `https://image.tmdb.org/t/p/w500${Actors.profile_path}`;
      img.className = "actor-image";
      if(Actors.profile_path == null){
        img.src = "./img/avatar-icon.jpg";
      }
      div.append(img);
      div.append(name);
      div.append(popularity);
      content.append(div);
    });
  },
  // cards: (ev) => {
  //   ev.preventDefault();
  //   let txt = document.getElementById('actors');
  //   let url = APP.baseURL.concat('&query=', txt);
  //   fetch(url)
  //   .then((resp)=>{
  //     if(resp.ok){
  //       return resp.json();
  //     }else{
  //       throw new Error('Failed to fetch actors');
  //     }
  //   })
  //   .then((data)=>{
  //     ACTORS.results = data.results;
  //     MEDIA;
  //   })
  // }
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

//known for property display it on media page: movie image, title, description. Change active page to display media content. Search up classlist.add and Classlist.remove. To remove active class from actors and add it to media class.