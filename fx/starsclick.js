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
    this.use_particle_cleanup()
    let x = 0; let y = 0;
    let tints = [ 0x33AADD, 0xAABBFF ] //0xCC3333, 0xCCCCCC, 0x3370CC ]
    if (this.config.tints) {
      tints = this.config.tints
    }

    // Only works inside existing phaser canvas
    //    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    // let x = getInt(worldPoint.x)
    // let y = getInt(worldPoint.y)

    if (this.config.inside_element) {
      // const element = document.getElementById(this.config.inside_element)
      // const rect = element.getBoundingClientRect();
      const point = getRandomPositionInElement(this.config.inside_element) 
      this.config.x = window.screenX + point.x,
      this.config.y = window.screenY + point.y
    }

    if (this.config.x) {
      const rect = this.game.canvas.getBoundingClientRect();
      // Assuming 'pointer' is your input event
      x = this.config.x - rect.left;
      y = this.config.y - rect.top;
    }
    else {
      const rect = this.game.canvas.getBoundingClientRect();
      x = window.mouse_x - rect.left;
      y = window.mouse_y - rect.top;
    }

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
