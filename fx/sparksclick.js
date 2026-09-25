/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
===========================================================================*/
class Sparksclick extends OverFxScene {
  fx_preload() {
    this.load_assets([
      ['audio', 'stars_snd_cl', `${this.config.audio_path}/spark.mp3`],
      ['image','stars_cl', `${this.config.image_path}/white.png`],
      ['image','stars_cl2', `${this.config.image_path}/white.png`],
      ['image','stars_cl3', `${this.config.image_path}/white.png`],
    ])
  }

  fx_create() {
    this.use_particle_cleanup()
    let x = 0; let y = 0;
    let tints = [ 0xFFFFAA, 0xFFDDAA, 0xFFEEBB ] //0xCC3333, 0xCCCCCC, 0x3370CC ]
    if (this.config.tints) {
      tints = this.config.tints
    }

    // Only works inside existing phaser canvas
    //    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    // let x = getInt(worldPoint.x)
    // let y = getInt(worldPoint.y)

    if (this.config.inside_element) {
      console.log('!!!')
      // const element = document.getElementById(this.config.inside_element)
      // const rect = element.getBoundingClientRect();
      const point = getRandomPositionInElement(this.config.inside_element) 
      this.config.x = window.screenX + point.x,
      this.config.y = window.screenY + point.y
    }

    if (this.config.x) {
      console.log(this.config.x)
      console.log(this.config.y)

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

    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    const angle = Phaser.Math.Angle.Between(
        x, 
        y, 
        centerX, 
        centerY
    );
    // let x = this.w/2 + getRndInteger(-this.w/4, this.w/4)
    // let y = this.h/2 + getRndInteger(-this.h/3, this.h/6)
    let conf = {
      x: x,
      y: y,
      speed: { min: 400, max: 700 },
      // speed: { min: 400, max: 800 },
      // angle: { min: 220, max: 320 },
      scale: { start: 0.1, end: 0 },
      // scaleY: { min: 0.1, max: 0.15 },
//      rotate: { min: -360, max: 360,  ease: 'Back.easeOut' },
      // blendMode: 'ADD',
      lifespan: { min: 600, max: 1000 },
      gravityY: 1700, //{ start: 1100, end: 1200 }, 
      maxParticles: 6, //{ min: 4, max: 6 },
      quantity: 1,
      bounce: 1,
      tint: tints, //0xDDAA33,
      bounds: new Phaser.Geom.Rectangle(
    this.cameras.main.x,
    this.cameras.main.y,
    this.cameras.main.width,
    this.cameras.main.height
      ),
// { x: 0, y: 0, width: 1000, height: 1000 }, // Define area
      // rotate: {
      //    onUpdate: (particle) => {
      //        return Phaser.Math.RadToDeg(Math.atan2(particle.velocityY, particle.velocityX));
      //    }
      // } 
    }

    console.log(Phaser.Math.RadToDeg(angle))
    let dir_angle = Phaser.Math.RadToDeg(angle)
    let offset_multi = 1
    if (dir_angle > 0) {
      dir_angle = dir_angle * -1
    } 
    console.log(dir_angle)
    // this.add_emitter('sparks',Object.assign(conf));
    this.add_emitter('stars_cl2',{
       ...conf,
       speed: { min: 200, max: 200 },
       scale: { start: 0.15, end: 0 },
       rotate: { min: -360, max: 360,  ease: 'Back.easeOut' },
       tint: [ 0x6666FF , 0xCC66FF, 0x88FF99 ],
       gravityY: 0,
       lifespan: { min: 100, max: 100 },
       quantity: 5,
       maxParticles: 20,
       blendMode: 'ADD',
    });
    for (var i=0;i<3;i++) { this.add_emitter('stars_cl',{
      ...conf,
      x: { random: [x-5,x+5] },
      y: { random: [y-5,y+5] },
      angle: { random: [ dir_angle + 75, dir_angle - 75 ] },
      gravityY: 1800 + (200 * i), //{ start: 1100, end: 1200 }, 

    }) }
    // for (var i=0;i<4;i++) { this.add_emitter('stars_cl3',{
    //   ...conf,
    //   speed: { min: 400, max: 500 },
    //   // angle: {min: dir_angle + 55, max: dir_angle -55 },
    //   // speed: { min: 400, max: 800 },
    //   // angle: { min: 220, max: 320 },
    //   // scaleX: { start: 0.2, end: 0.01 },
    //   scale: { start: 0.15, end: 0.0 },
    //   blendMode: 'ADD',
    //   tint: [ 0x0000FF ], //, 0x00FF00 ],
    //   lifespan: { mix: 100, max: 300 },
    //   gravityY: 400, //{ start: 1100, end: 1200 }, 
    //   quantity: 2,
    //   maxParticles: 10,
    // }) }
    this.audio_play_detune('stars_snd_cl',-300,300)
  }

}
