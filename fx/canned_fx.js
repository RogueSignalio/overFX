const CannedFx = {
  
  canned_boom(cnt=1) {
    this.run_fx_timed('boom',cnt*4,{},100,200)
  },

  canned_sparks(cnt=1) {
    this.run_fx_timed('sparks',cnt*2,{},50,100);
  },

  canned_fountain(cnt=1) {
    this.run_fx_timed('fountain',cnt,{},150,250);
  },

  canned_spray(cnt=1) {
    this.run_fx_timed('spray',cnt*1,{},100,150);
  },

  canned_confetti(cnt=1) {
    this.run_fx_timed('confetti',cnt*2,{},25,50);
  },

  canned_heart(cnt=1) {
    this.run_fx_timed('hearts',cnt*2,{},25,50);
  },

  canned_heartsplode(cnt=1) {
    this.run_fx_timed('heartsplode',cnt*2,{},25,50);
  },

  canned_chill(cnt=1) {
    this.run_fx_timed('chill',cnt*2,{},25,50);
  },

  canned_fireworks(cnt=1) {
    this.run_fx_timed('fireworks',cnt*3,{},500,700);
  },

  canned_mega() {
    this.canned_fountain(2);	
    setOverTimeout(() => { this.canned_sparks(1); },250)
    setOverTimeout(() => { this.canned_sparks(1); },500)
    setOverTimeout(() => { this.canned_sparks(1); },750)
    setOverTimeout(() => { this.canned_sparks(1); },1000)
    setOverTimeout(() => { this.canned_sparks(1); },1250)
    setOverTimeout(() => { this.canned_sparks(1); },1500)
    setOverTimeout(() => { this.canned_sparks(1); },1750)
    setOverTimeout(() => { this.canned_sparks(1); },2000)
    setOverTimeout(() => { this.canned_sparks(1); },2250)
    setOverTimeout(() => { this.canned_confetti(3); },1900)
    setOverTimeout(() => { this.canned_confetti(3); },2200)
  },

  canned_hell() {
    for (var i=0;i<4;i++) {
      setOverTimeout(() => { this.canned_heartsplode(1); },0 + (i*110))	
    }
    for (var i=0;i<5;i++) {
      setOverTimeout(() => { this.canned_sparks(1); },1800 + (80*i))
    }
    for (var i=0;i<3;i++) {
      setOverTimeout(() => { this.canned_boom(1); },2100 + (50*i))
    }
  },

  canned_fireworks_show() {
    for (var i=0;i<15;i++) {
      setOverTimeout(() => { this.canned_fireworks(getRndInteger(0,2)); },(i*1000) + (i*getRndInteger(250,700)))	
    }
  },

  canned_pixelstix(cnt=1) {
    this.run_fx_timed('pixelstix',cnt,{image: `${this.config.image_path}/RogueSignal_logo_tiny.png`});
  },

  canned_pixelstix2(cnt=1) {
    this.load_fx('ascension'); // Get it loaded to prevent delay
    setOverTimeout(() => {
      this.run_fx('background',{ color: 0x000000, hold: 12000, fade: 1000})
      this.run_fx('ascension',{ color: 0x2200BB, bg_on: false })
      setOverTimeout(()=> { this.canned_sparks(5); },5000);
      setOverTimeout(()=> { this.canned_fountain(2); },6000);
      this.run_fx_timed('pixelstix',cnt,{image: `${this.config.image_path}/RogueSignal_logo_tiny.png`, bg_on: false},300,300);
    },500)
  },

  canned_wonderful(cnt=1) {
    this.run_fx('vortex', { hold: 8000, fade: 1000 , shake: 0.008 })
    setOverTimeout(() => {
      this.run_fx_timed('bullzeye',4,{ shake: 0.015},800,1900)
    },250)
    setOverTimeout(() => {
      this.run_fx('webfonttext',{ y: 240, shake: Phaser.Math.FloatBetween(0.006,0.012), blend: 2, hold:5000, fade: 300, text: 'W😜nderful!', font: 'Mochiy Pop One', font_size: 100, color: '#8888AA', border_color: '#7e47ce'})
      this.run_fx('webfonttext',{ y: 300, shake: Phaser.Math.FloatBetween(0.002,0.006), blend: 1, hold:6000, fade: 300, text: 'W😜nderful!', font: 'Mochiy Pop One', font_size: 100, color: '#8888AA', border_color: '#7e47ce'})
      this.run_fx('webfonttext',{ y: 360, blend: 0, hold:7000, fade: 1000, text: 'W😜nderful!', font: 'Mochiy Pop One', font_size: 100, color: '#8888AA', border_color: '#7e47ce'})
    },500)
  }
};
