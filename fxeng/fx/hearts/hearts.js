class Heart extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('heart1', './fx/hearts/heart.png');
		this.load.audio('squeak', ['./fx/images/dog-squeaky-toy-sound.mp3',]);

	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.heart1 = this.add.particles('heart1');

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
			this.heart1.createEmitter(conf)
		}
		this.sound.add('squeak').play();

	    setTimeout(()=>{ 
	    	console.log('Heart cleanup...') 
			this.heart1.scene.scene.remove()
	    },5500)
	}

	update() {
		//console.log(this)
		// physics.arcade.collide(emitter);
	}

	death() {
		// console.log(this)
	}

}
console.log('WTF?')