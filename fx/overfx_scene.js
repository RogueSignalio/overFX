class OverFxScene extends Phaser.Scene {
  constructor(config={}) {
    super(config);
    this.config = {
      audio_on: true,
      debug: false,
      image_path: 'fx/assets',
      audio_path: 'fx/assets/audio',
      volume: 0.8,
      delay_fx_create: false,
      rs_soundengine: null,
      pack: {
        files: [{
            type: 'plugin',
            key: 'rexawaitloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexawaitloaderplugin.min.js',
            start: true
        }]
      },   
      ...config
    }
    this.delay_fx_create = this.config.delay_fx_create;
    this.rs_soundengine = this.config.rs_soundengine;
    this.started_create = false;
    if (this.rs_soundengine) {
      // this.config.delay_fx_create = true
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
    this.rs_sounds = [];
    this.enable_cleanup = true; // Sometimes we need to disable auto cleanup, but it needs to be run at some point. 
    this.active = true; // Setting active == false and enable_cleanup == true, will break down the scene.
  }

  preload() {
    this.w = this.game.canvas.width; //window.innerWidth
    this.h = this.game.canvas.height; //window.innerHeight
    this.config.debug && console.log('fx preload')    
    this.fx_preload()
    if (this.delay_fx_create) {
      this.enable_cleanup = false
    }
    this.config.debug && console.log('fx preload end')    
//    if (this.bg_on) this.engine.run_fx('background',{ bgcolor: 0x000000, hold: (this.hold + (this.fade * 5)), fade: this.fade/2})
  }
  fx_preload() { console.error('You must add a fx_preload() function to your FX plugin.') }

  create() {
    // console.log('!!!!!!!!!!! Started create...' + this.started_create)
    if (this.config.shake) { this.cameras.main.shake(this.hold || 5000, this.config.shake || 0.003) }
    if (this.config.flash) { this.cameras.main.flash(5000, 100, 100, 100) }
    if (!this.delay_fx_create) {
    // console.log('!!!!!!!!!!! No delay_fx_create...' + this.delay_fx_create)
      try {
        this.fx_create()
      } catch ({ name, message }) {
          console.log(name + ' : ' + message)
      }    
    } else {
      // console.log('!!!!!!!!!!! Delay_fx_create...' + this.delay_fx_create)
    }
    this.started_create = true
    // console.log('!!!!!!!!!!! Finished create...' + this.started_create)
  }

  fx_create() { console.error('You must add a fx_create() cuntion to your FX plugin.') }

  // Play an audio asset with optional detune min/max to make the audio more unique per play.
  // Some files work great with -100,100 or -1000,1000 ... play around with this min/max and it
  // will prevent your audio from sounding repetitive.
  //
  audio_play_detune(audio,detune_min=0,detune_max=0,volume=null) {
	  if (this.config.audio_on == true) {
      if (this.rs_soundengine != null) {
        this.rs_soundengine.sound_play(audio, { clone: true })
      } else {
        let a = this.sound.add(audio)
        a.detune = getRndInteger(detune_min,detune_max)
        a.volume = volume != null ? volume : this.config.volume
        a.play();
      }
    }
  }

  add_emitter(prt,conf) {
    let mypart = this.add.particles(0, 0, prt, conf)
    if (this.scene_ref == undefined) { this.scene_ref = mypart; }
    this.emitters.push(mypart)
    return mypart;
  }

  add_emitter_old(particle,config) {
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
    if (this.rs_soundengine != null) {
      this.rs_sounds.forEach((skey)=>{
        this.config.debug && console.log('Stopping '+skey)
        this.rs_soundengine.sound_stop(skey)
      })
    }
    try {
      this.scene.remove()
    } catch {
    }
  }

  update(t,d) {
    this.fx_update(t,d)
    if (this.enable_cleanup == false) { return; }
    // if (this.scene_ref == undefined) { return; }
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

  load_assets(assets) { //,onComplete=function(){}) {
    for (let asset of assets) {
      this.load_asset(asset,false)
    }
    if (this.rs_soundengine != null) {
      this.delay_fx_create = true
      this.rs_soundengine.sound_queue_load(()=> { 
        console.log('Loaded external audio. Sounds#: ' + this.rs_soundengine.audio_scene().sound.sounds.length); 
        setTimeout(function() { this.try_fx_create() }.bind(this),10)
      })
    }
  }

  load_asset(params,force=true) { //,force=true) {
    if (params[0] == 'image') { this.load.image(params[1],params[2]) }
    if (params[0] == 'spritesheet') { this.load.spritesheet(params[1],params[2],params[3]) }
    if (params[0] == 'atlas') { this.load.atlas(params[1],params[2],params[3]) }
    if (params[0] == 'audio') {
      if (this.rs_soundengine != null) {
        console.log('re-routing audio to external sound engine')
        this.rs_sounds.push(params[1])
        this.rs_soundengine.sound_load(params[1],params[2],'scramgine',{ retrigger: 'clone', ...params[3]},force)
      } else {
        console.log('load audio '+params[1])
        this.load.audio(params[1],params[2],params[3])
      }
    }
  }    

  try_fx_create() {
    // console.log('!!!!!!!!!!! TRY started create check ...' + this.started_create)
    if (this.started_create == true) { 
      // console.log('!!!!!!!!!!! IS TRY started create check ...' + this.started_create)
      this.fx_create() 
    }
    else {
      setTimeout(function() { this.try_fx_create() }.bind(this),10)
    }    
  }

  use_particle_cleanup() { this.enable_cleanup = true }
}
