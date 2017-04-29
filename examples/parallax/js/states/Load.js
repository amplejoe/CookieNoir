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

    // assets

    //  parallax scrolling
    // background layers
    this.load.image('bg_z-2', 'assets/sprites/z-2.png');
    this.load.image('bg_z-1', 'assets/sprites/z-1.png');
    this.load.image('bg_z0', 'assets/sprites/z0.png');

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
