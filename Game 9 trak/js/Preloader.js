"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            //	+ lots of other required assets here
            //game.load.image( 'logo', 'assets/phaser.png' );
			game.load.image('field', 'assets/field.png');
			game.load.image('grass', 'assets/grass.png');
			game.load.image('redcapital', 'assets/redcapital.png');
			game.load.image('bluecapital','assets/bluecapital.png');
			game.load.image('blueflag','assets/blueflag.png');
			game.load.image('redflag','assets/redflag.png');
			game.load.image('redking', 'assets/redking.png');
			game.load.image('blueking', 'assets/blueking.png');
			game.load.image('bluequeen', 'assets/bluequeen.png');
			game.load.image('redqueen', 'assets/redqueen.png');
			game.load.image('bluecmd', 'assets/bluecmd.png');
			game.load.image('redcmd', 'assets/redcmd.png');
			game.load.image('blueassn', 'assets/blueassn.png');
			game.load.image('redassn', 'assets/redassn.png');

        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (ready == false)
            {
                ready = true;
                game.state.start('Game');
            }
    
        }
    
    };
};
