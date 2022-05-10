export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const select = {
  containerOf: {
    songBox: '.songs-box',
    pages: '.pages',
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
