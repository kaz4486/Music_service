import { select, templates } from '../settings.js';
//import Player from './Player.js';

class Discover {
  constructor(element, songs, authors) {
    const thisDiscover = this;

    thisDiscover.songs = songs;
    thisDiscover.authors = authors;

    thisDiscover.render(element);
  }

  render(element) {
    const thisDiscover = this;

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;

    thisDiscover.dom.songDiscovered = document.querySelector(
      select.discover.songDiscovered
    );

    // drawing song

    const discoverSongId = Math.floor(Math.random() * 4) + 1;

    for (let song of thisDiscover.songs) {
      if (song.id === discoverSongId) {
        const songId = song.id;
        const songTitle = song.title;
        const songCategories = song.categories;
        const songRanking = song.ranking;
        const songFileName = song.filename;

        const songAuthorLow = thisDiscover.authors.find(
          (author) => author.id === song.author
        ).fullName;

        const songAuthor = songAuthorLow.toUpperCase();

        let songData = {
          songId,
          songTitle,
          songAuthor,
          songCategories,
          songRanking,
          songFileName,
        };
        const generatedHTML = templates.playerDiscover(songData);

        thisDiscover.dom.songDiscovered.innerHTML += generatedHTML;

        /*thisDiscover.dom.player = document.querySelector(
          select.discover.player
        );*/
      }
    }

    //thisDiscover.player = new Player(thisDiscover.dom.player);
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });
  }
}

export default Discover;
