/*===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
License: MIT
---------------------------------------------------------------------------
A screen overlay particle FX system based on Phaser 3 particle engine and
probably more in the future.  The purpose is to provide canned, full screen
FX to be run and hidden as needed, say as a game reward or something.

FX are done with a plugin type system and could ultimately be any PhaserJS
scene.

See README
===========================================================================*/
// TODO:
// * Add ability to put OverFx into a container.
//    -- Will need to get container and dimensions of container and use parent config option for phaser.
// * Make timers instance encapsulated so .stop() only stops one OverFx instance scenes.
// * Add asset loader to OverFxScene so as to guarantee unique names.
// * Add some non-particle examples.
//
class OverFx {
    constructor (config={},ph_config={}) {
    	this.engine = new Phaser.Game({
		    type: Phaser.AUTO,
    	  width: window.innerWidth,
		    height: window.innerHeight,
				transparent: true, 
		    backgroundColor: 'rgba(0,0,0,0)',
			  canvasStyle: "position:absolute;top:0px;left:0px;z-index:-10000;visibility:hidden;",
        ...ph_config
    	});

      this.config = {
        debug: false,
        audio_on: true,
        preload: false,
        volume: 0.25,
        z_index: 10000,
        pre_canned: false,
        image_path: './fx/assets',
        audio_path: './fx/assets/audio',
        modules_path: './fx',
        minified_modules: false,
        ...config
      }

      this.engine.canvas.style.zIndex = this.config.z_index * -1
      this.counter = 0; // Used to generate unique scene IDs.  Will reset when scene count == 0
    	this.loaded = {}; // Store list of loaded JS scripts
      this.loading = {}; // Store list of loaded JS scripts
      this.load_fx('overfx_timer'); // Base FX setOverTimeouts
      this.load_fx('overfx_scene'); // Base FX scene
      this.load_fx('canned_fx',() => { Object.assign(this,CannedFx); }); // Built-in "canned" FX

      // Resize is an issue ... this seems to be the most reliable path.
			document.body.onresize = () => {
				this.engine.scale.resize(window.innerWidth, window.innerHeight);
			};
    }

    // Raise or lower to the z-index min or max layer
    to_front(zindex=this.config.z_index) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.focus(); this.engine.canvas.style.visibility = 'visible'; }
    to_back(zindex=(this.config.z_index*-1)) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.style.visibility = 'hidden'; this.engine.canvas.blur(); }
    
    // Set volume from 0 to 1
    volume(vol=null) {
      if (vol && vol < 0) { vol = 0 }
      else if (vol && vol > 1) { vol = 1 }

      if (vol >= 0) { this.engine.sound.volume = this.config.volume = vol }
      return this.engine.sound.volume; 
    }

    // Turns audio back on.
    audio_on() {
      this.config.audio_on = true;
      this.engine.sound.volume = this.config.volume
    }

    // Turns audio off.
    audio_off() {
      this.config.audio_on = false;
      this.engine.sound.volume = 0;
    }

    // Toggles the audio on / off from current state.
    audio_toggle() {
      if (this.config.audio_on == true) { this.audio_off(); }
      else { this.audio_on(); }
    }

    // Run FX a number of X times with min and max delays in ms
    // Deprecated, see run_fx_timed()
		fx_repeat(name,cnt=1,delay_min=150,delay_max=150) {
      console.info('Deprecated.  Use run_fx_timed() instead.');
			for(var i=0;i<cnt;i++) {
				setOverTimeout(() => {
					this.run_fx(name); 
				},getRndInteger(delay_min,delay_max)*i)
			}
		}

    run_fx_timed(name,cnt=1,config={},delay_min=150,delay_max=150) {
			for(var i=0;i<cnt;i++) {
				setOverTimeout(() => {
          if (name.startsWith("canned_")) { this[name](cnt); }
					else { this.run_fx(name,config); }
				},getRndInteger(delay_min,delay_max)*i)
			}      
    }

    // Loads, if needed, the FX plugin and run_scene(fx) when done or if loaded.
    run_fx(name,config={}) {
      if (name.startsWith("canned_")) { this[name](1); }
    	else if (!this.loaded[name]) { this.load_fx(name,()=>{ this._run_scene(name,config); }) }
      else { this._run_scene(name,config); }
    }

    // Load anything in the FX subdir, typically an actual FX plugin.
    // To load and immediately run, use run_fx() instead.
    load_fx(name,onload=null) {
      if (this.loading[name]) return;
      if (this.config.preload) this.loaded[name] = true;
      if (this.loading[name]) return;
      this.loading[name] = true;
      this.config.debug && console.log(`${name} load call. Loading: ${this.loaded[name] == undefined}.`)
      if (this.loaded[name]) return;
			const script = document.createElement('script');
	    script.id = `${name}.js`;
      let min = this.config.minified_modules ? '.min' : '' 
	    script.src = `${this.config.modules_path}/${name}${min}.js`;
      if (!onload) onload = ()=>{ };
	    script.onload = ()=> { this.loading[name] = false; this.loaded[name] = true; onload.call(this); }
      document.body.append(script);
      this.config.debug && console.log(`${name} loaded.`)
    }

    // Checks for active FX
    active_check() {
      if (this.engine.scene.scenes.length > 0) { this.to_front(); return true; }
      else {
        this.config.debug && console.log('No scenes.');
        this.to_back(); this.counter = 0; return false;
      }
    }

    // Stop all FX & audio
    // A lil issue with timers firing etc do best to be safe
    stop() {
      this._stop_pass()
      this._stop_pass()
      this._stop_pass()
      this.to_back()
      this._stop_pass()
    }

    // Kills the engine, scenes, and canvas.
    // Useful if you want to clean it up.
		kill() {
			this.engine.destroy(true, false)
		}

    add_canned(name,code) {
      this['canned_'+name] = code;
    }

    next_counter() {
      this.counter = this.counter + 1
      return this.counter
    }

    // Runs a loaded FX scene.
    _run_scene(name,config={}) {
      let count = this.next_counter()
      // console.log(`${name}/${count}`)

      var config = {
        key: `${name}/${count}`,
        engine: this,
        ...this.config,
        ...config
      }
    	var cname = name[0].toUpperCase() + name.substr(1)
      this.config.debug && console.log("Run " + config.key, config)
      var fxscene = eval(`new ${cname}(config)`)
      this.engine.scene.add(config.key, fxscene, true, {} );
      if (this.counter == 1) {
        this.to_front()
        this._check_timer()
      }
//      this.counter++;
    }

    _check_timer() {
      setOverTimeout(() => {
        let ret = this.active_check();
        this.config.debug && console.log('Timer: '+ ret + ':' + this.engine.scene.scenes.length);
        if (ret == true) this._check_timer()
      },300);
    }

    _stop_pass() {
      this.engine.sound.stopAll()
      window.clearAllOverTimers()
      for (var scene of this.engine.scene.scenes) {        
        scene.kill_scene();
      }
      this.counter = 0
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getInt(num) {
  return Math.floor(num)
}

window.loaded_js = {}
function load_js(name,onload=function(){}) {
  console.log('In use???')
  if (window.loaded_js[name]) return;
  const script = document.createElement('script');
  script.id = `${name}`;
  script.src = `${name}`;
  document.body.append(script);
  //if (!onload) onload = ()=>{ window.loaded_js[name] = true; }
  //script.onload = onload;
//  if (!onload) onload = ()=>{ };
  script.onload = ()=> { this.loaded_js[name] = true; onload.call(this); }

  this.config.debug && console.log(`${name} loaded.`)
}
