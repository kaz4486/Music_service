import { select, settings, templates } from '../settings.js';

class Search {
  constructor(element, authors) {
    const thisSearch = this;

    thisSearch.initWidget(element, authors);
  }

  initData(inputText, element, authors) {
    const thisSearch = this;

    thisSearch.data = {};

    const urlSearchedSongs =
      settings.db.url + '/' + settings.db.songs + '?q=' + inputText;

    fetch(urlSearchedSongs)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        // save parsedResponse as a thisApp.data.songs
        thisSearch.data.searchedSongs = parsedResponse;
        console.log(thisSearch.data.searchedSongs);

        thisSearch.updateDOM(thisSearch.data.searchedSongs, element, authors);
      });
  }

  initWidget(element, authors) {
    const thisSearch = this;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;

    thisSearch.dom.searchButton = element.querySelector(select.search.button);
    console.log(thisSearch.dom.searchButton);

    thisSearch.dom.searchButton.addEventListener('click', function (event) {
      event.preventDefault();
      const inputElement = document.querySelector(select.search.input);
      const inputText = inputElement.value;
      console.log(inputText);
      thisSearch.initData(inputText, element, authors);
    });
  }

  updateDOM(searchedSongs, element, authors) {
    console.log(searchedSongs);
    const thisSearch = this;

    thisSearch.dom = {};

    thisSearch.dom.songWrapper = element;

    for (let song of searchedSongs) {
      const songId = song.id;
      console.log(songId);
      const songTitle = song.title;
      const songCategories = song.categories;
      const songRanking = song.ranking;
      const songFileName = song.filename;

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

      thisSearch.dom.songWrapper.innerHTML += generatedHTML;
      console.log(thisSearch.dom.songWrapper.innerHTML);
    }

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });
  }
}

export default Search;
