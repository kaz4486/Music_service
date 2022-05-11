import { settings, select } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';

const app = {
  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const urlSongs = settings.db.url + '/' + settings.db.songs;
    const urlAuthors = settings.db.url + '/' + settings.db.authors;

    //const fetchPromise1 = fetch(urlSongs);
    //const fetchPromise2 = fetch(urlAuthors);

    fetch(urlSongs)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        // save parsedResponse as a thisApp.data.songs
        thisApp.data.songs = parsedResponse;

        // const songsObject = Object.assign({}, [thisApp.data.songs]);

        // execute initHome method
        //thisApp.initHome(thisApp.data.songs);
      });

    fetch(urlAuthors)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        // save parsedResponse as a thisApp.data.songs
        thisApp.data.authors = parsedResponse;

        // const songsObject = Object.assign({}, [thisApp.data.songs]);

        // execute initHome method
        thisApp.initHome(thisApp.data.songs, thisApp.data.authors);
        thisApp.initSearch(thisApp.data.authors);
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);

    thisApp.initData();
  },

  initHome(dataSongs, dataAuthors) {
    const thisApp = this;

    const songContainer = document.querySelector(select.containerOf.songBox);
    thisApp.home = new Home(songContainer, dataSongs, dataAuthors);
  },
  initSearch(dataSongs) {
    const thisApp = this;

    const searchContainer = document.querySelector(
      select.containerOf.searchBox
    );
    thisApp.search = new Search(searchContainer, dataSongs);
  },
};

app.init();
