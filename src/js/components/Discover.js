import { select } from '../settings.js';

class Discover {
  constructor(element) {
    const thisDiscover = this;

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
    console.log(discoverSongId);
  }
}

export default Discover;
