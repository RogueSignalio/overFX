class Fire extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('particle', './fx/images/muzzleflash3.png');
	    this.load.image('particle2', './fx/images/muzzleflash3.png');
		this.load.audio('boom', ['./fx/images/explosion.mp3',]);
	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.particle = this.add.particles('particle');
	    this.particle2 = this.add.particles('particle2');
		var x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
		var y = this.h/2 + getRndInteger(-this.h/3, this.h/6)


	    for (var i=0;i<3;i++) {
			var smk = this.particle2.createEmitter({
		        x: x,
		        y: y,
    			alpha: { start: 0.5, end: 0 },
        		scale: { start: 0.1, end: 4.5 },
        		//tint: { start: 0xff945e, end: 0xff945e },
		        speed: 100,
//		        accelerationY: -100,
		        angle: { min: -85, max: -95 },
		        rotate: { min: -180, max: 180 },
		        lifespan: { min: 800, max: 900 },
		        blendMode: 'SCREEN',
		        frequency: 10,
		        maxParticles: 10,
		        quantity:1,
		        particleBringToTop: false,
		        tint: 0x000000,
		    });
			var v = this.particle.createEmitter({
		        x: x,
		        y: y,
    			alpha: { start: 0.5, end: 0 },
        		scale: { start: 0.5, end: 3.5 },
        		//tint: { start: 0xff945e, end: 0xff945e },
		        speed: 50,
		        accelerationY: 0,
		        angle: { min: -85, max: -95 },
		        rotate: { min: -180, max: 180 },
		        lifespan: { min: 700, max: 900 },
		        blendMode: 'SCREEN',
				quanitity: 2,
		        maxParticles: 6,
		        tint: 0xFFAA44,
		    });
			this.particle.createEmitter({
		        x: x,
		        y: y,
    			alpha: { start: 0.5, end: 0 },
        		scale: { start: 0.3, end: 2.5 },
        		//tint: { start: 0xff945e, end: 0xff945e },
		        speed: 30,
		        accelerationY: 0,
		        angle: { min: -85, max: -95 },
		        rotate: { min: -180, max: 180 },
		        lifespan: { min: 700, max: 900 },
				quanitity: 2,
		        maxParticles: 6,
		        tint: 0xFFFFFF,
		    });
			this.particle.depth = this.particle2.depth + 1;
			var a = this.sound.add('boom');
			a.detune = getRndInteger(-1000,1000)
			a.play();

		}
	    setTimeout(()=>{ 
	    	console.log('Fire cleanup...') 
			this.particle.scene.scene.remove()
	    },4000)
	}
}
