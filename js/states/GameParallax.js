
CookieNoir.GameParallax = function (game)
{
  /* members */
  // buttons
  this.cursors;

};

CookieNoir.GameParallax.prototype =
{
  create: function ()
  {

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
    this.game.debug.text("Debug output.", 5, this.world.height - 10);
  }
};
