/**
 * Module dependencies.
 */

import JongdalsaeSpeaker from '../speaker';
import Speaker from 'speaker';
import PCMVolume from 'pcm-volume';

class LocalSpeaker extends JongdalsaeSpeaker {
  constructor() {
    super();

    this.streams = {
      volumeMixer: new PCMVolume(this.volume),
      source: null,
      // @todo Save Speaker constructor params
      speaker: new Speaker({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100
      })
    };
  }


  setVolume(volume) {
    this.streams.volumeMixer.setVolume(volume);
    return super.setVolume(volume);
  }

  play(audioStream) {
    if (audioStream) {
      this.streams.source = audioStream;
      this.streams.source.pipe(this.streams.volumeMixer).pipe(this.streams.speaker);

      return super.play(this.streams.source);
    }

    return this;
  }

  stop() {
    if (this.streams.source) {
      // this is really *hacky* way to handle macOS coreaudio issue
      this.streams.speaker.once('unpipe', (src) => {
        if (src === this.streams.volumeMixer) {
          this.streams.speaker.once('drain', () => {
            this.streams.speaker.close();
            this.streams.source = null;

            return super.stop();
          });
        }
      });

      this.streams.source.unpipe();
      this.streams.volumeMixer.unpipe();
    }

    return this;
  }
}


export default LocalSpeaker;
