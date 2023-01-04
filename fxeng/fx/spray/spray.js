class Spray extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('spray', './fx/images/white.png');
		this.load.audio('spray', ['./fx/images/water-splash.mp3',]);

	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.particles = this.add.particles('spray');
	    for (var i=0;i<12;i++) {
	    	setTimeout(() => {
			    this.particles.createEmitter({
			        x: this.w/2,// - (i * 10),
			        y: this.h - 5,
			        lifespan: 2000,
			        angle: { min: 200, max: 340 },
			        speed: { min: 500, max: 600 },
			        scaleX: { start: 0.55, end: 0 },
			        scaleY: { start: 0.55, end: 0 },
	    	        rotate: { min: -720, max: 720 },
	    	        alpha: { start: 1, end: 0 },
			        gravityY: 900,
					blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0x9999FF, 0x7799FF ],
					quantity: 10,
					// deathCallback: () => { this.death(); },
			    });
			    this.particles.createEmitter({
			        x: this.w/2,// - (i * 10),
			        y: this.h - 5,
			        lifespan: 2000,
			        angle: { min: 250, max: 290 },
			        speed: { min: 900, max: 1200 },
			        scaleX: { start: 0.15, end: 0 },
			        scaleY: { start: 0.15, end: 0 },
			        gravityY: 800,
			        bounce: 1.6,
			        bounds: { x: 0, y: 0, w: this.w, h: this.h },
			        // collideTop: true,
			        // collideBottom: false,
	//				alpha: 0.95,
					blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0xAAAAFF, 0x99AAFF ],
					quantity: 10,
					// deathCallback: () => { this.death(); },
			    });
			    this.particles.createEmitter({
			        x: this.w/2,// - (i * 10),
			        y: this.h - 5,
			        lifespan: 2000,
			        angle: { min: 210, max: 330 },
			        speed: { min: 550, max: 700 },
			        scaleX: { start: 0.15, end: 0 },
			        scaleY: { start: 0.15, end: 0 },
			        gravityY: 900,
	//				alpha: 0.95,
					blendMode: 'SCREEN',
					maxParticles: 140,
					tint: [ 0xAAAAFF, 0x99AAFF ],
					quantity: 8,
					// deathCallback: () => { this.death(); },
			    });
			},0+(50*i))
		}
		this.sound.add('spray').play();
	    setTimeout(()=>{ 
	    	console.log('Spray Cleanup...') 
			this.particles.scene.scene.remove()
	    },4500)
	}

	update() {
		//console.log(this)
		// physics.arcade.collide(emitter);
	}

	death() {
		// console.log(this)
	}

}
