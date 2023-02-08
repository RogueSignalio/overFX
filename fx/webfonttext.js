// https://fonts.google.com/
class Webfonttext extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false;
    this.color = this.config.color || '#DDDDDD';
    this.border_color = this.config.border_color || '#DDDDDD';
    this.shadow_color = this.config.shadow_color ||  '#333333';
    this.hold = this.config.hold || 5000;
    this.fade = this.config.fade || 600;
    this.text = this.config.text || 'NO TEXT...?'
    this.font = this.config.font || 'Freckle Face'
    this.font_size = this.config.font_size || 80
    this.blend = this.config.blend || 0
  }

  fx_preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  fx_create() {
    var scene = this
    this.px = this.config.x || this.w/2
    this.py = this.config.y || this.h/2
    WebFont.load({
      google: {
        families: [ scene.font ],
      },
      active: function () {
        let t = scene.add.text(scene.px, scene.py, scene.text, { fontFamily: scene.font, fontSize: scene.font_size, color: scene.color })
        t.setStroke(scene.border_color, 16);
        t.setShadow(2, 2, this.shadow_color, 2, true, true);
        t.setOrigin(0.5);
        t.alpha = 0;
        t.blendMode = scene.blend;
        t.setPadding(5, 20, 5, 20) 
        scene.tweens.add({
          targets: t,
          duration: scene.fade,
          alpha: 1,
          yoyo: true,
          repeat: 0,
          hold: scene.hold
        });
        scene.scene.bringToTop(this.key)
        setOverTimeout(()=> { scene.kill_scene(); }, (scene.hold + (scene.fade*4)))
      }
    });
  }

  fx_update() {
    this.scene.bringToTop(this.key)
  }
}
