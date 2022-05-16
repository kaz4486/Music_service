/* eslint-disable no-undef */
class Player {
  constructor(element) {
    const thisPlayer = this;

    thisPlayer.render(element);
    thisPlayer.initPlugin();
  }

  render(element) {
    const thisPlayer = this;

    thisPlayer.element = element;
  }

  initPlugin() {
    const thisPlayer = this;

    thisPlayer.player = new GreenAudioPlayer(thisPlayer.element, {
      stopOthersOnPlay: true,
    });
  }
}

export default Player;
