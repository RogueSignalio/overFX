/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Confetti extends OverFxScene {
	fx_preload() {
    this.load.image('confetti', `${this.config.image_path}/confetti.png`);
		this.load.audio('confetti', `${this.config.audio_path}/pop.mp3`);
	}

	fx_create() {
    var conf = {
      x: this.w/2 + getRndInteger(-this.w/10,this.w/10),
      y: this.h/3 + getRndInteger(-this.h/8,this.h/8),
      speed: { min: 400, max: 800 },
      angle: { min: 220, max: 320 },
      scaleX: { min: 0.01, max: 0.2 },
      scaleY: { min: -1, max: 1 },
      rotate: { min: -360, max: 360,  ease: 'Back.easeOut' },
      lifespan: 3000,
      gravityY: 900 ,
			maxParticles: 24,
			quantity: 3,
			tint: [ 0xEE8844, 0xFF3333, 0xDD77DD, 0x8888FF, 0xFF88FF, 0xFFFFFF ],
    }

    for (var i=0;i<10;i++) { this.add_emitter('confetti',conf) }
		this.audio_play_detune('confetti',-300,300)
	}

}
