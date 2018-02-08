"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, onTap: onTap } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'wall', 'assets/cave_wall.jpg' );
        game.load.image( 'cave', 'assets/crystal_cave.jpg' );
        game.load.audio('sfx', 'assets/pickaxe_sfx.wav');
        game.load.audio('fall', 'assets/rockfall.mp3');
    }
    
    var fx;
    let x = 0;
    var fall;
    var style = { font: "50px Impact", fill: "#FF0000", align: "center" };
    
    function create() {
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var text = game.add.text( game.world.centerX, 15, "!!!BREAK THROUGH!!!", style );
        text.anchor.setTo( 0.5, 0.0 );

        game.add.image(0, 0, 'wall');

        //read mouse input
       game.input.onTap.add(onTap, this);
        
        //creating sound markers
        fx = game.add.audio('sfx');
        fall = game.add.audio('fall');
        fx.allowMultiple = true;
        fx.addMarker('hit1', 1, 1.0);
       /* fx.addMarker('hit2', 2, 1.0);
        fx.addMarker('hit3', 3, 1.0);
        fx.addMarker('hit4', 4, 1.0);
        fx.addMarker('hit5', 5, 1.0);
        fx.addMarker('hit6', 6, 1.0);*/

    }
    
  function onTap(pointer, doubleTap) {
     if(x<7){
         fx.play("hit1");
         x++;
     }
     else{
         fall.play();
         game.add.image(0,0,'cave');
         var text = game.add.text( game.world.centerX, 15, "!!!BIG BREAK!!!", style );
     }
   }

};
