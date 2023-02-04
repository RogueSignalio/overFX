class Background extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false;
    this.color = this.config.color ? this.config.color : 0x000000;
    this.hold = this.config.hold ? this.config.hold : 5000;
    this.fade = this.config.fade ? this.config.fade : 600;
    //this.color = config.color;
    //this.hold = config.hold;
    //this.fade = config.fade;
  }

  fx_preload() {
  }

  fx_create() {
    this.scene.sendToBack(this.key)
    var bg = this.add.rectangle(this.w/2, this.h/2, this.w, this.h, this.color);
    bg.alpha = 0;
    this.tweens.add({
      targets: bg,
      duration: this.fade,
      alpha: 1,
      yoyo: true,
      repeat: 0,
      hold: this.hold
    });

    setOverTimeout(()=> { this.kill_scene(); }, (this.hold + (this.fade*4)))
  }

}