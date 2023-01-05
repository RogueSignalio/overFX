function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Fx {
    constructor (config=null) {
    	if (config == null) {
    		config = {
			    type: Phaser.AUTO,
	    	  width: window.innerWidth,
			    height: window.innerHeight,
					transparent: true, 
			    backgroundColor: 'rgba(0,0,0,0)',
    		}
    	}
    	this.engine = new Phaser.Game(config);
    	this.loaded = {};
      this.counter = 0;
			document.getElementsByTagName("BODY")[0].onresize = function() {
				window.addEventListener("resize", window.location.reload(true));
			};
    }

    run_fx(name,config,myf) {
    	if (!this.loaded[name]) {
	      console.log(`${name} loaded.`)
			const script = document.createElement('script');
		    script.id = `${name}.js`;
		    script.src = `./fx/${name}/${name}.js`;
		    document.body.append(script);
		    script.onload = function() {
	          	myf();
	        }
	    }
	    else {
        myf();
			}
	    this.loaded[name] = true;
    }

	kill() {
		this.engine.destroy(true, false)
	}

	boom(cnt=1) {
		var config = {}
		this.run_fx('fire',config,() => {
			console.log("Run Boom!")
			for(var i=0;i<(cnt*6);i++) {
				setTimeout(() => {
					this.engine.scene.add(`Fire${this.counter}`, Fire, true, {} );
					this.counter++;
				},getRndInteger(100,200)*i)
			}
		})
	}

	sparks(cnt=1) {
		var config = {}
		this.run_fx('sparks',config,() => {
			console.log("Run Sparks!")
			for(var i=0;i<(cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`Sparks${this.counter}`, Sparks, true, {} );
				this.counter++;
				},100*i)
			}
		})
	}

	fountain(cnt=1) {
		var config = {}
		this.run_fx('fountain',config,() => {
			console.log("Run Fountain!")
			for(var i=0;i<cnt+1;i++) {
				this.engine.scene.add(`Fountain${this.counter}`, Fountain, true, {} );
				this.counter++;
			}
		})
	}

	spray(cnt=1) {
		var config = {}
		this.run_fx('spray',config,() => {
			console.log("Run Spray!")
			for(var i=0;i<cnt;i++) {
				setTimeout(() => {
					this.engine.scene.add(`Spray${this.counter}`, Spray, true, {} );
					this.counter++;
				},150*i)
			}
		})
	}

	confetti(cnt=1) {
		var config = {}
		this.run_fx('confetti',config,() => {
			console.log("Run Confetti!")
			for(var i=0;i< (cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`Confetti${this.counter}`, Confetti, true, {} );
				this.counter++;
				},150*i)
			}
		})
	}

	heart(cnt=1) {
		var config = {}
		this.run_fx('hearts',config,() => {
			console.log("Run Heart")
			for(var i=0;i< (cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`Heart${this.counter}`, Heart, true, {} );
				this.counter++;
				},150*i)
			}
		})
	}

	heartsplode(cnt=1) {
		var config = {}
		this.run_fx('heartsplode',config,() => {
			console.log("Run HeartSplode")
			for(var i=0;i<(cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`HeartSplode${this.counter}`, HeartSplode, true, {} );
				this.counter++;
				},150*i)
			}
		})
	}

	mega() {
	  this.fountain(2);	
	  setTimeout(() => { this.sparks(1); },250)
	  setTimeout(() => { this.sparks(1); },500)
	  setTimeout(() => { this.sparks(1); },750)
	  setTimeout(() => { this.sparks(1); },1000)
	  setTimeout(() => { this.sparks(1); },1250)
	  setTimeout(() => { this.sparks(1); },1500)
	  setTimeout(() => { this.sparks(1); },1750)
	  setTimeout(() => { this.sparks(1); },2000)
	  setTimeout(() => { this.sparks(1); },2250)
	  setTimeout(() => { this.confetti(3); },1900)
	  setTimeout(() => { this.confetti(3); },2200)
	}

	hell() {
	  for (var i=0;i<6;i++) {
	  	setTimeout(() => { this.heartsplode(1); },0 + (i*110))	
	  }
	  for (var i=0;i<3;i++) {
		setTimeout(() => { this.boom(2); },1700 + (50*i))
	  }
	  for (var i=0;i<6;i++) {
		setTimeout(() => { this.sparks(1); },1500 + (80*i))
	  }
	}

	fireworks_show() {
	  for (var i=0;i<10;i++) {
	  	setTimeout(() => { this.fireworks(getRndInteger(0,2)); },(i*1000) + (i*getRndInteger(250,1000)))	
	  }
  }

	snow(cnt=1) {
		var config = {}
		this.run_fx('chill',config,() => {
			console.log("Run Chill")
			for(var i=0;i< (cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`Snow${this.counter}`, Chill, true, {} );
				this.counter++;
				},150*i)
			}
		})
	}

	fireworks(cnt=1) {
		var config = {}
		this.run_fx('fireworks',config,() => {
			console.log("Run Fireworks")
			for(var i=0;i< (cnt*2);i++) {
				setTimeout(() => {
				this.engine.scene.add(`Fireworks${this.counter}`, Fireworks, true, {} );
				this.counter++;
				},150*i)
			}
		})
	}

}

