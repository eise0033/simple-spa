const APP = {
  keybase: 'Steve-Shows-App-',
  keys: [],
  init() {
    //start the app
    document.getElementById('btnSave').addEventListener('click', APP.saveChar);
    document.querySelector('header').addEventListener('click', APP.loadChar);
    APP.loadShows();
  },
  saveChar(ev) {
    ev.preventDefault();
    let show = document.getElementById('show').value.trim();
    let char = document.getElementById('char').value.trim();
    if (show && char) {
      //if both a show and character are provided
      let key = APP.keybase + show.toLowerCase();
      let storage = localStorage.getItem(key);
      let chars = [];
      if (storage) {
        chars = JSON.parse(storage);
      }
      chars.push(char);
      chars = Array.from(new Set(chars));
      localStorage.setItem(key, JSON.stringify(chars));
      document.getElementById('show').value = '';
      document.getElementById('char').value = '';

      APP.loadShows();
    }
  },
  loadShows() {
    //go to localstorage and retrieve all the keys that start with APP.keybase
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
      APP.buildNav();
    }
  },
  buildNav() {
    let nav = document.querySelector('header');
    nav.innerHTML = '';
    let foot = document.querySelector('footer');
    foot.innerHTML = '';
    let df = document.createDocumentFragment();
    APP.keys.forEach((key) => {
      //create a new anchor in the header for each show
      let a = document.createElement('a');
      a.className = 'show';
      a.textContent = key.replace(APP.keybase, '');
      df.append(a);
    });
    nav.append(df);
  },
  loadChar(ev) {
    if (ev.target.tagName === 'A') {
      //put the show name into the input field
      let show = ev.target.textContent.toLowerCase();
      document.getElementById('show').value = show;
      //remove old active show class
      //set current active class
      let oldactive = document.querySelector('header a.active');
      if (oldactive) {
        oldactive.classList.remove('active');
      }
      ev.target.classList.add('active');
      //get the characters for the show and build the footer
      let key = APP.keybase + show;
      let storage = localStorage.getItem(key);
      if (storage) {
        let chars = JSON.parse(storage);
        APP.buildChars(chars);
      }
    }
  },
  buildChars(chars) {
    let foot = document.querySelector('footer');
    foot.innerHTML = '';
    let df = document.createDocumentFragment();
    chars.forEach((char) => {
      //build the spans in the footer
      let span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      df.append(span);
    });
    foot.append(df);
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
