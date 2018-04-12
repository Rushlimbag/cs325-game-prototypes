"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var player;
let map = null;
let below = null;
let music = null;
let floor = null;
let objs = null;
let walls = null;
let cursors = null;
let exits = null;
let belowFloor = null;
let belowWalls = null;
let posX = 0;
let posY = 0;
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
    music = game.add.audio('aero');
    music.play();
    music.volume = 0.01;

    map = game.add.tilemap('top-floor');
    below = game.add.tilemap('99-floor');
    map.addTilesetImage('tiles', 'tiles');
    below.addTilesetImage('tiles','tiles');
    floor = map.createLayer('floor');
    walls = map.createLayer('walls');
    belowFloor = below.createLayer('floor');
    belowWalls = below.createLayer('walls');
    belowFloor.fixedToCamera = false;
    belowWalls.fixedToCamera = false;
    belowFloor.scrollFactorX = 0;
    belowFloor.scrollFactorY = 0;
    belowWalls.scrollFactorX = 0;
    belowWalls.scrollFactorY = 0;
    belowFloor.alpha = 0;
    belowWalls.alpha = 0.25;
   // belowFloor.tint = 0xf47142;
    belowWalls.tint = 0xf47142;
    map.setCollisionBetween(1, 730, true, 'walls');
    floor.resizeWorld();
    this.createExits();
    let result = this.findObjectsByType('playerStart', map, 'objs');
    player = game.add.sprite(result[0].x, result[0].y, 'player');
    game.physics.arcade.enable(player);
    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();

        },
    findObjectsByType: function(type, map, layer){
        let result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type){
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    createFromTiledObject: function(element, group){
        let sprite = group.create(element.x, element.y, element.properties.sprite);
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },
    createExits: function(){
        exits = game.add.group();
        exits.enableBody = true;
        let result = this.findObjectsByType('exit', map, 'objs');
        result.forEach(function(element){
            this.createFromTiledObject(element, exits);
        }, this);
    },
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            game.physics.arcade.collide(player, walls);
            game.physics.arcade.overlap(player, exits, this.exitFloor, null, this);
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
            if(cursors.up.isDown){
                player.body.velocity.y -=90;
                //belowFloor.position.set(posX++, posY);
                belowWalls.position.set(posX+=0.3, posY);
                belowFloor.position.set(posX+=0.3, posY);
            }
            else if(cursors.down.isDown){
                player.body.velocity.y += 90;
                belowWalls.position.set(posX-=0.3, posY);
                belowFloor.position.set(posX-=0.3, posY);
            }
            if(cursors.left.isDown){
                player.body.velocity.x -= 90;
                belowWalls.position.set(posX, posY+=0.3);
                belowFloor.position.set(posX, posY+=0.3);
            }
            else if(cursors.right.isDown){
                player.body.velocity.x += 90;
                belowWalls.position.set(posX, posY-=0.3);
                belowFloor.position.set(posX, posY-=0.3);
            }
         
        },
        exitFloor: function(player, exit){
            console.log('entered a vent! diving to '+exit.targetTilemap+' at coordinates('+exit.targetX+', '+exit.targetY+')');
            //game.paused = true;
            map.setCollisionBetween(1, 730, false, 'walls');
            floor.alpha = 0;
            walls.alpha=0;
            belowFloor.alpha = 1;
            belowWalls.alpha = 1;
            belowWalls.tint = 0xFFFFFF;
            below.setCollisionBetween(1,730,true,'walls');
           // game.paused = false;
        }
    };
};
