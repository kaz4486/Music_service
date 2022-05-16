import { settings, select } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run this.App.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    /* add class 'active to matching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
    }

    /* add class 'active to matching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
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
        // save parsedResponse as a thisApp.data.songs
        thisApp.data.authors = parsedResponse;

        // const songsObject = Object.assign({}, [thisApp.data.songs]);

        // execute initHome method
        thisApp.initHome(thisApp.data.songs, thisApp.data.authors);
        thisApp.initSearch(thisApp.data.authors);
        thisApp.initDiscover(thisApp.data.songs, thisApp.data.authors);
      });

    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);

    thisApp.initPages();
    thisApp.initData();
  },

  initHome(dataSongs, dataAuthors) {
    const thisApp = this;

    const songContainer = document.querySelector(select.containerOf.songBox);
    thisApp.home = new Home(songContainer, dataSongs, dataAuthors);
  },
  initSearch(authors) {
    const thisApp = this;

    const searchContainer = document.querySelector(
      select.containerOf.searchBox
    );
    thisApp.search = new Search(searchContainer, authors);

    /*const songContainer = document.querySelector(select.containerOf.songBox);
    thisApp.search = new Search(songContainer, authors);*/
  },
  initDiscover(songs, authors) {
    const thisApp = this;

    const discoverContainer = document.querySelector(
      select.containerOf.discoverBox
    );

    thisApp.discover = new Discover(discoverContainer, songs, authors);
  },
};

app.init();
