
CookieNoir.GameParallax = function (game)
{
  /* members */
  this.bgTile0;
  this.bgTile1;

  this.layer0;
  this.layer1;
  this.layer2;
  this.layer3;
  this.layer4;
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
    this.currentLayer = 0;
    this.hidden = this.game.add.group();
    this.background = this.game.add.group();
    this.middle2 = this.game.add.group();
    this.middle1 = this.game.add.group();
    this.foreground = this.game.add.group();

    // bg far
    this.bgTile0 = this.add.tileSprite(0, 0, this.world.width, this.game.cache.getImage('bg_z-3').height, 'bg_z-3');
    // bg near
    this.bgTile1 = this.add.tileSprite(0, 0,this.world.width, this.game.cache.getImage('bg_z-2').height, 'bg_z-2');

    this.background.add(this.bgTile0);
    this.background.add(this.bgTile1);

    this.layer0 = this.add.sprite(0, 0, 'layer0');
    this.layer1 = this.add.sprite(0, 100, 'layer1');
    //this.layer1 = this.add.sprite(0, 100,this.world.width, this.game.cache.getImage('layer1').height, 'layer1');
    //this.layer2 = this.add.tileSprite(0, 160,this.world.width, this.game.cache.getImage('layer2').height, 'layer2');
    //this.layer3 = this.add.tileSprite(0, 160,this.world.width, this.game.cache.getImage('layer3').height, 'layer3');
    //this.layer4 = this.add.tileSprite(0, 160,this.world.width, this.game.cache.getImage('layer4').height, 'layer4');
    this.world.setBounds(0, 0, this.layer1.width, 600);

    this.layer1.scale.setTo(0.7, 0.7);
    //this.layer2.tileScale.setTo(0.5, 0.5);

    this.layerArray = [];
    this.layerArray.push(this.layer0);
    this.layerArray.push(this.layer1);
    //this.layerArray.push(this.layer2);
    //this.layerArray.push(this.layer3);
    //this.layerArray.push(this.layer4);

    this.foreground.add(this.layer0);
    this.middle1.add(this.layer1);
    //this.middle2.add(this.layer2);
    //this.hidden.add(this.layer3);
    //this.hidden.add(this.layer4);

    this.hidden.visible = false;
    // buttons
    this.keys = this.input.keyboard.addKeys(
    {
      switchDown: Phaser.KeyCode.G,
      switchUp: Phaser.KeyCode.T
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function ()
  {
    if (this.keys.switchDown.isDown)
    {
      this.switchPlane(true);
    }
    // movement
    if (this.cursors.right.isDown)
    {
          this.foreground.forEach(function(item){
            item.position.x -= 6;
            console.log(item.position.x);
          });
          this.middle1.forEach(function(item){
            item.position.x -= 6;
          });
          this.middle2.forEach(function(item){
            item.position.x -= 7;
          });
          this.hidden.forEach(function(item){
            item.position.x -= 5;
          });
          this.bgTile0.tilePosition.x -= 4;
          this.bgTile1.tilePosition.x -= 5;
        // this.player.body.velocity.x = -250;
    }
    else if (this.cursors.left.isDown)
    {

          this.foreground.forEach(function(item){
            item.position.x += 6;
          });
          this.middle1.forEach(function(item){
            item.position.x += 6;
          });
          this.middle2.forEach(function(item){
            item.position.x += 7;
          });
          this.hidden.forEach(function(item){
            item.position.x += 5;
          });
          this.bgTile0.tilePosition.x += 4;
          this.bgTile1.tilePosition.x += 5;
        // this.player.body.velocity.x = 250;
    }

  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Player Game.", 5, 32);
  },
  switchPlane: function(up){
    if(up){
      this.fadePlane();
      this.foreground.add(this.layerArray[this.currentLayer+1]);
      this.middle1.remove(this.layerArray[this.currentLayer+1]);
      this.middle1.add(this.layerArray[this.currentLayer+2]);
      this.middle2.remove(this.layerArray[this.currentLayer+2]);
      this.middle2.add(this.layerArray[this.currentLayer+3]);
      this.hidden.remove(this.layerArray[this.currentLayer+3]);
    } else if(!up && currentLayer > 0){

    }
  },
  fadePlane: function(){
    this.add.tween(this.layerArray[this.currentLayer]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, true);
    this.add.tween(this.layerArray[this.currentLayer+1]).to({scaleX: 1, scaleY: 1}, 2000, Phaser.Easing.Linear.None, true);
    this.add.tween(this.layerArray[this.currentLayer+1]).to({y: 160}, 2000, Phaser.Easing.Linear.None, true);
    this.add.tween(this.layerArray[this.currentLayer+2]).to({scaleX: 0.7, scaleY: 0.7}, 2000, Phaser.Easing.Linear.None, true);
    this.add.tween(this.layerArray[this.currentLayer+2]).to({y: 00}, 2000, Phaser.Easing.Linear.None, true);
  }
};
