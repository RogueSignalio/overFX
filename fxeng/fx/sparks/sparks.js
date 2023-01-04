class Sparks extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('sparks', './fx/images/white.png');
		this.load.audio('spark', ['./fx/images/street-firework.mp3',]);

	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.spark1 = this.add.particles('sparks');
	    this.spark2 = this.add.particles('sparks');
		var x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
		var y = this.h/2 + getRndInteger(-this.h/3, this.h/6)


	    for (var i=0;i<3;i++) {
			this.spark1.createEmitter({
		        x: x,
		        y: y,
		        speed: { min: -800, max: 800 },
		        scale: { start: 0.25, end: 0 },
		        blendMode: 'SCREEN',
		        lifespan: 600,
		        gravityY: 800,
		        particleBringToTop: true,
				maxParticles: 35,
				tint: 0xDDAA33,
		    });

			this.spark2.createEmitter({
		        x: x,
		        y: y,
		        speed: { min: -800, max: 800 },
		        scale: { start: 0.2, end: 0 },
		        blendMode: 'SCREEN',
		        lifespan: 600,
		        gravityY: 800,
		        particleBringToTop: true,
				maxParticles: 35,
				tint: 0xFFF8E8,
		    });
			var a = this.sound.add('spark')
			a.detune = getRndInteger(-1000,1000)
			a.play();

		}
	    setTimeout(()=>{ 
	    	console.log('Sparks cleanup...') 
			this.spark1.scene.scene.remove()
	    },2000)
	}

}
