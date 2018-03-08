"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
	let style2 = { font: "50px Courier New", fill: "#ADD8E6", align: "center" };
	let delay = 0;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();
            music.loopFull(0.01);
    
            game.add.sprite(0, 0, 'titlePage');
            var text = game.add.text( game.world.centerX, 150, "BLACK ICE", style2 );
        	text.anchor.setTo( 0.5, 0.0 );
    
            playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
