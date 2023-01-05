class Smoke extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('particle', './fx/images/smoke0.png');
	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.particle = this.add.particles('particle');
		var x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
		var y = this.h/2 + getRndInteger(-this.h/3, this.h/6)


	    for (var i=0;i<3;i++) {
			this.particle.createEmitter({
		        x: x,
		        y: y,
    			alpha: { start: 1, end: 0 },
        		scale: { start: 0.5, end: 2.5 },
        		//tint: { start: 0xff945e, end: 0xff945e },
		        speed: 20,
		        accelerationY: -300,
		        angle: { min: -85, max: -95 },
		        rotate: { min: -180, max: 180 },
		        lifespan: { min: 1000, max: 1100 },
		        blendMode: 'ADD',
		        frequency: 110,
		        maxParticles: 10,
		        tint: 0x222222,
		    });
		}
	    setTimeout(()=>{ 
	    	console.log('Fire cleanup...') 
			this.particle.scene.scene.remove()
	    },4000)
	}

	update() {
		//console.log(this)
		// physics.arcade.collide(emitter);
	}

	death() {
		// console.log(this)
	}

}
