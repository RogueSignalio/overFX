class Sparks extends OverFxScene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('sparks', 'assets/overfx/white.png');
		this.load.audio('spark', ['assets/overfx/street-firework.mp3',]);
	}

	create() {
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
		this.audio_play_detune('spark',-1000,1000)
	}

}
