import { select, settings, templates } from '../settings.js';

class Search {
  constructor(element, authors) {
    const thisSearch = this;

    thisSearch.initWidget(element, authors);
  }
  initWidget(element, authors) {
    const thisSearch = this;

    thisSearch.authors = authors;
    thisSearch.data = [];

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.songWrapper = element.querySelector(
      select.search.searchedSongs
    );

    thisSearch.dom.searchButton = element.querySelector(select.search.button);
    //console.log(thisSearch.dom.searchButton);

    thisSearch.dom.inputElement = document.querySelector(select.search.input);
    console.log(thisSearch.dom.inputElement);

    thisSearch.dom.searchButton.addEventListener('click', (event) =>
      thisSearch.handleSearchClick(event)
    );
  }
  handleSearchClick(event) {
    event.preventDefault();
    const thisSearch = this;

    const inputText = thisSearch.dom.inputElement.value;

    let urlSearchedSongs =
      settings.db.url + '/' + settings.db.songs + '?q=' + inputText;

    fetch(urlSearchedSongs)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        //console.log('parsedResponse:', parsedResponse);

        // save parsedResponse as a thisApp.data.songs

        thisSearch.data = parsedResponse;

        //console.log(thisSearch.data.searchedSongs);

        thisSearch.updateDOM();
      });
  }

  updateDOM() {
    const thisSearch = this;

    const searchedSongs = thisSearch.data;

    thisSearch.dom.songWrapper.innerHTML = [];

    for (let song of searchedSongs) {
      const songId = song.id;
      console.log(songId);
      const songTitle = song.title;
      const songCategories = song.categories;
      const songRanking = song.ranking;
      const songFileName = song.filename;

      const songAuthor = thisSearch.authors.find(
        (author) => author.id === song.author
      ).fullName;

      console.log(songAuthor);

      let songData = {
        songId,
        songTitle,
        songAuthor,
        songCategories,
        songRanking,
        songFileName,
      };
      //console.log(songData);
      const generatedHTML = templates.player(songData);

      thisSearch.dom.songWrapper.innerHTML += generatedHTML;
      //console.log(thisSearch.dom.songWrapper.innerHTML);
    }

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });
  }
}

export default Search;
