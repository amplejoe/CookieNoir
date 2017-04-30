CookieNoir.Load = function(game)
{
  // label for displaying loading information
  this.loadingLabel;
};

CookieNoir.Load.prototype =
{
  preload: function()
  {
    // loading text
    this.loadingLabel = this.add.text(this.world.centerX, this.world.centerY, 'loading - 0%',
    {
      font: '30px Arial',
      fill: '#ffffff'
    });
    this.loadingLabel.anchor.setTo(0.5, 0.5);

    // progress bar
    let progressBar = this.add.sprite(this.world.centerX - (0.5 * this.cache.getImage('progressBar').width),
      this.world.centerY + 30, 'progressBar');
    let progressBarOutline = this.add.sprite(this.world.centerX - (0.5 * this.cache.getImage('progressBarOutline').width),
      this.world.centerY + 30, 'progressBarOutline');
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    // assets
    this.load.image('logo', 'assets/sprites/phaser.png');

    this.load.image('gameover-bg', 'assets/sprites/end.png');

    this.load.image('btnPlayer2d', 'assets/sprites/map.png');
    this.load.image('btnPlayerParallax', 'assets/sprites/parallax.png');

    // background layers
    this.load.image('bg_z-3', 'assets/sprites/bg-z3.png');
    this.load.image('bg_z-2', 'assets/sprites/bg-z2.png');
    this.load.image('layer0', 'assets/sprites/layer0.png');
    this.load.image('layer1', 'assets/sprites/layer1.png');
    this.load.image('layer2', 'assets/sprites/layer2.png');
    this.load.image('layer3', 'assets/sprites/layer3.png');
    this.load.image('layer4', 'assets/sprites/layer4.png');

    // map
    this.load.tilemap('level_map_topdown', 'assets/sprites/map/46/map.json', null, Phaser.Tilemap.TILED_JSON);
    // (DONT use padded sprites - creates phaser warning: Phaser.Tileset - image tile area is not an even multiple of tile size)
    this.load.atlasXML('tiles', 'assets/sprites/map/46/sprites.png', 'assets/sprites/map/46/sprites.xml');
    this.load.image('simple_map', 'assets/sprites/map/map_simple.png');

    // load background images of all platforms
    for (let key in CookieNoir.level1) {
      if (key !== undefined) {
        this.load.image(key, 'assets/sprites/' + CookieNoir.level1[key].file);
      }
    };

    this.load.image('btn-clue', 'assets/sprites/popups/btn-clue.png');
    this.load.image('close', 'assets/sprites/popups/btn-close.png');
    this.load.image('popup-cigarett', 'assets/sprites/popups/popup-cigarett.png');
  },
  loadUpdate: function()
  {
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  create: function()
  {

    let map1 = this.generateMap();


    // start Title state
    this.state.start('Title');
  },
  generateMap: function()
  {
    let map = null;



    return map;
  }

};
