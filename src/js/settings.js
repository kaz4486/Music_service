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
    playerHome: '.template-player_home',
    playerSearch: '.template-player_search',
    playerDiscover: '.template-player_discover',
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
    player: '.player-discover',
  },
};

export const templates = {
  playerHome: Handlebars.compile(
    document.querySelector(select.templateOf.playerHome).innerHTML
  ),
  playerSearch: Handlebars.compile(
    document.querySelector(select.templateOf.playerSearch).innerHTML
  ),
  playerDiscover: Handlebars.compile(
    document.querySelector(select.templateOf.playerDiscover).innerHTML
  ),
  songNumber: Handlebars.compile(
    document.querySelector(select.templateOf.songNumber).innerHTML
  ),
};
