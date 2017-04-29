
CookieNoir.GameParallax = function (game)
{
  /* members */
  // buttons
  this.cursors;

  this.observerClient;

};

CookieNoir.GameParallax.prototype =
{
  create: function ()
  {
    // observer communication
    // INFO: need to start server first via startserver.sh
    this.observerClient = new CookieNoir.Client(
      CookieNoir.SERVER_ADDRESS, CookieNoir.SERVER_PORT, CookieNoir.CLIENT_TYPE.PLAYER);
    this.observerClient.connect();

    // buttons
    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function ()
  {

    // movement
    if (this.cursors.left.isDown)
    {
        // this.player.body.velocity.x = -250;
    }
    else if (this.cursors.right.isDown)
    {
        // this.player.body.velocity.x = 250;
    }

  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Player Game.", 5, this.world.height - 10);
  }
};
