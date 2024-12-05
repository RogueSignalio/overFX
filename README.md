OverFx is a simple FX plugin engine to create full screen effects over your browser app.

Being built on Phaser JS v3, using scenes for the overlays, you have full access to the
Phaser particle engine and more!

When OverFx is running an effect, it will raise the canvas to the top and when no effect
is running, then it will drop down to (hopefully) behind everything else.

Installing OverFx:
------------------------------------------
Clone this git.  This engine loads in a browser and doesn't require NPM or any other such
nonsense to work.  Really, all you need is the "fx" directory.

Add something like this to the html:
------------------------------------------
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.24.1/phaser.min.js" crossorigin="anonymous"></script>
<script src="fx/over_fx.js" crossorigin="anonymous"></script>
<script>
  var ofx;
  window.onload = function() {
    ofx = new OverFx({})
    ofx.fx_repeat('sparks')
  };
</script>
```

Config Options:
------------------------------------------
```
  audio: Boolean to enable or disable audio (default=true)
  debug: Boolean to enable some debugging log (default=false)
  volume: 0 <=> 1.0  volume level (default = 1)
  image_path: Where to find the sprite / images for FX. default='fx/assets/'
  audio_path: Where to find the audio files for FX. default='fx/assets/audio/'
  z_index: Max/Min level for z_index.  Min will be this value * -1, max will be the value. Default = 10000
  pre_canned: Boolean to include premade canned FX methods (default=false)
  Example: ofx = new OverFx({ audio: false, debug: true, image_path: '/assets' })
```

Phaser Config Options:
------------------------------------------
A second, optional option set can be passed into the constructor.  See Phaser docs
for options here to change aspects of the engine.
https://newdocs.phaser.io/docs/3.55.2/Phaser.Core.Config#backgroundColor

Example: ofx = new OverFx({},{ type: Phaser.WEBGL,  transparent: false, backgroundColor: 0x000000 })

Note: We are using an slightly older version of the engine for now due to a change in particles, so
these docs may not reflect the current versions.

Other OverFx features:
------------------------------------------
  * Making "canned_" method collections.  See canned_fx.js and .add_canned() method for more.  An example is a fireworks show or multiple FX at once.

Making an FX Plugin:
------------------------------------------
Full instructions are still forthcoming, but the included FX should provide good guidance.

Worthy things to note:
* Always use setOverTimeout() so the FX timers can be stopped without breaking other javascript timers
* You MUST override fx_preload() and fx_create() in your FX plugin.
* You may want to override fx_update() if YOU need to keep track of when an FX scene has ended.  Also will require turning .enable_cleanup off (=false)
  until your FX has finished.  IF your plugin doesn't use particles at all, then you will also need to override fx_check_alive() to return false
  when your scene is done.
* All assets require a unique name, so if you copy and paste an example, change the asset, but not the name, then other FX will be affected.

