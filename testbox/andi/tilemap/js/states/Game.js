Tutorial.Game = function(game)
{
  /* members */
  this.showDebug = false;
  this.toggleDebugButton;
  this.DebugRect;

  this.character;
  this.cursors;
  this.keys;

  this.mapLayer;
  this.maxScale = 4.0;

  this.mode = 0; // movement modes: 0 player, 1 camera
  this.num_modes = 2;
};

Tutorial.Game.prototype = {
  create: function()
  {

    let map;
    let layer;

    // JSON tilemap

    //  add tilemap to game
    map = this.add.tilemap('desert_level');

    // set tileset image
    //  1st parameter: tileset name, as specified in the Tiled map editor (see assets/sprites/tilemap/desert_level.json)
    //  2nd parameter: image used for the tileset (from Phaser.Cache)
    map.addTilesetImage('desert_tiles', 'tiles');
    map.smoothed = false;

    //  Create a layer from Level1 layer in map data (see assets/sprites/tilemap/desert_level.json)
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    this.mapLayer = map.createLayer('Level1');


    this.keys = this.input.keyboard.addKeys(
    {
      zoomin: Phaser.KeyCode.Q,
      zoomout: Phaser.KeyCode.E,
      switchmode: Phaser.KeyCode.T
    });

    // resize the game world to match layer dimensions (only if world is smaller than tilemap)
    this.mapLayer.resizeWorld();

    // [2] character using multiple animations in one sheet
    this.character = this.add.sprite(32, 32, 'character'); // add char to state
    this.character.smoothed = false; // disable smoothing, else pixelart appears blurry on scale
    this.character.scale.setTo(2.0);
    // create animations (4 for every direction -> see orig/animated_character.png)
    this.character.animations.add('down', [0, 1, 2, 3], 10, true);
    this.character.animations.add('right', [4, 5, 6, 7], 10, true);
    this.character.animations.add('left', [8, 9, 10, 11], 10, true);
    this.character.animations.add('up', [12, 13, 14, 15], 10, true);
    // character physics
    this.game.physics.p2.enable(this.character);
    this.character.body.fixedRotation = true; // disable collisions rotating character
    this.camera.follow(this.character, Phaser.Camera.STYLE_TOPDOWN);
    // character keys
    this.cursors = this.input.keyboard.createCursorKeys();


    // debug for checking world bounds
    this.DebugRect = new Phaser.Rectangle(0, 0, this.world.width, this.world.height);
    this.toggleDebugButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.toggleDebugButton.onDown.add(
      () =>
      {
        this.showDebug = !this.showDebug;
      }, this);
    // movement / camera mode
    this.keys.switchmode.onDown.add(
      () =>
      {
        this.mode++;
        this.mode = this.mode % this.num_modes;

        if (this.mode === 0)
          this.camera.follow(this.character, Phaser.Camera.STYLE_TOPDOWN);
        else
          this.camera.follow(null);
      },this);


  },
  update: function()
  {

    this.handleScaling();

    if (this.mode === 0)
      this.controlCharacter();
    else
      this.controlCamera();

  },
  // sisabled, as it causes weird effects
  handleScaling: function()
  {

    // scaling ()
    if (this.keys.zoomin.isDown)
    {
      let newscale = this.world.scale.x + 0.01;
      if (newscale > this.maxScale) newscale = this.maxScale;
      // this.mapLayer.scale.setTo(newscale);
      // this.world.scale.setTo(newscale);
      // this.mapLayer.resizeWorld();
      //this.resize();

    }
    else if (this.keys.zoomout.isDown)
    {
      let newscale = this.world.scale.x - 0.01;
      if (newscale < 0) newscale = 0;
      // this.mapLayer.scale.setTo(newscale);
      // this.world.scale.setTo(newscale);
      // this.mapLayer.resizeWorld();
    }

  },
  // [2] cursor controls for playable character
  controlCharacter: function()
  {
    // reset velocity
    this.character.body.setZeroVelocity();
    let moving = false;

    if (this.cursors.left.isDown)
    {
      this.character.animations.play('left');
      moving = true;
      // equivalent: player.body.velocity.x = 300;
      this.character.body.moveLeft(300);
    }
    else if (this.cursors.right.isDown)
    {
      this.character.animations.play('right');
      moving = true;
      this.character.body.moveRight(300);
    }

    if (this.cursors.up.isDown)
    {
      if (!moving) this.character.animations.play('up');

      moving = true;
      this.character.body.moveUp(300);
    }
    else if (this.cursors.down.isDown)
    {
      if (!moving) this.character.animations.play('down');
      moving = true;
      this.character.body.moveDown(300);
    }

    if (!moving) this.character.animations.stop();
  },
  // control camera movement
  controlCamera: function()
  {
    if (this.cursors.up.isDown)
    {
      this.camera.y -= 4;
    }
    else if (this.cursors.down.isDown)
    {
      this.camera.y += 4;
    }

    if (this.cursors.left.isDown)
    {
      this.camera.x -= 4;
    }
    else if (this.cursors.right.isDown)
    {
      this.camera.x += 4;
    }
  },
  render: function()
  {
    // world bounds debug
    if (this.showDebug)
      this.game.debug.geom(this.DebugRect, 'rgba(255,0,0,0.5)');
    else
      this.game.debug.geom(this.DebugRect, 'rgba(255,0,0,0.0)');
    // debug text output
    let  mvmntxt = this.mode === 0 ? "character" : "camera";
    this.game.debug.text("Press [SPACE] to show world bounds.", 5, Tutorial.SCREEN_HEIGHT - 30);
    this.game.debug.text("Press [T] to toggle cursor key movement mode - current: ." + mvmntxt, 5, Tutorial.SCREEN_HEIGHT - 10);

  }
};
