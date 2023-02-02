/*
===========================================================================
Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2023
---------------------------------------------------------------------------
A screen overlay particle FX system based on Phaser 3 particle engine and
probably more in the future.  The purpose is to provide canned, full screen
FX to be run and hidden as needed, say as a game reward or something.

FX are done with a plugin type system and could ultimately be any PhaserJS
scene.

See README.md
===========================================================================
*/
window.activeOverTimers = [];

window.setOverTimeout = function(func, delay) {
    var timer = window.setTimeout(func, delay);
    window.activeOverTimers.push(timer)
    return timer;
};

window.clearOverTimeout = function(timerID) {
    window.activeOverTimers = window.activeOverTimers.filter(a => a !== timeID)
    window.clearTimeout(timerID);
};

window.clearAllOverTimers = function() {
  var currentTimers = [...window.activeOverTimers]
  window.activeOverTimers = []
  for (let tID of currentTimers) {
    window.clearTimeout(tID);
  }
}

class OverFx {
// TODO: Add ability to put OverFX into a container.
// Will need to get container and dimensions of container
    constructor (config={},ph_config={}) {
    	this.engine = new Phaser.Game({
		    type: Phaser.AUTO,
    	  width: window.innerWidth,
		    height: window.innerHeight,
				transparent: true, 
		    backgroundColor: 'rgba(0,0,0,0)',
        //parent: "gameContainer",
			  canvasStyle: "position:absolute;top:0px;left:0px;border-style:solid;border-width:0px;z-index:-10000;",
    		...ph_config
    	});

      this.config = {
        debug: false,
        audio_on: true,
        volume: 0.8,
        z_index: 10000,
        image_path: 'fx/assets/',
        audio_path: 'fx/assets/audio',
        ...config
      }

      this.engine.canvas.style.zIndex = this.config.z_index * -1
      this.counter = 0; // Used to generate unique scene IDs.  Will reset when scene count == 0
    	this.loaded = {}; // Store list of loaded JS scripts
      this.load_fx('overfx_scene'); // Base FX scene

      // Resize is an issue ... this seems to be the most reliable path.
			document.body.onresize = () => {
				//console.log('resize')
				this.engine.scale.resize(window.innerWidth, window.innerHeight);
			};
    }

    to_front(zindex=this.config.z_index) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.focus(); }
    to_back(zindex=(this.config.z_index*-1)) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.blur(); }
    
    audio_on() {
      this.config.audio_on = true;
      this.engine.sound.volume = this.config.volume
    }

    audio_off() {
      this.config.audio_on = false;
      this.engine.sound.volume = 0;
//      this.engine.sound.stopAll()
//      this.engine.sound.pause()
    }

    audio_toggle() {
      if (this.config.audio_on == true) { this.audio_off(); }
      else { this.audio_on(); }
    }

    active_check() {
      if (this.engine.scene.scenes.length > 0) { this.to_front(); return true; }
      else {
        this.config.debug && console.log('No scenes.');
        this.to_back(); this.counter = 0; return false;
      }
    }

    check_timer() {
      setOverTimeout(() => {
        let ret = this.active_check();
        this.config.debug && console.log('Timer: '+ ret + ':' + this.engine.scene.scenes.length);
        if (ret == true) this.check_timer()
      },300);
    }

		fx_repeat(name,cnt=1,delay_min=150,delay_max=150) {
			for(var i=0;i<cnt;i++) {
				setOverTimeout(() => {
					this.run_fx(name); 
				},getRndInteger(delay_min,delay_max)*i)
			}
		}

    run_scene(name) {
      var config = {
        key: `${name}/${this.counter}`,
        ...this.config
      }
    	var cname = name[0].toUpperCase() + name.substr(1)
      this.config.debug && console.log("Run " + config.key, config)
      var fxscene = eval(`new ${cname}(config)`)
      this.engine.scene.add(config.key, fxscene, true, {} );
      if (this.counter == 0) {
        this.to_front()
        this.check_timer()
      }
      this.counter++;
    }

    run_fx(name,config={},myf=function(){}) {
    	if (!this.loaded[name]) { this.load_fx(name,()=>{ this.run_scene(name); }) }
      else { this.run_scene(name); }
    }
    
    load_fx(name,onload=function(){}) {
			const script = document.createElement('script');
	    script.id = `${name}.js`;
	    script.src = `./fx/${name}.js`;
	    document.body.append(script);
	    script.onload = onload;
      this.config.debug && console.log(`${name} loaded.`)
      this.loaded[name] = true;
    }

    _stop_pass() {
      this.engine.sound.stopAll()
      window.clearAllOverTimers()
      for (var scene of this.engine.scene.scenes) {        
        scene.kill_scene();
      }
      this.counter = 0
    }

    stop() {
      this._stop_pass()
      this._stop_pass()
      this._stop_pass()
      this.to_back()
      this._stop_pass()
    }

		kill() {
			this.engine.destroy(true, false)
		}

		boom(cnt=1) {
			this.fx_repeat('boom',cnt*4,100,200)
		}

		sparks(cnt=1) {
			this.fx_repeat('sparks',cnt*2,50,100);
		}

		fountain(cnt=1) {
			this.fx_repeat('fountain',cnt,150,250);
		}

		spray(cnt=1) {
			this.fx_repeat('spray',cnt*1,100,150);
		}

		confetti(cnt=1) {
			this.fx_repeat('confetti',cnt*2,25,50);
		}

		heart(cnt=1) {
			this.fx_repeat('hearts',cnt*2,25,50);
		}

		heartsplode(cnt=1) {
			this.fx_repeat('heartsplode',cnt*2,25,50);
		}

		chill(cnt=1) {
			this.fx_repeat('chill',cnt*2,25,50);
		}

		fireworks(cnt=1) {
			this.fx_repeat('fireworks',cnt*3,500,700);
		}

		mega() {
		  this.fountain(2);	
		  setOverTimeout(() => { this.sparks(1); },250)
		  setOverTimeout(() => { this.sparks(1); },500)
		  setOverTimeout(() => { this.sparks(1); },750)
		  setOverTimeout(() => { this.sparks(1); },1000)
		  setOverTimeout(() => { this.sparks(1); },1250)
		  setOverTimeout(() => { this.sparks(1); },1500)
		  setOverTimeout(() => { this.sparks(1); },1750)
		  setOverTimeout(() => { this.sparks(1); },2000)
		  setOverTimeout(() => { this.sparks(1); },2250)
		  setOverTimeout(() => { this.confetti(3); },1900)
		  setOverTimeout(() => { this.confetti(3); },2200)
		}

		hell() {

		  for (var i=0;i<4;i++) {
		  	setOverTimeout(() => { this.heartsplode(1); },0 + (i*110))	
		  }
		  for (var i=0;i<5;i++) {
				setOverTimeout(() => { this.sparks(1); },1800 + (80*i))
		  }
		  for (var i=0;i<3;i++) {
				setOverTimeout(() => { this.boom(1); },2100 + (50*i))
		  }
		}

		fireworks_show() {
		  for (var i=0;i<15;i++) {
		  	setOverTimeout(() => { this.fireworks(getRndInteger(0,2)); },(i*1000) + (i*getRndInteger(250,700)))	
		  }
	  }

}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getInt(num) {
  return Math.floor(num)
}