class Ascension extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false
    this.sprites = []
    this.color = this.config.color ? this.config.color : 0xFFDD99;
    this.hold = this.config.hold ? this.config.hold : 10000;
    this.fade = this.config.fade ? this.config.fade : 600;
    this.bg_on = this.config.bg_on !== undefined ? this.config.bg_on : true;
  }

  fx_preload() {
    this.load_assets([
  	  ['image','ascension', `${this.config.image_path}/white.png`],
  		['audio','ascensiona', `${this.config.audio_path}/choir-transition-sound.mp3`],
    ]);
    if (this.bg_on) this.engine.run_fx('background',{ bgcolor: 0x000000, hold: (this.hold + (this.fade * 5)), fade: this.fade/2})
  }

  fx_create() {
//    if (this.bg_on) this.scene.bringToTop(this.key)

    for (var i = 0; i < 300; i++) {
      var x = Phaser.Math.Between(-16, this.w+16);
      var y = Phaser.Math.Between(this.h + 100,this.h + 200);

      var image = this.add.image(x, y, 'ascension');
      image.setBlendMode(Phaser.BlendModes.ADD);
      image.tint = this.color
//      image.tintFill = true
      image.alpha = 0
      this.tweens.add({
        targets: image,
        duration: this.fade,
        alpha: 1,
        yoyo: true,
        hold: this.hold,
      });

      this.tweens.add({
        targets: image,
        duration: Phaser.Math.Between(500,1500),
        scaleX: Phaser.Math.Between(0.5,1.5),
        scaleY: Phaser.Math.Between(1.5,3),
        yoyo: true,
        repeat: -1,
      })
      this.sprites.push({ s: image, r: 2 + Math.random() * 6 });
    }

    this.audio_play_detune('ascensiona',-600,100)

    setOverTimeout(()=> {
      this.kill_scene()
    },(this.hold + this.fade + 500));
  }

  fx_update() {
    for (var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i].s;
      sprite.y -= this.sprites[i].r;
      if (sprite.y < -256) { sprite.y = 700; }
    }
  }


}