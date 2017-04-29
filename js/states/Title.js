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
    // this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
    // this.logo.anchor.setTo(0.5, 0.5);

    // proceed button
    // this.menuButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // text message
    // let text = this.add.text(this.world.centerX, this.world.centerY + (0.4 * this.world.height),
      // "Press Space Bar!",
      // {
      // font: "48px Arial",
        // fill: "#ff0000",
        // textAlign: "center"
      // });
    // text.anchor.set(0.5, 0.5);

    //
    let textWhite = { font: '30pt TheMinion', fill: 'white', align: 'left' };
    let textGray = { font: '30pt TheMinion', fill: 'gray', align: 'left' };

    let creditTxt = this.add.text(50, this.world.height - 80, 'Credits', textWhite);
    creditTxt.inputEnabled = true;
    creditTxt.events.onInputUp.add(()=> {
      console.log('Clicked on credit');
      this.state.start('Credit');
    });

    creditTxt.events.onInputOver.add(function (target) {
        target.setStyle(textGray);
    });

    creditTxt.events.onInputOut.add(function (target) {
        target.setStyle(textWhite);
    });

    // let placeholder = this.make.sprite(0, 0, 'placeholder');
    let player2d = this.add.button(40, 50, 'btnPlayer2d', actionOnClick, this, 2, 1, 0);
    player2d.scale.setTo(0.7);
    player2d.onInputOver.add(over, this);
    player2d.onInputOut.add(out, this);
    player2d.onInputUp.add(up, this);

    let playerParallax = this.add.button(420, 100, 'btnPlayerParallax', actionOnClick, this, 2, 1, 0);
    playerParallax.scale.setTo(0.25);
    playerParallax.onInputOver.add(over, this);
    playerParallax.onInputOut.add(out, this);
    playerParallax.onInputUp.add(up, this);

  },
  update: function()
  {
    // this.logo.rotation += 0.01;

    // if menuButton is pressed start Game state
    // if (this.menuButton.isDown) this.state.start('Game');
  },
};

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {
  console.log('clicked ' + this);
    // background.visible =! background.visible;

}
