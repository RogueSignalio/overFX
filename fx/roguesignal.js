/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Roguesignal extends OverFxScene {
	fx_preload() {
	  this.load.image('rs', `${this.config.image_path}/rs2.png`);
		this.load.audio('rsaudio1', [`${this.config.audio_path}/monster-scream-sound-effect.mp3`,]);
		this.load.audio('rsaudio2', [`${this.config.audio_path}/ghost1.mp3`,]);
		this.load.audio('laugh', [`${this.config.audio_path}/hyena-laugh.mp3`,]);
	}

	fx_create() {
    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    let x = getInt(worldPoint.x)
    let y = getInt(worldPoint.y)

		let conf = {
      x: x,
      y: y,
      speed: { min: -170, max: 170 },
      scale: { start: 0.01, end: 3.5 },
      alpha: { start:15, end: 0 },
      rotate: { min: -720, max: 720 },
      blendMode: 'ADD',
      lifespan: 6000,
      gravityY: getRndInteger(-60, 60),
      gravityX: getRndInteger(-60, 60), //{ min: -250, max: 250},
			maxParticles: 100,
			quantity: 1,
      tint: [ 0xCC3333, 0xCC6633, 0xCC9933, 0x9933CC ],
	  }

		this.add_emitter('rs',Object.assign(conf));

    let audio = [ 'rsaudio1', 'rsaudio2']
    this.audio_play_detune(audio[getRndInteger(0,audio.length-1)],-500,500)
    setOverTimeout(()=>{
      this.audio_play_detune(audio[getRndInteger(0,audio.length-1)],-500,500,0.5)
    },500)
    this.audio_play_detune('laugh',-600,-100)
	}

}
