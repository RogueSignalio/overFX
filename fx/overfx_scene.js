class OverFxScene extends Phaser.Scene {
  constructor (config={}) {
    super(config);
    this.emitters = [] // Store emiiters for later harvesting on particle death
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.audio = config.audio || true
    this.scene_ref = undefined
    this.debug = config.debug || true
    this.enable_cleanup = true
  }

  // Play an audio asset with optional detune min/max to make the audio more unique per play.
  // Some files work great with -100,100 or -1000,1000 ... play around with this min/max and it
  // will prevent your audio from sounding repetitive.
  //
  audio_play_detune(audio,detune_min=0,detune_max=0) {
	  if (this.audio) {
      let a = this.sound.add(audio)
      a.detune = getRndInteger(detune_min,detune_max)
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
    this.debug && console.log(this.constructor.name + ' cleanup...') 
    this.scene_ref.scene.scene.remove()     
  }

  update() {
    if (this.enable_cleanup == false) { return; }
    if (this.scene_ref == undefined) { return; }

    var kill = true

    this.emitters.forEach(function (item,idx) {
      if (item.getParticleCount() == item.getDeadParticleCount()) {
        item.stop();
        item.running = false;
      } else {
        kill = false
      }
    })

    if (kill == true) {        
        this.kill_scene()
    }
  }

}
