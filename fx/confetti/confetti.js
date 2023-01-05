class Confetti extends Phaser.Scene {
    constructor (config={}) {
        super(config);
    }

	preload() {
	    this.load.image('confetti', './fx/confetti/confetti.png');
		this.load.audio('confetti', ['./fx/images/Pop-sound.mp3',]);
	    this.w = window.innerWidth
	    this.h = window.innerHeight
	}

	create() {
	    this.confetti1 = this.add.particles('confetti');

	    var conf = {
	        x: this.w/2 + getRndInteger(-this.w/10,this.w/10),
	        y: this.h/2 + getRndInteger(-this.h/10,this.h/10),
	        speed: { min: 400, max: 800 },
	        angle: { min: 220, max: 320 },
	        scaleX: { min: 0.01, max: 0.2 },
	        rotate: { min: -360, max: 360 },
	        scaleY: { min: -1, max: 1 },
	        lifespan: 2400,
	        gravityY: 900 ,
			maxParticles: 24,
			quantity: 3,
			tint: [ 0xEE8844, 0xFF3333, 0xDD77DD, 0x8888FF, 0xFF88FF, 0xFFFFFF ],
	    }

	    for (var i=0;i<10;i++) {
			this.confetti1.createEmitter(conf)
		}
		var a = this.sound.add('confetti');
		a.detune = getRndInteger(-300,300)
		a.play();

	    setTimeout(()=>{ 
	    	console.log('Confetti cleanup...') 
			this.confetti1.scene.scene.remove()
	    },3500)
	}

}
console.log('WTF?')