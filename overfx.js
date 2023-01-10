function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class OverFx {
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
      this.load_fx('overfx_scene')

      // Resize is an issue ... this seems to be the most reliable path.
			document.getElementsByTagName("BODY")[0].onresize = () => {
				this.engine.scale.resize(window.innerWidth, window.innerHeight);
			};
    }

    run_fx(name,config={},myf=function(){}) {
    	var cname = name[0].toUpperCase() + name.substr(1)
    	if (!this.loaded[name]) {
	      console.log(`${name} loaded.`)
	      this.load_fx(name,()=>{
					console.log("Run " + name)
					this.engine.scene.add(`name${this.counter}`, eval(cname), true, {} );
					this.counter++;
	      })
	    }
	    else {
				this.engine.scene.add(`name${this.counter}`, eval(cname), true, {} );
				this.counter++;
			}
	    this.loaded[name] = true;
    }

    load_fx(name,onload=function(){}) {
			const script = document.createElement('script');
	    script.id = `${name}.js`;
	    script.src = `./fx/${name}.js`;
	    document.body.append(script);
	    script.onload = onload;
    }

		kill() {
			this.engine.destroy(true, false)
		}

		fx_repeat(name,cnt=1,delay_min=150,delay_max=150) {
			for(var i=0;i<cnt;i++) {
				setTimeout(() => {
					this.run_fx(name); 
				},getRndInteger(delay_min,delay_max)*i)
			}
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

		  for (var i=0;i<4;i++) {
		  	setTimeout(() => { this.heartsplode(1); },0 + (i*110))	
		  }
		  for (var i=0;i<5;i++) {
				setTimeout(() => { this.sparks(1); },1800 + (80*i))
		  }
		  for (var i=0;i<3;i++) {
				setTimeout(() => { this.boom(1); },2100 + (50*i))
		  }
		}

		fireworks_show() {
		  for (var i=0;i<15;i++) {
		  	setTimeout(() => { this.fireworks(getRndInteger(0,2)); },(i*1000) + (i*getRndInteger(250,700)))	
		  }
	  }

	}

