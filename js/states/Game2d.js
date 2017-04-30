CookieNoir.Game2d = function(game) {
  /* members */

  // buttons
  this.cursors;

  this.playerClient;

  this.isGameRunning = false;

  this.enemy;
  this.placedItems = [];

  this.itemKeys = [];
};

CookieNoir.Game2d.prototype = {
  create: function() {

    // player communication
    // INFO: need to start server first via startserver.sh
    this.playerClient = new CookieNoir.Client(
      CookieNoir.SERVER_ADDRESS, CookieNoir.SERVER_PORT, CookieNoir.CLIENT_TYPE.OBSERVER);
    this.playerClient.connect();

    // buttons
    this.cursors = this.input.keyboard.createCursorKeys();
  },
  startGame: function()
  {
    let map = this.add.sprite(this.world.centerX - 50,this.world.centerY - 20, 'simple_map');
    map.anchor.setTo(0.5);
    map.smoothed = false;
    map.scale.setTo(0.70);

    // music (volume 1.0, loop: true)
    this.music = this.add.audio('music', 1.0, true);
    this.music.play();

    // JSON tilemap
   //  add tilemap to game
  //  let map = this.add.tilemap('level_map_topdown');
  //  map.addTilesetImage('sprites', 'tiles');
  //  let layer = map.createLayer('Tile Layer 1');
  // layer.resizeWorld();

  //  this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  // this.world.scale.x  = 0.3;
  // this.world.scale.y  = 0.3;

  //layer.scale = {x:0.2, y:0.2};
  //layer.debug = true;

  // var layer = level.createLayer( 'Tile Layer 1',
  //   layerData.width * 256 * 2,    layerData.height * levelData.tileheight * 2,    group);layer.visible = layerData.visible;layer.alpha = layerData.opacity;layer.position.set(layerData.x, layerData.y);layer.scale.set(0.5, 0.5);layer.resizeWorld();

  //this.placeItem('btnPlayer2d', {x: this.world.centerX, y: this.world.centerY});
  this.playerClient.sendMessage({type:'placeEnemy', position: 'pos'});

  //  this.game.scale.setUserScale(0.4, 0.4, 1.0, 0); // use 1.5 for horizontal/vertical scaling factor

   //

   this.isGameRunning = true;
  },
  placeItem: function (spriteKey, position)
  {
      let sprite = this.add.sprite(position.x,position.y, spriteKey);
      sprite.anchor.setTo(0.5);
      this.placedItems.push({key: spriteKey, sprite: sprite});
  },
  removeAllItems: function()
  {
    for (let i = 0;i<this.placedItems.length; i++)
    {
      this.placedItems[i].sprite.destroy();
    }
    this.placedItems = [];
  },
  placeEnemy: function (spriteKey, position)
  {
      if (this.enemy) this.enemy.sprite.destroy();
      let sprite = this.add.sprite(position.x,position.y, spriteKey);
      sprite.anchor.setTo(0.5);
      this.enemy = {key: spriteKey, sprite: sprite};
  },
  update: function() {

    if (!this.isGameRunning) return;

    // movement
    if (this.cursors.left.isDown) {
      // this.player.body.velocity.x = -250;
    } else if (this.cursors.right.isDown) {
      // this.player.body.velocity.x = 250;
    }

  },
  render: function() {
    // debug text output
    this.game.debug.text("Observer Game (game running: "+this.isGameRunning+")", 5, 32);
  }
};
