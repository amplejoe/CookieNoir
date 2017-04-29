CookieNoir.Title = function(game)
{
  this.logo;
  this.menuButton;
};

CookieNoir.Title.prototype =
{
  create: function()
  {
    // phaser logo
    this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5, 0.5);

    // proceed button
    this.menuButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // text message
    let text = this.add.text(this.world.centerX, this.world.centerY + (0.4 * this.world.height),
      "Press Space Bar!",
      {
        font: "48px Arial",
        fill: "#ff0000",
        textAlign: "center"
      });
    text.anchor.set(0.5, 0.5);
  },
  update: function()
  {
    this.logo.rotation += 0.01;

    // if menuButton is pressed start Game state
    if (this.menuButton.isDown) this.state.start('Game');
  }
};
