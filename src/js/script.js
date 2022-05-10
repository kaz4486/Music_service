import { settings, select } from './settings.js';
import Home from './components/Home.js';

const app = {
  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        // save parsedResponse as a thisApp.data.songs
        thisApp.data.songs = parsedResponse;

        // const songsObject = Object.assign({}, [thisApp.data.songs]);

        // execute initHome method
        thisApp.initHome(thisApp.data.songs);
      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);

    thisApp.initData();
  },

  initHome(data) {
    const thisApp = this;

    const songContainer = document.querySelector(select.containerOf.songBox);
    thisApp.home = new Home(songContainer, data);
  },
};

app.init();
