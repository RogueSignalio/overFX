OverFX is a simple FX plugin engine to create full screen effects over your browser app.

Being built on Phaser JS v3, using scenes for the overlays, you have full access to the
Phaser particle engine and more!

When OverFX is running an effect, it will raise the canvas to the top and when no effect
is running, then it will drop down to (hopefully) behind everything else.

Installing OverFX:
------------------------------------------
Clone this git.  This engine loads in a browser and doesn't require NPM or any other such
nonsense to work.  Really, all you need is the "fx" directory.

Add something like this to the html:
------------------------------------------
<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.24.1/phaser.min.js" crossorigin="anonymous"></script>
<script src="fx/over_fx.js" crossorigin="anonymous"></script>
<script>
  var ofx;
  window.onload = function() {
    ofx = new OverFx({})
    ofx.fx_repeat('sparks')
  };
</script>

Config Options:
------------------------------------------
  audio: Boolean to enable or disable audio (default=true)
  debug: Boolean to enable some debugging log (default=false)
  volume: 0 <=> 1.0  volume level (default = 1)
  image_path: Where to find the sprite / images for FX. default='fx/assets/'
  audio_path: Where to find the audio files for FX. default='fx/assets/audio/'
  z_index: Max/Min level for z_index.  Min will be this value * -1, max will be the value. Default = 10000

  Example: ofx = new OverFx({ audio: false, debug: true, image_path: '/assets' })

Phaser Config Options:
------------------------------------------
A second, optional option set can be passed into the constructor.  See Phaser docs
for options here to change aspects of the engine.
https://newdocs.phaser.io/docs/3.55.2/Phaser.Core.Config#backgroundColor

Example: ofx = new OverFx({},{ type: Phaser.WEBGL,  transparent: false, backgroundColor: 0x000000 })

Note: We are using an slightly older version of the engine for now due to a change in particles, so
these docs may not reflect the current versions.

Making an FX Plugin:
------------------------------------------
