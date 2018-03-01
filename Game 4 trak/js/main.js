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
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ice-physics', { preload: preload, create: create, update: update, newSpike:newSpike, kilt:kilt });

function preload() {
    game.load.audio('music', ['assets/Ice.mp3']);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/ice-back.jpg');
    game.load.image('spike', 'assets/spike.png', 32, 32);

}

var player;
let spike;
let timer = 0;
let total = 0;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
let speed = 0;
let style = { font: "200px Impact", fill: "#FF0000", align: "center" };
let style2 = { font: "200px Impact", fill: "#00FF00", align: "center" };
let spikeArray = [];
let music = null;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    music = game.add.audio('music');
    music.play();
    music.volume = 0.01;

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    game.physics.arcade.gravity.y = 300;

    player = game.add.sprite(32, 320, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    newSpike();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

    if(total >= 200){
        var text = game.add.text( game.world.centerX, 150, "SUCCESS", style2 );
        text.anchor.setTo( 0.5, 0.0 );
        game.gamePaused();
    }
    // game.physics.arcade.collide(player, layer);
    let i = 0;
    for(i = 0;i<spikeArray.length;i++){
        game.physics.arcade.overlap(player, spikeArray[i], kilt, null, this);
    }

    if(game.time.now > timer && total < 200){
       newSpike();
    }

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        speed = -200;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
       
       speed = 200; 

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (speed > 0)
        {
            speed -= 3;
        }
        else if(speed < 0){
            speed += 3;
        }
       
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    player.body.velocity.x = speed;
    
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -500;
        jumpTimer = game.time.now + 750;
    }


}

function newSpike(){
    spike = game.add.sprite(game.world.randomX, 0, 'spike');
    game.physics.enable(spike, Phaser.Physics.ARCADE);
    //spike.enableBody = true;
    spike.body.velocity.y = 50;
    spikeArray.push(spike);
    total++;
    timer = game.time.now + 150;
}

function kilt(obj1, obj2){
    //player.destroy();
    //spike.destroy();
    var text = game.add.text( game.world.centerX, 150, "ICED", style );
    text.anchor.setTo( 0.5, 0.0 );
    game.gamePaused();
}
};
