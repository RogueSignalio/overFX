class Fireworks extends OverFxScene {
    constructor (config={}) {
        super(config);
        this.enable_cleanup = false
    }

	preload() {
	    this.load.image('sparks', 'assets/overfx/white.png');
		this.load.audio('fuse', ['assets/overfx/firework_up.mp3',]);
		this.load.audio('f1', ['assets/overfx/firework4.mp3',]);
		this.load.audio('f2', ['assets/overfx/firework2.mp3',]);
		this.load.audio('f3', ['assets/overfx/firework3.mp3',]);
	}

	create() {
	    this.firework = this.add.particles('sparks');
	    this.bomb = this.add.particles('sparks');
	    var i = 0
	    for (i=0;i<2;i++) {
	    	setTimeout(this.shell(),0+(1000*i))
		}
    	setTimeout(() => {
	        this.enable_cleanup = true
    	},1000*(i+1)+3000)
	}

	shell() {
		var fireworks = ['pop1','pop2','pop3','pop4','pop5']
		var offset = this.h > 690 ? (this.h - 690) : 0
	    var conf = {
	        x: this.w/2,
	        y: (this.h - 5) - offset,
	        lifespan: 1300,
	        angle: { min: 260, max: 280 },
	        speed: { min: 900, max: 1100 },
	        scaleX: { start: 0.05, end: 0.05 },
	        scaleY: 0.1,
	        gravityY: 1000,
			maxParticles: 1,
			tint: 0x555555,
			quantity: 1,
			deathCallback: (t) => {
				var fw = fireworks[getRndInteger(0,fireworks.length-1)]
				this[fw](t)
			}
	    }
		this.add_emitter(this.bomb,conf)
		this.audio_play_detune('fuse',-1000,1000)
	}

	pop1(t) {
		var colors = [
			[ 0xFF0000, 0xFF3333, 0xFF5555 ],
			[ 0xFFFF00, 0xFFFF33, 0xFFFF55 ],
			[ 0x00FF00, 0x33FF33, 0x55FF55 ],
			[ 0x00FFFF, 0x33FFFF, 0x55FFFF ],
			[ 0x0000FF, 0xFF0000, 0xFFFFFF ],
		]
		this.add_emitter(this.firework,{
	        x: t.x,
	        y: t.y,
	        speed: { min: 200, max: 400 },
	        angle: { min: 0, max: 360 },
	        scale: { start: 0.15, end: 0.01 },
	        blendMode: 'SCREEN',
	        lifespan: 1200,
	        gravityX: getRndInteger(-400,400),
	        gravityY: getRndInteger(300,700),
			maxParticles: 160,
			quantity: 10,
			tint: colors[getRndInteger(0,colors.length-1)],
		})
		this.audio_play_detune('f1',-1000,1000)
	}

	pop2(t) {
		var colors = [
			[ 0xAAFF55, 0xAAFFAA, 0xAAFFFF  ],
			[ 0xFFAA55, 0xFFAAAA, 0xFFFFAA ],
			[ 0xFFFFFF, 0xDDDDFF, 0xBBBBFF ],
			[ 0xAAAAFF, 0xFF77FF, 0x6666FF ],
		]

		this.add_emitter(this.firework,{
	        x: t.x,
	        y: t.y,
	        speed: { min: 300, max: 400 },
	        angle: { min: getRndInteger(200,270), max: getRndInteger(270,340) },
	        scale: { start: 0.2, end: 0 },
	        blendMode: 'SCREEN',
	        lifespan: 2500,
	        gravityX: getRndInteger(-200,200),
	        gravityY: 600,
			maxParticles: 50,
			quantity: 50,
			tint: colors[getRndInteger(0,colors.length-1)],
		})
		this.audio_play_detune('f2',-1000,1000)
	}

	pop3(t) {
		var colors = [
			[ 0xFF9999, 0xFFBBBB, 0xFFDDDD ],
			[ 0x99FF99, 0xBBFFBB, 0xDDFFDD ],
			[ 0x9999FF, 0xBBBBFF, 0xDDDDFF ],
			[ 0xFF99FF, 0xFFBBFF, 0xFFDDFF ],
			[ 0xFFFF99, 0xFFFFBB, 0xFFFFDD ],
		]		
		this.add_emitter(this.firework,{
	        x: t.x,
	        y: t.y,
	        speed: getRndInteger(100,300), //{ min: 300, max: 300 },
	        angle: { min: 0, max: 360 },
	        scale: { start: 0.15, end: 0.05 },
	        blendMode: 'SCREEN',
	        lifespan: 600,
	        gravityY: 0,
			maxParticles: 150,
			quantity: 50,
			tint: colors[getRndInteger(0,colors.length-1)],
		})
		this.audio_play_detune('f3',-1000,1000)
	}

	pop4(t) {
		var colors = [
			[ 0xFF9999, 0xFFBBBB, 0xFFDDDD ],
			[ 0x99FF99, 0xBBFFBB, 0xDDFFDD ],
			[ 0x9999FF, 0xBBBBFF, 0xDDDDFF ],
			[ 0xFF99FF, 0xFFBBFF, 0xFFDDFF ],
			[ 0xFFFF99, 0xFFFFBB, 0xFFFFDD ],
		]
		var conf = {
	        x: t.x,
	        y: t.y,
	        speed: { min: 100, max: 150 },
	        angle: { min: getRndInteger(0,50), max: getRndInteger(130,180) },
	        scale: { start: 0.15, end: 0.0 },
	        blendMode: 'SCREEN',
	        lifespan: 1800,
	        gravityX: getRndInteger(-200,200),
	        gravityY: getRndInteger(180,220),
			maxParticles: 150,
			quantity: 50,
			tint: colors[getRndInteger(0,colors.length-1)],
		}

	    for (var i=0;i<2;i++) {
			setTimeout(() => {
				this.add_emitter(this.firework,conf)
			},0+(100*i));
		}
		this.audio_play_detune('f3',-1000,1000)
	}

	pop5(t,recurse=true) {
	    var colors = [
			[ 0xFF9999, 0xFFBBBB, 0xFFDDDD ],
			[ 0x99FF99, 0xBBFFBB, 0xDDFFDD ],
			[ 0x9999FF, 0xBBBBFF, 0xDDDDFF ],
			[ 0xFF99FF, 0xFFBBFF, 0xFFDDFF ],
			[ 0xFFFF99, 0xFFFFBB, 0xFFFFDD ],
	    ]
		this.add_emitter(this.firework,{
	        x: t.x,
	        y: t.y,
	        lifespan: 1600,
	        angle: { start: 0, end: 380, steps: 20 },
			speed: { min: 100, max: 140},
			gravityY: -50,
	        gravityX: getRndInteger(-50,50),
	        scale: { start: 0.2, end: 0 },
	        maxParticles: 200,
	        quantity: 10,
	        tint: colors[getRndInteger(0,colors.length-1)],
	        blendMode: 'SCREEN'
	    })
	    var p5 = this.emitters[this.emitters.length - 1]
		this.audio_play_detune('f2',-1000,1000)
	    setTimeout(() => { p5.gravityY = 400 },800);
	    if (recurse == true) { setTimeout(this.pop5.bind(this,{x: t.x, y: t.y},false),400); }
	}

}
