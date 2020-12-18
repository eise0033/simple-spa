//app is for general control over the application
//and connections between the other components
const APP = {
  keybase: "eise0033-final-assignment",
  keys: [],
  baseURL: 'https://api.themoviedb.org/3/',
  configData: null,
  searchURL: null,
  api_key: '23c75e09b823ce4864be9c6b9a262615',
  df: document.createDocumentFragment(),
  init: () => {
    //this function runs when the page loads
    let form = document.getElementById('search-form');
    form.addEventListener("submit", SEARCH.findActors);
    document.getElementById('btnSearch').addEventListener('click', APP.saveActors);
    document.querySelector('div').addEventListener('click', APP.loadActors);
    SEARCH;
    STORAGE.loadMedia();
    NAV;
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
      div.classList.remove("active");
      if(Actors.profile_path == null){
        img.src = "./img/avatar-icon.jpg";
      }
      div.append(img);
      div.append(name);
      div.append(popularity);
      content.append(div);
      document.querySelector("#media").addEventListener("click", MEDIA.displayMedia);
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
  displayMedia: function() {
    SEARCH.results.forEach(Media => {
      let img = document.createElement("img");
      let title = document.createElement("h1");
      let description = document.createElement("p");
      let div = document.createElement("div");
      let content = document.getElementById("media").getElementsByClassName("content")[0];
      title.innerText = Media.title;
      description.innerText = Media.overview;
      img.src = `https://image.tmdb.org/t/p/w500${Media.poster_path}`;
      img.className = "media-image";
      div.classList.add("active");
      if(Media.poster_path == null){
        img.src = "./img/avatar-icon.jpg";
      }
      div.append(img);
      div.append(title);
      div.append(description);
      content.append(div);
    });
  },
};

//storage is for working with localstorage
const STORAGE = {
  loadMedia: function() {
  let num = localStorage.length;
    if (num) {
      APP.keys = []; //reset the keys array
      for (let i = 0; i < num; i++) {
        let key = localStorage.key(i);
        if (key.startsWith(APP.keybase)) {
          APP.keys.push(key);
        }
      }
      APP.keys.sort();
    }
  },
  buildNav: function() {
    let nav = document.querySelector('div');
    nav.innerHTML = '';
    let df = document.createDocumentFragment();
    APP.keys.forEach((key) => {
    //create a new anchor in the header for each show
      let a = document.createElement('a');
      a.className = 'actors';
      a.textContent = key.replace(APP.keybase, '');
      df.append(a);
    });
    nav.append(df);
  },
  saveActors: function(ev) {
    ev.preventDefault();
    let show = document.getElementById('media').value.trim();
    let char = document.getElementById('actors').value.trim();
    if (media && actors) {
      //if both a show and character are provided
      let key = APP.keybase + media.toLowerCase();
      let storage = localStorage.getItem(key);
      let actors = [];
      if (storage) {
        actors = JSON.parse(storage);
      }
      actors.push(actor);
      actors = Array.from(new Set(actors));
      localStorage.setItem(key, JSON.stringify(actors));
      document.getElementById('media').value = '';
      document.getElementById('actors').value = '';

      APP.loadShows();
    }
  },
  loadActors: function(ev) {
    if (ev.target.tagName === 'A') {
      //put the show name into the input field
      let media = ev.target.textContent.toLowerCase();
      document.getElementById('media').value = media;
      //remove old active show class
      //set current active class
      let oldactive = document.querySelector('section.active');
      if (oldactive) {
        oldactive.classList.remove('active');
      }
      ev.target.classList.add('active');
      //get the characters for the show and build the footer
      let key = APP.keybase + media;
      let storage = localStorage.getItem(key);
      if (storage) {
        let actors = JSON.parse(storage);
        APP.buildActors(actors);
      }
    }
  },
  buildActors(actors) {
    let foot = document.querySelector('footer');
    foot.innerHTML = '';
    let df = document.createDocumentFragment();
    actors.forEach((actor) => {
      //build the spans in the footer
      let span = document.createElement('span');
      span.className = 'actor';
      span.textContent = actor;
      df.append(span);
    });
    foot.append(df);
  },
};
  //this will be used in Assign 4

//nav is for anything connected to the history api and location
const NAV = {
  onpopstate: function(ev) {
    ev.preventDefault();
    alert(`location: ${document.location}`);
    history.go({page: 1});
  },
  //this will be used in Assign 4
};

//Start everything running

document.addEventListener("DOMContentLoaded", APP.init);

//known for property display it on media page: movie image, title, description. Change active page to display media content. Search up classlist.add and Classlist.remove. To remove active class from actors and add it to media class.