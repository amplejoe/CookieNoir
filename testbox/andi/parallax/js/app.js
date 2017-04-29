window.onload = function()
{
    // game variable
    Tutorial.phasergame = new Phaser.Game(Tutorial.SCREEN_WIDTH, Tutorial.SCREEN_HEIGHT);

    // add states
    Tutorial.phasergame.state.add('Boot', Tutorial.Boot);
    Tutorial.phasergame.state.add('Load', Tutorial.Load);
    Tutorial.phasergame.state.add('Title', Tutorial.Title);
    Tutorial.phasergame.state.add('Game', Tutorial.Game);

    // start Title state
    Tutorial.phasergame.state.start('Boot');
};
