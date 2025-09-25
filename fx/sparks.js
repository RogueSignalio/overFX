class Sparks extends OverFxScene {
	fx_preload() {
		this.load_assets([
			['audio','sparka', `${this.config.audio_path}/street-firework.mp3`],
			['image','sparks', `${this.config.image_path}/white.png`]
		])
	}

	fx_create() {
		this.use_particle_cleanup()

		let x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
		let y = this.h/2 + getRndInteger(-this.h/3, this.h/6)
		let conf = {
      x: x,
      y: y,
      speed: { min: -800, max: 800 },
      scale: { start: 0.25, end: 0 },
      blendMode: 'SCREEN',
      lifespan: 600,
      gravityY: 800,
			maxParticles: 80,
			quantity: 10,
			tint: 0xDDAA33,
    }

		this.add_emitter('sparks',Object.assign(conf));
		this.add_emitter('sparks',Object.assign(conf,{
      scale: { start: 0.2, end: 0 },
      tint: 0xFFF8E8,
    }));
		this.audio_play_detune('sparka',-1000,1000)
	}

}
