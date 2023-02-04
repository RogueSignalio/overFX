class Bullzeye extends OverFxScene {
  constructor (config={}) {
    super(config);
    this.enable_cleanup = false
  }

	fx_preload() {
    this.pos = 0;
    this.graphics1;
    this.graphics2;
    this.fade = 0;
    this.fade_in = true;
    this.fade_out = false;
    this.time = null;

		this.load.audio('wonderful', [`${this.config.audio_path}/robot-voice-saying-wonderful.mp3`]);
		this.load.audio('bullzeye', [`${this.config.audio_path}/soft-gong-sound-effect.mp3`]);
	}

	fx_create() {
		let x = this.w/2
		let y = this.h/2
    this.graphics3 = this.add.graphics({x: 0, y: 0}).lineStyle(38, 0x0000BB, 1);
    this.graphics2 = this.add.graphics({x: 0, y: 0}).lineStyle(32, 0xBB0000, 1);
    this.graphics1 = this.add.graphics({x: 0, y: 0}).lineStyle(32, 0x00BB00, 1);
    //  Create the circles

    var radius1 = 64;
    var radius2 = 32;
    var radius3 = 48;

    for (var i = 0; i < 12; i++) {
      this.graphics1.strokeCircle(x, y, radius1);
      this.graphics2.strokeCircle(x, y, radius2);
      this.graphics3.strokeCircle(x, y, radius3);

      radius1 += 64;
      radius2 += 64;
      radius3 += 64;

    }
//    this.graphics1.blendMode = 1
    this.graphics2.blendMode = 1
    this.graphics3.blendMode = 1
    this.graphics1.blendMode = 2

    this.graphics1.alpha = 0
    this.graphics2.alpha = 0
    this.graphics3.alpha = 0
		this.audio_play_detune('bullzeye',-800,800,0.9)
		this.audio_play_detune('wonderful',-600,600,0.6)
	}

  fx_update(t,d) {

    if (!this.time) { this.time = t; }
    this.pos += 0.1;
    if (this.fade_in == true && this.fade < 1) {
      this.fade += 0.02
      this.graphics1.alpha = this.graphics2.alpha = this.graphics3.alpha = this.fade;
      if (this.fade >= 1) this.fade_in = false;
    } else if (this.fade_out == true) {
      this.fade -= 0.02
      this.graphics1.alpha = this.graphics2.alpha = this.graphics3.alpha = this.fade;
    }
    if ((t - this.time) > 4000) {
      this.fade_out = true;
      this.enable_cleanup = true
    }

    this.graphics1.x += Math.sin(this.pos) * 2;
    this.graphics1.y += Math.cos(this.pos) * 2;

    this.graphics2.x += Math.sin(this.pos) * -5;
    this.graphics2.y += Math.cos(this.pos) * -5;

    this.graphics3.x += Math.cos(this.pos) * 3;
    this.graphics3.y += Math.sin(this.pos) * 3;
  }

  fx_check_alive() {
    let ret = !(this.fade_out == true && this.fade <= 0);
//    console.log(ret + ',' + this.fade);
    return ret
  }
}
