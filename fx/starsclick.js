/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Starsclick extends OverFxScene {
  fx_preload() {
    this.load_assets([
      ['audio', 'stars_snd_cl', `${this.config.audio_path}/activate04.mp3`],
      ['image','stars_cl', `${this.config.image_path}/fx_star.png`]
    ])
  }

  fx_create() {
    let tints = [ 0x33AADD, 0xAABBFF ] //0xCC3333, 0xCCCCCC, 0x3370CC ]
    if (this.config.tints) {
      tints = this.config.tints
    }

    // let conf = {
    //   x: x,
    //   y: y,
    //   speed: { min: -170, max: 170 },
    //   scale: { start: 0.01, end: 3.5 },
    //   alpha: { start:15, end: 0 },
    //   rotate: { min: -720, max: 720 },
    //   blendMode: 'ADD',
    //   lifespan: 6000,
    //   gravityY: getRndInteger(-60, 60),
    //   gravityX: getRndInteger(-60, 60), //{ min: -250, max: 250},
    //   maxParticles: 100,
    //   quantity: 1,
    //   tint: [ 0xCC3333, 0xCC6633, 0xCC9933, 0x9933CC ],
    // }

    this.use_particle_cleanup()
    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    let x = getInt(worldPoint.x)
    let y = getInt(worldPoint.y)

    // let x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
    // let y = this.h/2 + getRndInteger(-this.h/3, this.h/6)
    let conf = {
      x: x,
      y: y,
      speed: { min: -200, max: 200 },
      // speed: { min: 400, max: 800 },
      // angle: { min: 220, max: 320 },
      scale: { start: 0.5, end: 0.1 },
      // scaleY: { min: -1, max: 1 },
      rotate: { min: -360, max: 360,  ease: 'Back.easeOut' },
      blendMode: 'ADD',
      lifespan: 700,
      gravityY: 600,
      maxParticles: 10,
      quantity: 4,
      tint: tints, //0xDDAA33,
    }

    // this.add_emitter('sparks',Object.assign(conf));
    // this.add_emitter('sparks',Object.assign(conf,{
    //   scale: { start: 0.2, end: 0 },
    //   tint: 0xFFF8E8,
    // }));
    // this.audio_play_detune('sparka',-1000,1000)
    for (var i=0;i<4;i++) { this.add_emitter('stars_cl',conf) }
    this.audio_play_detune('stars_snd_cl',0,0)
  }

}
