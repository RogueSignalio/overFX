class Fireworks extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('sparks', './fx/images/white.png');
		this.load.audio('fuse', ['./fx/images/firework_up.mp3',]);
		this.load.audio('f1', ['./fx/images/firework4.mp3',]);
		this.load.audio('f2', ['./fx/images/firework2.mp3',]);
		this.load.audio('f3', ['./fx/images/firework3.mp3',]);

	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.firework = this.add.particles('sparks');
	    this.bomb = this.add.particles('sparks');
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
			alpha: 0.75,
			tint: 0x333333,
			quantity: 1,
//			frequency: 1600,
			deathCallback: (t) => {
				var r = getRndInteger(1,4)
				if ( r == 1) { this.pop1(t) }
				if ( r == 2) { this.pop2(t) }
				if ( r == 3) { this.pop3(t) }					
				if ( r == 4) { this.pop4(t) }					
			}
	    }

	    for (var i=0;i<2;i++) {
//var i = 0
	    	setTimeout(() => {
				this.bomb.createEmitter(conf)
				var a = this.sound.add('fuse');
				a.detune = getRndInteger(-1000,1000)
				a.play();
			},0+(1000*i))
		}

	    setTimeout(()=>{ 
	    	console.log('Fireworks cleanup...') 
			this.bomb.scene.scene.remove()
	    },5500)
	}

	pop1(t) {
		var colors = [
			[ 0xFF0000, 0xFF3333, 0xFF5555 ],
			[ 0xFFFF00, 0xFFFF33, 0xFFFF55 ],
			[ 0x00FF00, 0x33FF33, 0x55FF55 ],
			[ 0x00FFFF, 0x33FFFF, 0x55FFFF ],
			[ 0x0000FF, 0xFF0000, 0xFFFFFF ],
		]

		var confend = {
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
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f1');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

	pop2(t) {
		var colors = [
			[ 0xAAFF55, 0xAAFFAA, 0xAAFFFF  ],
			[ 0xFFAA55, 0xFFAAAA, 0xFFFFAA ],
			[ 0xFFFFFF, 0xDDDDFF, 0xBBBBFF ],
			[ 0xAAAAFF, 0xFF77FF, 0x6666FF ],
		]

		var confend = {
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
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f2');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

	pop3(t) {
		var colors = [
			[ 0xFF9999, 0xFFBBBB, 0xFFDDDD ],
			[ 0x99FF99, 0xBBFFBB, 0xDDFFDD ],
			[ 0x9999FF, 0xBBBBFF, 0xDDDDFF ],
			[ 0xFF99FF, 0xFFBBFF, 0xFFDDFF ],
			[ 0xFFFF99, 0xFFFFBB, 0xFFFFDD ],
		]		
		var confend = {
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
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f3');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

	pop4(t) {
		var colors = [
			[ 0xFF9999, 0xFFBBBB, 0xFFDDDD ],
			[ 0x99FF99, 0xBBFFBB, 0xDDFFDD ],
			[ 0x9999FF, 0xBBBBFF, 0xDDDDFF ],
			[ 0xFF99FF, 0xFFBBFF, 0xFFDDFF ],
			[ 0xFFFF99, 0xFFFFBB, 0xFFFFDD ],
		]		
		var confend = {
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
			this.firework.createEmitter(confend)
			},0+(100*i));
		}
			var a = this.sound.add('f3');
			a.detune = getRndInteger(-1000,1000)
			a.play();
	}

}
console.log('WTF?')