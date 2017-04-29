
Tutorial.Game = function (game)
{
  /* members */
  this.bgTile0;
  this.bgTile1;
  this.bgTile2;

};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // bg far
    this.bgTile0 = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bg_z-2').height, 'bg_z-2');
    // bg near
    this.bgTile1 = this.add.tileSprite(0, 0,this.world.width, this.game.cache.getImage('bg_z-1').height, 'bg_z-1');
    // bg front
    this.bgTile2 = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bg_z0').height, 'bg_z0');

  },
  update: function()
  {

    // set different speeds for tilesprites
    this.bgTile0.tilePosition.x -= 4;
    this.bgTile1.tilePosition.x -= 5;
    this.bgTile2.tilePosition.x -= 6;
  },
  render: function()
  {
    // debug text output
    this.game.debug.text( "Debug Info.", 5, this.world.height - 10 );
  }
};
