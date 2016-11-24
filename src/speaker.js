/**
 * Module dependencies.
 */

const EventEmitter = require('events');

class Speaker extends EventEmitter {
  static STATES = {
    PLAYING: Symbol('PLAYING'),
    STOPPED: Symbol('STOPPED'),
    UNKNOWN: Symbol('UNKNOWN')
  };

  constructor() {
    super();

    this.state = Speaker.STATES.UNKNOWN;
    this.volume = 0.5;

    this.initialize();
  }


  /**
   * Initialize Speaker.
   *
   * You should implement initial state sync logic in here.
   * This method automatically called when instance created.
   */
  initialize() {
    this.emit('initialize');
  }

  play() {
    this.state = Speaker.STATES.PLAYING;
    this.emit('play');

    return this;
  }

  stop() {
    this.state = Speaker.STATES.STOPPED;
    this.emit('stop');

    return this;
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume) {
    this.volume = volume;
    this.emit('volumechange', this.volume);

    return this;
  }
}


module.exports = exports = Speaker;
