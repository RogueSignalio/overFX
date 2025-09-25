/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Boom extends OverFxScene {
	fx_preload() {
    this.load_assets([
      ['audio', 'boom', `${this.config.audio_path}/explosion.mp3` ],
      ['image', 'particle1', `${this.config.image_path}/muzzleflash3.png` ],
    ])
	}

	fx_create() {
    this.use_particle_cleanup()

		var x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
		var y = this.h/2 + getRndInteger(-this.h/3, this.h/6)

		var conf = {
      x: x,
      y: y,
			alpha: { start: 0.7, end: 0 },
      scale: { start: 0.1, end: 4.5 },
      speed: 100,
      angle: { min: -85, max: -95 },
      rotate: { min: -180, max: 180 },
      lifespan: { min: 1000, max: 1200 },
      blendMode: 'SCREEN',
      maxParticles: 15,
      quantity:1,
      tint: 0x222222,
		}

    for (var i=0;i<3;i++) {
      // var myp = this.add_emitter('particle1',conf);
      this.add_emitter('particle1',Object.assign(conf,{
        scale: { start: 0.5, end: 3.5 },
        speed: 50,
        accelerationY: 0,
        lifespan: { min: 700, max: 900 },
        quanitity: 2,
        maxParticles: 6,
        tint: 0xFFAA44,
      }));
      this.add_emitter('particle1',Object.assign(conf,{
        scale: { start: 0.3, end: 2.5 },
        speed: 30,
        accelerationY: 0,
        lifespan: { min: 700, max: 900 },
        quanitity: 2,
        particleBringToTop: true,
        maxParticles: 6,
        tint: 0xFFFFFF,
      }));
      this.audio_play_detune('boom',-1000,1000)
		}
	}
}
