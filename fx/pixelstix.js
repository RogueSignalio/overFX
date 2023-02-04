var pixelstix_counter = 0;
class Pixelstix extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false
    pixelstix_counter += 1;
    this.counter = 0
    this.image = this.config.image ? this.config.image : `${this.config.image_path}/RogueSignal_logo_tiny.png`
    this.bg_on = this.config.bg_on !== undefined ? this.config.bg_on : true;
    this.show_alpha = this.config.show_alpha !== undefined ? this.config.show_alpha : false;
  }

  fx_preload() {
    this.load.image('pixelstix'+pixelstix_counter, this.image);
    this.load.image('pixel', `${this.config.image_path}/16x16.png`);
		this.load.audio('pixelstix', [`${this.config.audio_path}/taser-sound.mp3`,]);
    if (this.bg_on) this.engine.run_fx('background',{ bgcolor: 0x000000, hold: 10000, fade: 500})
  }

  fx_create() {
    const source = this.textures.get('pixelstix'+pixelstix_counter).source[0].image;
    const canvas = this.textures.createCanvas('pad'+pixelstix_counter, source.width, source.height).source[0].image;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(source, 0, 0);

    const imageData = ctx.getImageData(0, 0, source.width, source.height);

    let sx = getInt((this.w / source.width))
    let sy = getInt((this.h / source.height))
    let m = (source.width / this.w) * sx
    let x = 0;
    let y = 0;
    const color = new Phaser.Display.Color();

    for (var i = 0; i < imageData.data.length; i += 4) {
      let r = imageData.data[i];
      let g = imageData.data[i + 1];
      let b = imageData.data[i + 2];
      let a = imageData.data[i + 3];

      if (this.show_alpha && a <= 0) { r = 0; g = 0; b = 0; a = 1; }

      if (a > 0) { 
        const startX = Phaser.Math.Between(0, this.w);
        const startY = Phaser.Math.Between(this.h + 32, this.h + 32);
        const dx = x * sx + ((this.w - source.width * sx)/2)
        const dy = y * sx + 32// ((this.h - source.height * sx)/2);
        const image = this.add.image(startX, startY, 'pixel');
        image.scaleX = 0.05
        image.scaleY = 3
        image.angle = Phaser.Math.Between(-360,360)
        color.setTo(r, g, b, a);

        image.setTint(color.color);
        let tween = this.tweens.add({
          targets: image,
          duration: 800,
          x: dx,
          y: dy,
          scaleX: sx/16,
          scaleY: sx/16,
          angle: 360,
          delay: i / 10,
          yoyo: true,
          repeat: 0,
          hold: 6000
        });
        tween.setCallback('onComplete',function() { this.counter -= 1 },[this],this)

        this.counter += 1
      }

      x++;
      if (x === source.width) {
        x = 0;
        y++;
      }
    }

    setOverTimeout(()=> { this.audio_play_detune('pixelstix',-300,0) },750)
    setOverTimeout(()=> { this.audio_play_detune('pixelstix',-300,0) },6900)

  }

  fx_update() {
      if (this.counter == 0) this.enable_cleanup = true
//    console.log(this.counter)    
  }

  fx_check_alive() {
    if (this.counter == 0) return false
  }
  
}
