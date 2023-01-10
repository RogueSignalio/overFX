class Chill extends OverFxScene { //FxScene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('snow', 'assets/overfx/snowflake04.png');
		this.load.audio('wind', ['assets/overfx/winter_wind.mp3',]);
	}

	create() {
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
	        rotate: {min: -480, max: 480},
	        scaleX: { start: 0.15, end: 0.01 },
	        scaleY: { start: 0.2, end: 0.01 },

	        alpha: { start: 1, end: 0 },
	        gravityY: 100,
	        blendMode: 'SCREEN',
	        frequency: 2,
//	        quantity: 10,
//	        maxParticles: 1200,
	        tint: [ 0xFFFFFF, 0xDDDDFF, 0xBBBBFF ]
	    }

		this.flake1 = this.add_emitter('snow',conf);
		this.flake1.addGravityWell(highWind.processor);
		this.flake1.addGravityWell(lowWind.processor);
		this.audio_play_detune('wind',-300,300)

	    setTimeout(()=>{ this.stop_emitters() },6500)
	}

}
