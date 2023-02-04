class Background extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false;
    this.bgcolor = config.bgcolor;
    this.hold = config.hold;
    this.fade = config.fade;
  }

  fx_preload() {
  }

  fx_create() {
    this.scene.sendToBack(this.key)
    var bg = this.add.rectangle(this.w/2, this.h/2, this.w, this.h, this.bgcolor);
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