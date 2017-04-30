CookieNoir.Game2d = function(game) {
  /* members */

  // buttons
  this.cursors;

  this.playerClient;

  this.isGameRunning = false;
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
    let dummymap = this.add.sprite(this.world.centerX,this.world.centerY, 'btnPlayer2d');
    dummymap.anchor.setTo(0.5);
    this.isGameRunning = true;
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
