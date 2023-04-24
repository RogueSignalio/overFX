/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Spray extends OverFxScene {
	fx_preload() {
    this.load.image('spray', `${this.config.image_path}/white.png`);
		this.load.audio('spraya', [`${this.config.audio_path}/water-splash.mp3`]);
	}

	fx_create() {
    this.particles = this.add.particles('spray');
		this.offset = this.h > 690 ? (this.h - 690) : 0

    for (var i=0;i<12;i++) {
      setOverTimeout(() => {
        this.add_emitter(this.particles,{
          x: this.w/2,// - (i * 10),
          y: this.h - 5,
          lifespan: 2000 + (this.offset*2),
          angle: { min: 200, max: 340 },
          speed: { min: 500+ (this.offset/2), max: 600+ (this.offset/2) },
          scaleX: { start: 0.55, end: 0 },
          scaleY: { start: 0.55, end: 0 },
          rotate: { min: -720, max: 720 },
          alpha: { start: 1, end: 0 },
          gravityY: 900,
          blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0x9999FF, 0x7799FF ],
					quantity: 10,
        });
        this.add_emitter(this.particles,{
          x: this.w/2,// - (i * 10),
          y: this.h - 5,
          lifespan: 2000 + (this.offset*3),
          angle: { min: 250, max: 290 },
          speed: { min: 900+ (this.offset/2), max: 1200+ (this.offset/2) },
          scaleX: { start: 0.15, end: 0 },
          scaleY: { start: 0.15, end: 0 },
          gravityY: 800,
          bounce: 1.6,
          bounds: { x: 0, y: 0, w: this.w, h: this.h },
          collideLeft: false,
          collideRight: false,
          collideBottom: false,
					blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0xAAAAFF, 0x99AAFF ],
					quantity: 10,
        });
        this.add_emitter(this.particles,{
          x: this.w/2,// - (i * 10),
          y: this.h - 5,
          lifespan: 2000 + (this.offset*3),
          angle: { min: 210, max: 330 },
          speed: { min: 550+ (this.offset/2), max: 700+ (this.offset/2) },
          scaleX: { start: 0.15, end: 0 },
          scaleY: { start: 0.15, end: 0 },
          gravityY: 900,
					blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0xAAAAFF, 0x99AAFF ],
					quantity: 8,
        });
			},0+(50*i))
		}
		this.audio_play_detune('spraya')
	}

}
