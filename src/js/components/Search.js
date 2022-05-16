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

    thisSearch.dom.foundText = element.querySelector(select.search.foundText);
    //console.log(thisSearch.dom.foundText);

    thisSearch.dom.searchButton = element.querySelector(select.search.button);
    //console.log(thisSearch.dom.searchButton);

    thisSearch.dom.inputElement = element.querySelector(select.search.input);
    //console.log(thisSearch.dom.inputElement);

    thisSearch.dom.searchButton.addEventListener('click', (event) =>
      thisSearch.handleSearchClick(event)
    );
  }
  handleSearchClick(event) {
    console.log(event);
    console.log('clicked');
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
        thisSearch.data = parsedResponse;

        thisSearch.updateDOM();
      });

    /*let urls = {
      songsTitle:
        settings.db.url + '/' + settings.db.songsTitle + '?q=' + inputText,
      authorsName:
        settings.db.url + '/' + settings.db.authorsName + '?q=' + inputText,
    };*/

    /*let urlSearchedSongs =
      settings.db.url + '/' + settings.db.songs + '?q=' + inputText;*/

    /*Promise.all([fetch(urls.songsTitle), fetch(urls.authorsName)])

      .then(function (allResponses) {
        const titleResponse = allResponses[0];
        const authorResponse = allResponses[1];
        return Promise.all([titleResponse.json(), authorResponse.json()]);
      })
      .then(function ([titleResponse, authorResponse]) {
        thisSearch.data = [titleResponse, authorResponse];

        thisSearch.updateDOM();
      });*/
  }

  updateDOM() {
    const thisSearch = this;

    const searchedSongs = thisSearch.data;
    //console.log(searchedSongs.length);

    thisSearch.dom.songWrapper.innerHTML = [];
    thisSearch.dom.foundText.innerHTML = [];

    for (let song of searchedSongs) {
      const songId = song.id;
      console.log(songId);
      const songTitle = song.title;
      const songCategories = song.categories;
      const songRanking = song.ranking;
      const songFileName = song.filename;

      const songAuthorLow = thisSearch.authors.find(
        (author) => author.id === song.author
      ).fullName;

      const songAuthor = songAuthorLow.toUpperCase();

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
      const generatedHTML = templates.playerSearch(songData);

      thisSearch.dom.songWrapper.innerHTML += generatedHTML;
      //console.log(thisSearch.dom.songWrapper.innerHTML);
    }

    // 'we have found' text
    const songsNumber = searchedSongs.length;
    let songsNumberText = songsNumber + ' songs';
    if (songsNumber == 1) {
      songsNumberText = songsNumber + ' song';
    }

    let songsNumberData = { songsNumberText };

    const numberSongsHTML = templates.songNumber(songsNumberData);

    thisSearch.dom.foundText.innerHTML += numberSongsHTML;

    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player-search', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
    });
  }
}

export default Search;
