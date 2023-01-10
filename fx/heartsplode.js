class Heartsplode extends OverFxScene {
    constructor (config={}) {
        super(config);
        this.enable_cleanup = false

    }

	preload() {
	    this.load.image('heart', 'assets/overfx/heart.png');
		this.load.audio('squeak', 'assets/overfx/squeakytoy.mp3');
		this.load.audio('pop', 'assets/overfx/pop.mp3');
	}

	create() {
	    this.heart1 = this.add.particles('heart');

	    var conf = {
	        x: this.w/8 + getRndInteger(-this.w/10,this.w/10),
	        y: this.h/3 + getRndInteger(-this.h/8,this.h/8),
	        speed: { min: 150, max: 400 },
	        angle: { min: 200, max: 300 },
	        scale: { start: 0.05, end: 0.3 },
	        rotate: { min: -60, max: 60 },
	        lifespan: { min: 1700, max: 2200 },
	        gravityY: 250 ,
	        gravityX: 300 ,
			maxParticles: 6,
			quantity: 6,
			tint: [ 0xFF0088, 0xFF1111, 0xFFAAAA, 0xFF22BB, 0xFF7777 ],
			deathCallback: (t) => {
				this.pop_heart(t)
			}
	    }

	    for (var i=0;i<4;i++) {
	    	this.add_emitter(this.heart1,conf)
		}
		setTimeout(() => {
	        this.enable_cleanup = true
    	},2500)

		this.audio_play_detune('squeak',-100,100)
	}

	pop_heart(t) {
	    var conf = {
	        x: t.x,
	        y: t.y,
	        speed: { min: 300, max: 400 },
	        angle: { min: 0, max: 360 },
	        scale: { start: 0.1, end: 0 },
	        alpha: { start: 1, end: 0 },
	        rotate: { min: -60, max: 60 },
	        lifespan: 1500,
	        gravityY: 250 ,
	        gravityX: 300 ,
			maxParticles: 12,
			quantity: 12,
			tint: [ 0xFF0088, 0xFF1111, 0xFFAAAA, 0xFF22BB, 0xFF7777 ],
		}
    	this.add_emitter('heart',conf)
		this.audio_play_detune('pop',-300,300)
	}
}
