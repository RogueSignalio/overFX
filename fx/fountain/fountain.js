class Fountain extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.atlas('fountain1', './fx/fountain/fountain.png', './fx/fountain/fountain.json');
		this.load.audio('fountaina', ['./fx/images/fountain.mp3',]);
	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.particles = this.add.particles('fountain1');
	    for (var i=0;i<4;i++) {
		    this.particles.createEmitter({
		        frame: [ 'red', 'yellow', 'white', 'blue', 'green' ],
		        x: this.w/2,// - (i * 10),
		        y: this.h - 5,
		        lifespan: 2000,
		        angle: { min: 260, max: 280 },
		        speed: { min: 800, max: 1100 },
		        scaleX: { start: 0.2, end: 0 },
		        scaleY: { start: 0.45, end: 0 },
		        gravityY: 800,
				alpha: 0.95,
				blendMode: 'SCREEN',
				maxParticles: 100,
				deathCallback: () => { this.death(); }
		    });
		    this.particles.createEmitter({
		        frame: [ 'red', 'yellow','white', 'blue', 'green' ],
		        x: this.w/2, // + (i * 15),
		        y: this.h - 5,
		        lifespan: 2000,
		        angle: { min: 250, max: 290 },
		        speed: { min: 600, max: 1100 },
		        scaleX: { start: 0.2, end: 0 },
		        scaleY: { start: 0.45, end: 0 },
		        gravityY: 750,
				alpha: 0.95,
				blendMode: 'ADD',
				// rotation: { start: 0, end: 180 },
				angularDrag: 30,
				maxParticles: 100,
				deathCallback: () => { this.death(); }
		    });
		}
		this.sound.add('fountaina').play();
	    setTimeout(()=>{ 
	    	console.log('Fountain Cleanup...') 
			this.particles.scene.scene.remove()
	    },4250)
	}

	update() {
		//console.log(this)
		// physics.arcade.collide(emitter);
	}

	death() {
		// console.log(this)
	}

}
