/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Stars extends OverFxScene {
  fx_preload() {

    this.load_assets([
      // ['audio','confettia', `${this.config.audio_path}/pop.mp3`],
      
      // ['audio', 'stars_snd', `${this.config.audio_path}/firework4.mp3`],
      ['audio', 'stars_snd', `${this.config.audio_path}/street-firework.mp3`],
      ['image','stars1', `${this.config.image_path}/fx_star.png`]
    ])
  }

  fx_create() {
    let tints = [ 0xCC3333, 0xCCCCCC, 0x3370CC ]
    if (this.config.tints) {
      tints = this.config.tints
    }

    var conf = {
      x: this.w/2 + getRndInteger(-this.w/10,this.w/10),
      y: this.h/3 + getRndInteger(-this.h/8,this.h/8),
      speed: { min: 400, max: 800 },
      angle: { min: 220, max: 320 },
      scale: { min: 0.1, max: 0.5 },
      // scaleY: { min: -1, max: 1 },
      rotate: { min: -360, max: 360,  ease: 'Back.easeOut' },
      lifespan: 3000,
      gravityY: 900 ,
      maxParticles: 24,
      quantity: 3,
      tint: tints,
    }

    for (var i=0;i<10;i++) { this.add_emitter('stars1',conf) }
    this.audio_play_detune('stars_snd',-300,300)
  }

}
