class OverFxScene extends Phaser.Scene {
  constructor(config={}) {
    super(config);
    this.config = {
      audio_on: true,
      debug: false,
      image_path: 'fx/assets/',
      audio_path: 'fx/assets/audio/',
      volume: 1,
      ...config
    }
    this.emitters = [] // Store emiiters for later harvesting on particle death
    this.scene_ref = undefined
    this.enable_cleanup = true; // Sometimes we need to disable auto cleanup, but it needs to be run at some point. 
    this.active = true; // Setting active == false and enable_cleanup == true, will break down the scene.
  }

  preload() {
    this.w = this.game.canvas.width; //window.innerWidth
    this.h = this.game.canvas.height; //window.innerHeight
    this.fx_preload()
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
	  if (this.config.audio_on) {
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
    this.scene_ref.scene.scene.remove()     
  }

  update() {
    if (this.enable_cleanup == false) { return; }
    if (this.scene_ref == undefined) { return; }

    this.active = this.fx_check_alive()

    if (!this.active) { this.kill_scene() }
    else { this.fx_update() }
  }
  fx_update() {  }

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