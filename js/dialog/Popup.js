CookieNoir.Popup = function(buttonSprite, popupSprite, clues, game)
{
  this.buttonSprite = buttonSprite;
  this.popupSprite = popupSprite;
  this.clues = clues;
  this.game = game;
  this.tween = null;
};

CookieNoir.Popup.prototype =
{
  constructor: CookieNoir.Popup,
  start: function(){
    // this.cigaretts = new CookieNoir.Popup("btn-clue", "popup-cigarett", this.clues, this.game);
    // this.cigaretts.start();
    //this.button = this.game.add.button(this.game.world.centerX - 95, 460, this.buttonSprite , this.openWindow, this, 2, 1, 0);
    this.button = this.game.add.sprite(0, 0, this.buttonSprite);
    //console.log(this.button.positions);
    //this.button.input.useHandCursor = true;
    //this.button.events.onInputDown.add(this.openWindow, this);
    this.button.inputEnabled = true;
    //this.closeButton.input.priorityID = 1;
    this.button.input.useHandCursor = true;
    this.button.events.onInputDown.add(this.openWindow, this);

    //  You can drag the pop-up window around
    this.popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.popupSprite);
    this.popup.alpha = 0;
    this.popup.anchor.set(0.5);
    this.popup.inputEnabled = true;
    this.popup.input.enableDrag();

    //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
    var pw = (this.popup.width / 2) - 30;
    var ph = (this.popup.height / 2) - 8;

    //  And click the close button to close it down again
    this.closeButton = this.game.make.sprite(pw, -ph, 'close');
    this.closeButton.inputEnabled = true;
    this.closeButton.input.priorityID = 1;
    this.closeButton.input.useHandCursor = true;
    this.closeButton.events.onInputDown.add(this.closeWindow, this);

    //  Add the "close button" to the popup window image
    this.popup.addChild(this.closeButton);

    //  Hide it awaiting a click
    this.popup.scale.set(0.1);
    this.clues.add(this.button);
    this.clues.add(this.popup);

  },

  openWindow: function() {
    if ((this.tween !== null && this.tween.isRunning) || this.popup.scale.x === 1)
    {
        return;
    }
    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    this.tween = this.game.add.tween(this.popup.scale).to( { x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
    this.tween = this.game.add.tween(this.popup).to( { alpha: 1}, 1000, Phaser.Easing.Elastic.Out, true);
  },

  closeWindow: function() {
    if (this.tween && this.tween.isRunning || this.popup.scale.x === 0.1)
    {
        return;
    }
    //  Create a tween that will close the window, but only if it's not already tweening or closed
    this.tween = this.game.add.tween(this.popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
    this.tween = this.game.add.tween(this.popup).to( { alpha: 0 }, 500, Phaser.Easing.Elastic.In, true);
  }
};
