class Chill extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('snow', './fx/chill/snowflake03.png');
//		this.load.audio('wind', ['./fx/images/Pop-sound.mp3',]);
	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.flake1 = this.add.particles('snow');
		var SECOND = 1000;
		var highWind = {
	        tween: this.tweens.addCounter({
	            from:-3,
	            to: 7,
	            duration: 6 * SECOND,
	            loop: Phaser.FOREVER,
	            ease: 'Sine.easeInOut'
	        }),
	        processor: {
	            active: true,
	            update: function (particle)
	            {
	                particle.velocityX += highWind.tween.getValue();
	            }
	        }
	    };

		var lowWind = {
	        tween: this.tweens.addCounter({
	            from:0,
	            to: 3,
	            duration: 3 * SECOND,
	            loop: Phaser.FOREVER,
	            ease: 'Sine.easeInOut'
	        }),
	        processor: {
	            active: true,
	            update: function (particle)
	            {
					particle.velocityY += lowWind.tween.getValue();
	            }
	        }
	    };

	    var conf = {
	        x: { min: -500, max: this.w + 500  },
	        y: { min: -50, max: -50 }, //this.h/2,
	        lifespan: 6000,
	        speed: { min: 100, max: 150},
	        rotate: {min: -360, max: 360},
	        scaleX: { start: 0.25, end: 0.01 },
	        scaleY: { start: 0.3, end: 0.01 },

//	        scaleX: { min: 0.01, max: 0.02 },
//	        scaleY: { min: 0.01, max: 0.02 },
//	        scaleX: { min: 0.01, max: 0.2 },
//	        scaleY: { min: -1, max: 1 },

	        alpha: { start: 0.8, end: 0 },
	        gravityY: 100,
	        blendMode: 'SCREEN',
	        frequency: 1,
//	        quantity: 10,
//	        maxParticles: 1200,
	        tint: [ 0xFFFFFF, 0xDDDDFF, 0xBBBBFF ]
	    }

		this.flake1.addGravityWell(highWind.processor);
		this.flake1.addGravityWell(lowWind.processor);
		this.emito = this.flake1.createEmitter(conf);
		
		// var a = this.sound.add('confetti');
		// a.detune = getRndInteger(-300,300)
		// a.play();

	    setTimeout(()=>{ 
			this.emito.stop(); 
			setTimeout( (t)=> { 
		    	console.log('Chill cleanup...') 
				t.flake1.scene.scene.remove(); 
			},6000,this)
	    },6500)
	}

}
