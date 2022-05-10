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
  },
  templateOf: {
    player: '#template-player',
  },
  home: {
    players: '.player',
  },
  nav: {
    links: '.nav a',
  },
};

export const templates = {
  player: Handlebars.compile(
    document.querySelector(select.templateOf.player).innerHTML
  ),
};
