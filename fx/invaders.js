class Invaders extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false
    this.sprites = []
    this.color = this.config.color ? this.config.color : 0xFFDD99;
    this.hold = this.config.hold ? this.config.hold : 10000;
    this.fade = this.config.fade ? this.config.fade : 1000;
    this.bg_on = this.config.bg_on !== undefined ? this.config.bg_on : false;
  }

  fx_preload() {
    this.load.spritesheet('invader1', `${this.config.image_path}/invader1.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('invader2', `${this.config.image_path}/invader2.png`, { frameWidth: 44, frameHeight: 32 });
    this.load.spritesheet('invader3', `${this.config.image_path}/invader3.png`, { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('boom', `${this.config.image_path}/explosion.png`, { frameWidth: 64, frameHeight: 64, endFrame: 23 });

//		this.load.audio('ascension', [`${this.config.audio_path}/choir-transition-sound.mp3`,]);
    if (this.bg_on) this.engine.run_fx('background',{ bgcolor: 0x000000, hold: (this.hold + (this.fade * 5)), fade: this.fade/2})
  }

  fx_create() {
    if (this.bg_on) this.scene.bringToTop(this.key)
    this.anims.create({ key: 'invader1',frames: 'invader1',frameRate: 4, repeat: -1 });
    this.anims.create({ key: 'invader2',frames: 'invader2',frameRate: 4, repeat: -1 });
    this.anims.create({ key: 'invader3',frames: 'invader3',frameRate: 4, repeat: -1 });
    this.anims.create({ key: 'explode', frames: 'boom', hideOnComplete: true });

    var colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

    var invaders = ['invader1','invader2','invader3']
    for (var i = 0; i < 50; i++) {
      var x = Phaser.Math.Between(-10, this.w+10);
      var y = Phaser.Math.Between(-32,-800);
      var inv = invaders[Phaser.Math.Between(0,2)]
      var ship = this.add.sprite(x, y, inv);
      ship.play(inv);
      ship.setTint(Phaser.Utils.Array.GetRandom(colors));
      ship.setInteractive();
      this.sprites.push({ s: ship, r: Math.random() * Phaser.Math.Between(2,4) });
      //    this.audio_play_detune('ascension',-600,100)
      ship.once('pointerdown', function () {
        //  Sprite will have visible = false set when the animation finishes repeating because of 'hideOnComplete' property
        ship.setTintFill = ship.tint
        this.play('explode');
      });
      ship.alpha = 0
      this.tweens.add({
        targets: ship,
        duration: this.fade,
        alpha: 1,
        yoyo: true,
        hold: this.hold,
      });
    }

    setOverTimeout(()=> {
      this.kill_scene()
    },(this.hold + this.fade + 500));
  }

  fx_update(t,d) {
    for (var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i].s;
      sprite.y += this.sprites[i].r;
      sprite.x += Math.cos(t) * this.sprites[i].r ;
//      if (sprite.y < this.h + 500 ) { sprite.y = sprite.y + 0.001; }
    }
  }


}