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

  addCredit: function(task, authors) {
    let authorStartX = 950;
    let authorStartY = -400;
    let authorStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    let taskStyle = { font: '40pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    let taskText = this.add.text(this.world.centerX, 900, task, taskStyle);

    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    this.add.tween(taskText).to( { y: -500 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 2500);

    if (authors !== undefined) {
      authors.forEach((element) => {
        let authorText = this.add.text(this.world.centerX, authorStartX, element, authorStyle);
        authorText.anchor.setTo(0.5);
        authorText.stroke = "rgba(0,0,0,0)";
        authorText.strokeThickness = 4;
        this.add.tween(authorText).to({
          y: authorStartY
        }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 2500);
        authorStartX += 100;
        authorStartY += 100;
      });
    }

    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    let optionStyle = { font: '30pt Font Awesome', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    let txt = this.add.text(10, (this.optionCount * 80) + 440, text, optionStyle);

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
    this.addCredit('Music', ['??']);

    this.addCredit('Map-Design & Story', ['Daniela Brus', 'Felix Schniz']);

    this.addCredit('Artist & Design', ['Natascha Rauscher']);

    this.addCredit('Dev', ['Andres Leibetseder', 'Tarek Abdel Aziz', 'Günther Kössler']);

    this.addCredit('Powered By', ['Phaser.io']);
    this.addCredit('GameJam17', ['Powered By Anexia']);

    this.addCredit('Thank you for playing', ['']);
    this.addCredit("It's not a bug it a feature ;-)", ['']);


    this.addMenuOption('\uf060 Back', function (e) {
      this.state.start("Title");
    });
    this.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 10000);
  }

};
