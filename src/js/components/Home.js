import { templates } from '../settings.js';
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
      //console.log(songId);
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
      const songAuthorLow = authors.find(
        (author) => author.id === song.author
      ).fullName;

      const songAuthor = songAuthorLow.toUpperCase();

      const songData = {
        songId,
        songTitle,
        songAuthor,
        songCategories,
        songRanking,
        songFileName,
      };
      const generatedHTML = templates.playerHome(songData);

      thisHome.dom.songWrapper.innerHTML += generatedHTML;
      // eslint-disable-next-line no-undef
      GreenAudioPlayer.init({
        selector: 'player', // inits Green Audio Player on each audio container that has class "player"
        stopOthersOnPlay: true,
      });
    }
  }

  initPages(pageId) {
    const thisHome = this;

    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      //console.log({ page });
      if (page.id == pageId) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisHome.activatePage(pageMatchingHash);
  }
}

export default Home;
