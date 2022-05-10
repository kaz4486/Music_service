import { templates, select } from '../settings.js';
//import Player from './Player.js';

class Home {
  constructor(element, dataSongs, dataAuthors) {
    const thisHome = this;
    //thisHome.initData(dataSongs, dataAuthors);
    thisHome.render(element, dataSongs, dataAuthors);

    //thisHome.initWidgets(thisHome.dom.players, data);
  }

  /*initData(dataSongs, dataAuthors) {
    const thisHome = this;

    /*thisHome.data.songs = dataSongs;
    thisHome.data.authors = dataAuthors;*
  }*/
  render(element, songs, authors) {
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.songWrapper = element;

    for (let song of songs) {
      const songId = song.id;
      console.log(songId);
      const songTitle = song.title;
      const songCategories = song.categories;
      const songRanking = song.ranking;
      const songFileName = song.filename;
      //const songFileNameLowerCase = songFileName.toLowerCase();

      // get author
      /*const nameSongAndAuthor = songFileNameLowerCase
        .replaceAll('_', ' ')
        .replace('-', '')
        .replace('.mp3', '');*/

      //const songAuthor = nameSongAndAuthor.replace(songTitle, '').trim();
      const songAuthor = authors.find(
        (author) => author.id === song.author
      ).fullName;

      console.log(songAuthor);

      const songData = {
        songId,
        songTitle,
        songAuthor,
        songCategories,
        songRanking,
        songFileName,
      };
      console.log(songData);
      const generatedHTML = templates.player(songData);

      thisHome.dom.songWrapper.innerHTML += generatedHTML;
      console.log(thisHome.dom.songWrapper.innerHTML);
    }

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);
    thisHome.navLinksContainer = document.querySelector(
      select.containerOf.navLinks
    );

    const idFromHash = window.location.hash.replace('#', '');

    //początek metody
    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      console.log({ page });
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisHome.activatePage(pageMatchingHash);
    //koniec ; argument = event.target.value

    /*thisHome.dom.players = thisHome.dom.wrapper.querySelectorAll(
      select.home.players
    );
    console.log(thisHome.dom.players);*/
    thisHome.navLinksContainer.addEventListener('click', function (event) {
      console.log(event);
      event.preventDefault();
      thisHome.initPages(event);
    });
  }

  initPages(event) {
    const thisHome = this;

    let pageMatchingHash = thisHome.pages[0].id;

    const idFromHash = event.target.hash.replace('#', '');

    for (let page of thisHome.pages) {
      console.log({ page });
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisHome.activatePage(pageMatchingHash);
  }

  activatePage(pageId) {
    const thisHome = this;

    // add class 'active to matching pages, remove from non-matching
    for (let page of thisHome.pages) {
      page.classList.toggle('active', page.id == pageId);
    }
  }
  /*initWidgets(elements) {
    const thisHome = this;

    for (let element of elements) {
      thisHome.player = new Player(element);
    }
  }*/
}

export default Home;
