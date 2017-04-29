Tutorial.Load = function(game)
{
  // label for displaying loading information
  this.loadingLabel;
};

Tutorial.Load.prototype =
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

    this.load.tilemap('desert_level', 'assets/sprites/tilemap/desert_level.json', null, Phaser.Tilemap.TILED_JSON);

    // corresponding spritesheet
    // (DONT use padded sprites - creates phaser warning: Phaser.Tileset - image tile area is not an even multiple of tile size)
    this.load.atlasXML('tiles', 'assets/sprites/tilemap/sprites_no_padding.png', 'assets/sprites/tilemap/sprites_no_padding.xml');

    this.load.atlasXML('character', 'assets/sprites/XML_Character/char_anim.png', 'assets/sprites/XML_Character/char_anim.xml');

  },
  loadUpdate: function()
  {
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  create: function()
  {
    // start next state
    this.state.start('Game');
  }
};
