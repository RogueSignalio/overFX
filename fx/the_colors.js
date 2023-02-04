/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Fireworks extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false
  }

	fx_preload() {
    this.load.image('fsparks', `${this.config.image_path}/white.png`);
		this.load.audio('fuse', [`${this.config.audio_path}/firework_up.mp3`]);
	}

	fx_create() {
	}

}