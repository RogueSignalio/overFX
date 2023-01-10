class Hearts extends OverFxScene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('heart1', 'assets/overfx/heart.png');
		this.load.audio('squeak', ['assets/overfx/squeakytoy.mp3',]);
	}

	create() {
	    var heart1 = this.add.particles('heart1');

	    var conf = {
	        x: this.w/8 + getRndInteger(-this.w/10,this.w/10),
	        y: this.h/3 + getRndInteger(-this.h/10,this.h/10),
	        speed: { min: 150, max: 400 },
	        angle: { min: 200, max: 300 },
	        scale: { start: 0.05, end: 0.3 },
	        rotate: { min: -60, max: 60 },
	        lifespan: 4000,
	        gravityY: 250 ,
	        gravityX: 300 ,
			maxParticles: 12,
			quantity: 12,
			tint: [ 0xFF0088, 0xFF1111, 0xFFAAAA, 0xFF22BB, 0xFF7777 ],
	    }

	    for (var i=0;i<2;i++) {
	    	this.add_emitter(heart1,conf)
		}

		this.audio_play_detune('squeak',-100,100)

	}
}
