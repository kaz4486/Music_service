export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  },
};

export const select = {
  containerOf: {
    songBox: '.songs-box',
    pages: '.pages',
    navLinks: '.nav',
    searchBox: '.search-box',
    discoverBox: '.discover-box',
  },
  templateOf: {
    player: '.template-player',
    songNumber: '.template-song_number',
  },
  home: {
    players: '.player',
  },
  nav: {
    links: '.nav a',
  },
  search: {
    button: '.search-button',
    input: '.song-searcher',
    searchedSongs: '.songs-searched',
    foundText: '.found-text',
  },
  discover: {
    songDiscovered: '.song-discovered',
  },
};

export const templates = {
  player: Handlebars.compile(
    document.querySelector(select.templateOf.player).innerHTML
  ),
  songNumber: Handlebars.compile(
    document.querySelector(select.templateOf.songNumber).innerHTML
  ),
};
