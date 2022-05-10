class Player {
  constructor(element, songs) {
    const thisPlayer = this;

    thisPlayer.render(element, songs);
    thisPlayer.initPlugin(element);
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
