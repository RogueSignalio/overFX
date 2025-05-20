/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Fountain extends OverFxScene {
	fx_preload() {
	  this.load.atlas('fountain1', `${this.config.image_path}/fountain.png`, `${this.config.image_path}/fountain.json`);
		this.load.audio('fountaina', [`${this.config.audio_path}/fountain.mp3`]);
	}

	fx_create() {
	  var particles = 'fountain1' //this.add.particles('fountain1');
		var offset = this.h > 690 ? (this.h - 690) : 0

    for (var i=0;i<4;i++) {
      this.add_emitter(particles,{
        frame: [ 'red', 'yellow', 'white', 'blue', 'green' ],
        x: this.w/2,// - (i * 10),
        y: this.h - 5,
        lifespan: 2000 + (offset*2),
        angle: { min: 260, max: 280 },
        speed: { min: 800 + (offset/2), max: 1100 + (offset/2)},
        scaleX: { start: 0.2, end: 0 },
        scaleY: { start: 0.45, end: 0 },
        gravityY: 800,
				alpha: 0.95,
				blendMode: 'SCREEN',
				maxParticles: 100,
      });
      this.add_emitter(particles,{
        frame: [ 'red', 'yellow','white', 'blue', 'green' ],
        x: this.w/2, // + (i * 15),
        y: this.h - 5,
        lifespan: 2000 + (offset*2),
        angle: { min: 250, max: 290 },
        speed: { min: 800 + (offset/2), max: 1100 + (offset/2)},
        scaleX: { start: 0.2, end: 0 },
        scaleY: { start: 0.45, end: 0 },
        gravityY: 750,
				alpha: 0.95,
				blendMode: 'ADD',
				// rotation: { start: 0, end: 180 },
				angularDrag: 30,
				maxParticles: 100,
      });
		}
		this.audio_play_detune('fountaina')
	}
}
