class OverFxScene extends Phaser.Scene {
  constructor(config={}) {
    super(config);
    this.config = {
      audio_on: true,
      debug: false,
      image_path: 'fx/assets/',
      audio_path: 'fx/assets/audio/',
      volume: 0.8,
      ...config
    }
    this.key = this.config.key
    this.engine = this.config.engine
    //this.color = this.config.color ? this.config.color : 0xFFDD99;
    //this.hold = this.config.hold ? this.config.hold : 10000;
    //this.fade = this.config.fade ? this.config.fade : 600;
    //this.bg_on = this.config.bg_on !== undefined ? this.config.bg_on : false;
    this.emitters = [] // Store emiiters for later harvesting on particle death
    // TODO Remove scene_ref...
    this.scene_ref = undefined

    this.enable_cleanup = true; // Sometimes we need to disable auto cleanup, but it needs to be run at some point. 
    this.active = true; // Setting active == false and enable_cleanup == true, will break down the scene.
  }

  preload() {
    this.w = this.game.canvas.width; //window.innerWidth
    this.h = this.game.canvas.height; //window.innerHeight
    this.fx_preload()
//    if (this.bg_on) this.engine.run_fx('background',{ bgcolor: 0x000000, hold: (this.hold + (this.fade * 5)), fade: this.fade/2})
  }
  fx_preload() { console.error('You must add a fx_preload() cuntion to your FX plugin.') }

  create() {
    this.fx_create()
  }
  fx_create() { console.error('You must add a fx_create() cuntion to your FX plugin.') }

  // Play an audio asset with optional detune min/max to make the audio more unique per play.
  // Some files work great with -100,100 or -1000,1000 ... play around with this min/max and it
  // will prevent your audio from sounding repetitive.
  //
  audio_play_detune(audio,detune_min=0,detune_max=0,volume=null) {
	  if (this.config.audio_on == true) {
      let a = this.sound.add(audio)
      a.detune = getRndInteger(detune_min,detune_max)
      a.volume = volume != null ? volume : this.config.volume
      a.play();
    }
  }

  add_emitter(particle,config) {
    let mypart = particle.type == 'ParticleEmitterManager' ? particle : this.add.particles(particle);
    if (this.scene_ref == undefined) { this.scene_ref = mypart; }
    this.emitters.push(mypart.createEmitter(config));
    return mypart;
  }

  stop_emitters() {
    this.emitters.forEach(function (item,idx) { item.stop() })
  }

  kill_scene() {
    this.config.debug && console.log(this.constructor.name + ' cleanup...') 
//    this.scene_ref.scene.scene.remove()
    this.scene.remove()
  }

  update(t,d) {
    this.fx_update(t,d)
    if (this.enable_cleanup == false) { return; }
//    if (this.scene_ref == undefined) { return; }
    this.active = this.fx_check_alive()
    
    if (!this.active) { this.kill_scene() }
  }
  fx_update(t,d) {  }

  fx_check_alive() {
    var emit_alive = false
    this.emitters.forEach(function (item,idx) {
      if (item.getParticleCount() == item.getDeadParticleCount()) {
        item.stop();
        item.running = false;
      } else {
         emit_alive = true; // If any are active still, make sure we don't trigger cleanup.
      }
    })
    return emit_alive
  }
}
