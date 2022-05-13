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
  },
  templateOf: {
    player: '.template-player',
  },
  home: {
    players: '.player',
  },
  nav: {
    links: '.nav a',
  },
  search: {
    button: '.search-button',
    input: '.song-search',
  },
};

export const templates = {
  player: Handlebars.compile(
    document.querySelector(select.templateOf.player).innerHTML
  ),
};
