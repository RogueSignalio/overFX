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

	    var conf = {
	        x: this.w/2,
	        y: this.h - 5,
	        lifespan: 1300,
	        angle: { min: 260, max: 280 },
	        speed: { min: 900, max: 1100 },
	        scaleX: { start: 0.05, end: 0.05 },
	        scaleY: 0.1,
	        gravityY: 1000,
			maxParticles: 5,
			alpha: 0.75,
			tint: 0x333333,
			quantity: 1,
			deathCallback: (t) => {
				var r = getRndInteger(1,3)
				if ( r == 1) { this.pop1(t) }
				if ( r == 2) { this.pop2(t) }
				if ( r == 3) { this.pop3(t) }					
			}
	    }

	    for (var i=0;i<1;i++) {
	    	setTimeout(() => {
				this.bomb.createEmitter(conf)
				var a = this.sound.add('fuse');
				a.detune = getRndInteger(-1000,1000)
				a.play();
			},500+(500*i))
		}

	    setTimeout(()=>{ 
	    	console.log('Fireworks cleanup...') 
			this.bomb.scene.scene.remove()
	    },5500)
	}

	pop1(t) {
		var colors = [
			[ 0xFF0088, 0xFF1111, 0xFFAAAA, 0xFF22BB, 0xFF7777 ],
			[ 0xFF8800, 0xFF5555, 0xFFBBBB, 0xFFBB22, 0xFF9999 ],
			[ 0x00FF88, 0x11FF11, 0xAAFFAA, 0x22FFBB, 0x77FF77 ],
		]

		var confend = {
	        x: t.x,
	        y: t.y,
	        speed: { min: 300, max: 400 },
	        angle: { min: 0, max: 360 },
	        scale: { start: 0.15, end: 0.05 },
	        blendMode: 'SCREEN',
	        lifespan: 1000,
	        gravityY: 250 ,
			maxParticles: 75,
			quantity: 5,
			tint: colors[getRndInteger(0,2)],
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f1');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

	pop2(t) {
		var colors = [
			[ 0xAAFFAA, 0x77FFFF, 0x66FF66 ],
			[ 0xFFAAAA, 0xFFFF77, 0xFF6666 ],
			[ 0xAAAAFF, 0xFF77FF, 0x6666FF ],
		]

		var confend = {
	        x: t.x,
	        y: t.y,
	        speed: { min: 300, max: 400 },
	        angle: { min: 200, max: 330 },
	        scale: { start: 0.2, end: 0 },
	        blendMode: 'SCREEN',
	        lifespan: 2500,
	        gravityY: 600 ,
			maxParticles: 50,
			quantity: 50,
			tint: colors[getRndInteger(0,2)],
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f2');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

	pop3(t) {
		var confend = {
	        x: t.x,
	        y: t.y,
	        speed: { min: 300, max: 300 },
	        angle: { min: 0, max: 360 },
	        scale: { start: 0.15, end: 0.05 },
	        blendMode: 'SCREEN',
	        lifespan: 800,
	        gravityY: 0,
			maxParticles: 150,
			quantity: 50,
			tint: [ 0x00FF88, 0xFFFF11, 0xAAFFAA, 0x22BBFF, 0x7777FF ],
		}
		this.firework.createEmitter(confend)
		var a = this.sound.add('f3');
		a.detune = getRndInteger(-1000,1000)
		a.play();
	}

}
console.log('WTF?')