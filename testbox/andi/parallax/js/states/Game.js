
Tutorial.Game = function (game)
{
  /* members */
  this.bgTile0;
  this.bgTile1;
  this.bgTile2;
  this.bgTilebizarro;

  this.keys;
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    var currentLayer = 0;
    hidden = this.game.add.group();
    background = this.game.add.group();
    middle1 = this.game.add.group();
    middle2 = this.game.add.group();
    foreground = this.game.add.group();

    // bg far
    this.bgTile0 = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bg_z-2').height, 'bg_z-2');
    // bg near
    this.bgTile1 = this.add.tileSprite(0, 0,this.world.width, this.game.cache.getImage('bg_z-1').height, 'bg_z-1');
    // bg front
    this.bgTilebizarro = this.add.tileSprite(0, -100,this.world.width, this.game.cache.getImage('z0-bizarro').height, 'z0-bizarro');

    this.bgTile2 = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bg_z0').height, 'bg_z0');

    background.add(this.bgTile0);
    middle1.add(this.bgTile1);
    middle2.add(this.bgTilebizarro);
    foreground.add(this.bgTile2);
    this.keys = this.input.keyboard.addKeys(
    {
      switchDown: Phaser.KeyCode.G,
      switchUp: Phaser.KeyCode.T
    });

    //this
    //this.gbTilebizarro.tileScale.y = 0.5;
  },

  update: function()
  {
    if (this.keys.switchDown.isDown)
    {
      this.bgTilebizarro.tilePosition.y = 100;
      this.switchPlane(true);
    }

    // set different speeds for tilesprites
    this.bgTile0.tilePosition.x -= 4;
    this.bgTile1.tilePosition.x -= 5;
    this.bgTilebizarro.tilePosition.x -= 5;
    this.bgTile2.tilePosition.x -= 6;
  },
  render: function()
  {
    // debug text output
    this.game.debug.text( "Debug Info.", 5, this.world.height - 10 );
  },
  switchPlane: function(up){
    if(up){
      this.fadePlane();
    } else if(!up && currentLayer > 0){

    }
  },
  fadePlane: function(){
    game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
    this.add.tween(this.bgTile2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, true);
  }
};
