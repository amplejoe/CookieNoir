CookieNoir.Credit = function (game)
{
  /* members */

};

CookieNoir.Credit.prototype =
{
  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {
    let authorStyle = { font: '40pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    let taskStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    let authorText = this.add.text(this.world.centerX, 900, author, authorStyle);
    let taskText = this.add.text(this.world.centerX, 950, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    this.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    let optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    let txt = this.add.text(10, (this.optionCount * 80) + 450, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    let onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    let onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    this.stage.disableVisibilityChange = true;
    let bg = this.add.sprite(0, 0, 'gameover-bg');
    this.addCredit('Music', '??');

    this.addCredit('Game-Design & Story', 'Daniela Brus');
    this.addCredit('Game-Design & Story', 'Felix Schniz');

    this.addCredit('Artist', 'Natascha Rauscher');

    this.addCredit('Dev', 'Andres Leibetseder');
    this.addCredit('Dev', 'Tarek Abdel Aziz');
    this.addCredit('Dev', 'Günther Kössler');

    this.addCredit('Phaser.io', 'Powered By');
    this.addCredit('GameJam17', 'Powered By Anexia');

    this.addCredit('for playing', 'Thank you');
    this.addMenuOption('<- Back', function (e) {
      this.state.start("Title");
    });
    this.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
  }

};
