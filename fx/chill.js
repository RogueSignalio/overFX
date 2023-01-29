/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Chill extends OverFxScene {
	fx_preload() {
    this.load.image('snow', `${this.config.image_path}/snowflake04.png`);
		this.load.audio('wind', [`${this.config.audio_path}/winter_wind.mp3`]);
	}

	fx_create() {
		var SECOND = 1000;
		var highWind = {
      tween: this.tweens.addCounter({
        from:-3, to: 7,
        duration: 6 * SECOND,
        loop: Phaser.FOREVER,
        ease: 'Sine.easeInOut'
      }),
      processor: {
        active: true,
        update: function(particle) { particle.velocityX += highWind.tween.getValue(); }
      }
    };

		var lowWind = {
      tween: this.tweens.addCounter({
        from:0, to: 3,
        duration: 3 * SECOND,
        loop: Phaser.FOREVER,
        ease: 'Sine.easeInOut'
      }),
      processor: {
        active: true,
        update: function(particle) { particle.velocityY += lowWind.tween.getValue(); }
      }
    };

    var conf = {
      x: { min: -500, max: this.w + 500  },
      y: { min: -50, max: -50 }, //this.h/2,
      lifespan: 6000,
      speed: { min: 80, max: 150},
      rotate: {min: -720, max: 720},
      scaleX: { start: 0.1, end: 0.01 },
      scaleY: { start: 0.15, end: 0.01 },

      alpha: { start: 1, end: 0 },
      gravityY: 100,
      blendMode: 'SCREEN',
      frequency: 10,
      tint: [ 0xFFFFFF, 0xDDDDFF, 0xBBBBFF ]
    }

		this.flake1 = this.add_emitter('snow',conf);
		this.flake1.addGravityWell(highWind.processor);
		this.flake1.addGravityWell(lowWind.processor);
		this.audio_play_detune('wind',-300,300)

    setOverTimeout(()=>{ this.stop_emitters() },6500)
	}

}
