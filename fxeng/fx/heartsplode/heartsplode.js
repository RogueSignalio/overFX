class HeartSplode extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('heart2', './fx/hearts/heart.png');
		this.load.audio('squeak2', ['./fx/images/dog-squeaky-toy-sound.mp3',]);
		this.load.audio('pop', ['./fx/images/Pop-sound.mp3',]);

	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.heart1 = this.add.particles('heart2');

	    var conf = {
	        x: this.w/8 + getRndInteger(-this.w/10,this.w/10),
	        y: this.h/3 + getRndInteger(-this.h/8,this.h/8),
	        speed: { min: 150, max: 400 },
	        angle: { min: 200, max: 300 },
	        scale: { start: 0.05, end: 0.3 },
	        rotate: { min: -60, max: 60 },
	        lifespan: { min: 1600, max: 1900 },
	        gravityY: 250 ,
	        gravityX: 300 ,
			maxParticles: 6,
			quantity: 6,
			tint: [ 0xFF0088, 0xFF1111, 0xFFAAAA, 0xFF22BB, 0xFF7777 ],
			deathCallback: (t) => {
			    var confend = {
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
				this.heart1.createEmitter(confend)
				this.sound.add('pop').play();
				console.log(t)
			}
	    }

	    for (var i=0;i<4;i++) {
			this.heart1.createEmitter(conf)
		}

		this.sound.add('squeak2').play();

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
		console.log(this)
	}

}
console.log('WTF?')