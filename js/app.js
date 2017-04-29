window.onload = function()
{
    // game variable
    CookieNoir.phasergame = new Phaser.Game(CookieNoir.SCREEN_WIDTH, CookieNoir.SCREEN_HEIGHT);

    // add states
    CookieNoir.phasergame.state.add('Boot', CookieNoir.Boot);
    CookieNoir.phasergame.state.add('Load', CookieNoir.Load);
    CookieNoir.phasergame.state.add('Title', CookieNoir.Title);
    CookieNoir.phasergame.state.add('Game2d', CookieNoir.Game2d);
    CookieNoir.phasergame.state.add('GameParallax', CookieNoir.GameParallax);
    CookieNoir.phasergame.state.add('Credit', CookieNoir.Credit);


    // start Title state
    CookieNoir.phasergame.state.start('Boot');
};
