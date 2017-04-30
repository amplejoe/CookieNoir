
CookieNoir.GameParallax = function (game)
{
  /* members */
  this.bgTile0;
  this.bgTile1;

  this.platform0;
  this.platform1;

  // buttons
  this.cursors;

  this.currentLayer;

  this.observerClient;

  // show direction arrows
  this.directionIndicator;

  // ID or Key of the current platform & JSON object
  this.platformKey;
  this.platformJSON;

  this.playerPos;
  this.width;
};

CookieNoir.GameParallax.prototype =
{
  create: function ()
  {
    this.platformKey = "pf_0_1";
    this.platformJSON = CookieNoir.level1[this.platformKey];
    this.playerPos = this.world.width / 2;

    // observer communication
    // INFO: need to start server first via startserver.sh
    this.observerClient = new CookieNoir.Client(
      CookieNoir.SERVER_ADDRESS, CookieNoir.SERVER_PORT, CookieNoir.CLIENT_TYPE.PLAYER);
    this.observerClient.connect();

    // groups
    this.background = this.game.add.group();
    this.middle = this.game.add.group();
    this.foreground = this.game.add.group();
    this.background.add(this.add.tileSprite(0,0, this.world.width, this.game.cache.getImage('bg_z-3').height, 'bg_z-3'));

    // background
    this.width = this.game.cache.getImage(this.platformKey).width;
    // this.bgTile0 = this.add.tileSprite(this.world.centerX, this.world.height, this.world.width, this.game.cache.getImage(this.platformKey).height, this.platformKey);
    this.bgTile0 = this.make.sprite(this.world.centerX, this.world.height, this.platformKey);
    this.bgTile0.scale.setTo(0.6,0.6);
    this.bgTile0.anchor.setTo(0.5,1.0);
    this.bgTile0.position.y -= 200;
    this.background.add(this.bgTile0);

    // this.bgTile1 = this.add.tileSprite(0, 0,this.world.width, this.game.cache.getImage('bg_z-2').height, 'bg_z-2');
    // this.background.add(this.bgTile1);
    this.platform1 = this.make.sprite(this.world.centerX, this.world.height, 'layer1');
    this.platform1.scale.setTo(0.8, 0.8);
    this.platform1.anchor.setTo(0.5,1.0);
    this.platform1.position.y -= 100;
    this.middle.add(this.platform1);

    // active platforms
    this.platform0 = this.make.sprite(this.world.centerX, this.world.height, 'layer0');
    this.platform0.anchor.setTo(0.5,1.0);
    this.platform0.position.y -= 0;
    this.currentLayer = this.platform0;
    this.foreground.add(this.platform0);

    // buttons
    this.keys = this.input.keyboard.addKeys(
    {
      switchDown: Phaser.KeyCode.G,
      switchUp: Phaser.KeyCode.T
    });
    this.keys.switchDown.onDown.add(() => {
      this.switchPlane(false);
    }, this);

    this.keys.switchUp.onDown.add(() => {
      this.switchPlane(true);
    }, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    // text for direction indication
    // calculation for directionIndicator
    for (let c in this.platformJSON.connections) {
      let con = this.platformJSON.connections[c];
      if (con.pfkey.split("_")[1] > this.platformKey.split("_")[1]) {
        this.setDirectionArrow(CookieNoir.DirectionIcons.up, this.width * con.posX);
      } else {
        this.setDirectionArrow(CookieNoir.DirectionIcons.down, this.width * con.posX);
      }
    }

  },
  update: function ()
  {

    this.movePlayer();

  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Player Game.", 5, 32);
  },
  setDirectionArrow: function(direction, pos)
  {

    let text = this.add.text(this.world.width / 2, 32,
    direction,
    {
      fill: "#ffffff",
      align: "center",
      font: '40px Font Awesome'
    });
    text.anchor.setTo(0.5,0.0);
    let alphaTween = this.game.add.tween(text).to( { alpha: 0.1  }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.directionIndicator = {text: text, tween: alphaTween};
  },

  movePlayer: function()
  {
    let upperBound = this.platform0.width;
    let lowerbound = 0;

    // movement
    if (this.cursors.right.isDown) {
      this.foreground.forEach((item) => {

        let newItemPos = item.position.x - 6;
        if ((Math.abs(newItemPos) + this.world.width) <= upperBound) {
          item.position.x = newItemPos;
          this.middle.forEach(function(item) {
            item.position.x -= 5;
          });
          this.bgTile0.position.x -= 4;
          this.playerPos += 4;
          // this.bgTile1.tilePosition.x -= 5;
        }
      });
    }
    else if (this.cursors.left.isDown) {

        this.foreground.forEach((item) => {

          let newItemPos = item.position.x + 6;
          if (newItemPos <= lowerbound) {
            item.position.x += 6;
            this.middle.forEach(function(item) {
              item.position.x += 5;
            });
            this.bgTile0.position.x += 4;
            this.playerPos -= 4;
            // this.bgTile1.tilePosition.x += 5;
          }
        });
    }
  },
  switchPlane: function(up){
    if(up){
      //this.foreground.add(this.platform1);
      //this.middle.remove(this.platform1);
      //TODO add new from JSON
      //this.middle.add();

      //TODO check ob wir beim letzten "parallax layer" angekommen sind
      for (let c in this.platformJSON.connections) {
        let con = this.platformJSON.connections[c];
        let posX = con.posX;
        let relpos = this.playerPos / this.width;
        if (posX > relpos - 0.1 && posX < relpos + 0.1 && con.pfkey.split("_")[1] > this.platformKey.split("_")[1]) {
          this.platformKey = con.pfkey;
          this.platformJSON = CookieNoir.level1[this.platformKey];
          this.playerPos = this.game.cache.getImage(this.platformKey).width / 2;
          this.width = this.game.cache.getImage(this.platformKey).width;
          // this.bgTile0.loadTexture(this.platformKey);

          this.fadePlane(this.platform1, this.bgTile0);
          this.fadePlane(this.platform0, this.platform1);
          this.fadePlaneInTop(this.background, this.platformKey);
          // load new background image
          // setTimeout(() => {
          //   this.bgTile0 = this.make.sprite(this.world.centerX, this.world.height, this.platformKey);
          //   this.bgTile0.scale.setTo(0.6,0.6);
          //   this.bgTile0.anchor.setTo(0.5,1.0);
          //   this.bgTile0.position.y -= 200;
          //   this.background.add(this.bgTile0);
          // }, 1100);


          break;
        }
      }

    } else if(!up){
    // } else if(!up && currentLayer > 0){

        //TODO check ob wir beim ersten "parallax layer" angekommen sind
        for (let c in this.platformJSON.connections) {
          let con = this.platformJSON.connections[c];
          let posX = con.posX;
          let relpos = this.playerPos / this.width;
          if (posX > relpos - 0.1 && posX < relpos + 0.1 && con.pfkey.split("_")[1] < this.platformKey.split("_")[1]) {
            this.platformKey = con.pfkey;
            this.platformJSON = CookieNoir.level1[this.platformKey];
            this.playerPos = this.world.width / 2;
            this.width = this.game.cache.getImage(this.platformKey).width;
            this.bgTile0.loadTexture(this.platformKey);
            break;
          }
        }

    }
  },
  fadePlaneInTop: function(g, key) {
    let newBg = this.make.sprite(this.world.centerX, this.world.height, key);
    newBg.scale.setTo(0.6,0.6);
    newBg.anchor.setTo(0.5,1.0);
    newBg.position.y -= 200;
    newBg.alpha = 0;
    g.add(newBg);
    let tweenIn = this.add.tween(newBg).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, true);
    tweenIn.onComplete.add(() => {

      this.bgTile0 = newBg;
    }, this);

  },
  fadePlane: function(out, down) {
    // create new movement tween {properties}, duration, easing function, autostart, delay, repeat_number, yoyo (play back and forth)
    let scale = out.scale;
    let posY = out.position.y;


    let tweenDown = this.add.tween(down).to({ y: posY }, 1000, Phaser.Easing.Linear.None, true);
    this.add.tween(down.scale).to(scale, 1000, Phaser.Easing.Linear.None, true);
    tweenDown.onComplete.add(() => {
      down.parent.remove(down);
      out.parent.add(down);
    }, this);

    // change group

    if (out == this.currentLayer) {
      this.currentLayer = down;
      this.add.tween(out).to({ y: this.world.height}, 2000, Phaser.Easing.Linear.None, true);
      let tweenOut = this.add.tween(out).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, true);
      tweenOut.onComplete.add(() => {
        // this.foreground.add(down);
        // this.middle.remove(down);
        //TODO add new from JSON
        //this.middle.add();
        out.parent.remove(out);
        out.destroy();
      }, this);
    }

    //  else {
    //    this.add.tween(out).to({y: out.position.y + 100}, 1500, Phaser.Easing.Linear.None, true);
    //    this.add.tween(down.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Linear.None, true);
    //  }

    // scaleX: 1, scaleY: 1
  }
};
