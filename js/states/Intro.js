CookieNoir.Intro = function (game)
{
  /* members */
  this.content = [];
  this.content1 = [
      "It was closing in on midnight, as dark as a pitch black cat haunting the coal chamber.",
      "Me reeked cranked up neon and rain. Cheap perfume. Crime.",
      "Stolen cookies weigh heavier than broken hearts."
  ];
  this.content2 = [
      "Cookie: They took me cookies, babe! And you are never here when me need ya.",
      "Cloud: You never need me when I’m around sweetheart… you need me above."
  ];
  this.content3 = [
    "Cookie: Strange, seeing the house disappear behind me like that.",
      "Heading downtown. For her. For me. To find these cookies!",
    "Cloud: Strange, seeing the house disappear behind me like that.",
      "Where I go you can’t follow. I’ll see ya."
  ]
  this.line = [];
  this.wordIndex = 0;
  this.lineIndex = 0;
  this.screenIndex = 0;

  this.wordDelay = 360;
  this.lineDelay = 400;
};

CookieNoir.Intro.prototype =
{
  preload: function () {
    this.intro = this.game.add.sprite(0,0,'intro1');
    this.content = this.content1;
  },

  create: function () {
    // this.text = this.game.add.text(32, 432, '', { font: "15px Arial", fill: "#19de65" });
    this.text = this.game.add.text(32, 432, '', { font: "20px TheMinion", fill: "white" });
    // let authorStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    this.nextLine();

    this.music = this.add.audio('music', 1.0, true);
    this.music.play();
  },
  nextLine: function() {

    if (this.lineIndex === this.content.length)
    {
        this.screenIndex += 1;
        if(this.screenIndex == 1 || this.screenIndex == 2){
          this.add.tween(this.intro).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, true);
          let tweenOut = this.add.tween(this.text).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, true);
          tweenOut.onComplete.add(() => {
            if(this.screenIndex == 1){
              this.intro = this.game.add.sprite(0,0,'intro2');
              this.content = this.content2;
            } else if(this.screenIndex == 2){
              this.intro = this.game.add.sprite(0,0,'intro3');
              this.content = this.content3;
            }
            this.intro.alpha = 0;
            this.text = this.game.add.text(32, 432, '', { font: "20px TheMinion", fill: "white" });
            this.wordIndex = 0;
            this.lineIndex = 0;
            this.line = [];
            this.add.tween(this.intro).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, true);
            this.add.tween(this.text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, true);
            this.nextLine();
          }, this);

        }
        if(this.screenIndex == 3){
          this.add.tween(this.intro).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, true);
          let tweenOut = this.add.tween(this.text).to({alpha: 0}, 3000, Phaser.Easing.Linear.None, true, true);
          tweenOut.onComplete.add(() => {
              this.state.start('GameParallax');
          });
        }
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    this.line = this.content[this.lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

    //  Advance to the next line
    this.lineIndex++;

},
nextWord: function() {

    //  Add the next word onto the text string, followed by a space
    this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");

    //  Advance the word index to the next word in the line
    this.wordIndex++;

    //  Last word?
    if (this.wordIndex === this.line.length)
    {
        //  Add a carriage return
        this.text.text = this.text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        this.game.time.events.add(this.lineDelay, this.nextLine, this);
    }
}


};
