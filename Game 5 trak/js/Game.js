"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var player;
let spike;
let timer = 0;
let delay = 0;
let total = 0;
let dels = 0;
let diff = 200;
let dead = false;
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
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        music.stop();
        //player.destroy();

      // for(let i = 0; i<spikeArray.length;i++){
       //     spikeArray[i].destroy();
       // }
        spikeArray = [];
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
        
        

    }
    function newSpike(){
    spike = game.add.sprite(game.world.randomX, 0, 'spike');
    game.physics.enable(spike, Phaser.Physics.ARCADE);
    spike.checkWorldBounds = true;
    //spike.enableBody = true;
    spike.body.velocity.y = 50;
    spikeArray.push(spike);
    total++;
    timer = game.time.now + diff;
}

function kilt(obj1, obj2){
    dead = true;
    player.kill();
    spike.kill();
    var text = game.add.text( game.world.centerX, 150, "ICED", style );
    text.anchor.setTo( 0.5, 0.0 );
    music.fadeOut(1500);
    delay = game.time.now + 3000;
    
}

function del(obj1, obj2){
    let i = obj2;
    spikeArray.splice(i, 1);
    dels++;
   // spike.kill();
}
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
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
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            if(game.time.now > delay && dead){
                quitGame();
            }
            if(dels >= 400){
        var text = game.add.text( game.world.centerX, 150, "SUCCESS", style2 );
        text.anchor.setTo( 0.5, 0.0 );
        player.kill();
        dead = true;
        music.fadeOut(1500);
        delay = game.time.now + 3000;
    }
    // game.physics.arcade.collide(player, layer);
    let i = 0;
    for(i = 0;i<spikeArray.length;i++){
        spikeArray[i].events.onOutOfBounds.add(del, this, i);
        game.physics.arcade.overlap(player, spikeArray[i], kilt, null, this);
    }

    if(game.time.now > timer && total < 400 && !dead){
        if(total === 50){
            diff -= 25;
        }
        else if(total === 125){
            diff -= 30;
        }
        else if(total === 250){
            diff -= 30;
        }
        else if(total === 375){
            diff -= 35;
        }
       newSpike();
    }

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        if(speed >= -200){
        speed -= 7;
        }

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
       if(speed <= 200){
           speed += 7; 
       }

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
    };
};
