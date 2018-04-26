"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
let map = null;
let tilesize = 100;
let currentTileX = null;
let currentTileY = null;
let redcap = false;
let bluecap = false;
let redturn = true;
let blueturn = false;
let redCount = 0;
let blueCount = 0;
/*Board Key:
0 = empty
1 = redcap
2 = redterr
3 = bluecap
4 = blueterr
*/
let board = [[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99],
[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99]];
/*Party Key:
0 = empty
1 = redking
2 = redqueen
3 = redcmd
4 = redass
5 = blueking
6 = bluequeen
7 = bluecmd
8 = blueass
*/
let party = [[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []],
[[], [], [], [], [], [], [], [], []]];
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        map = game.add.sprite(0,0,'field');
        map.inputEnabled = true;
        },
        placeCapital: function(team, tileX, tileY){
          if(team === 'red'){
            if(tileY === 1){
                board[tileY][tileX] = 1;
                party[tileY-1][tileX-1].push(1);
                party[tileY-1][tileX-1].push(2);
                party[tileY-1][tileX-1].push(3);
                party[tileY-1][tileX-1].push(4);
                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redcapital');
                redcap = true;
                redturn = false;
                blueturn = true;
               // console.log(board);
               // console.log(party);
            }
            else{
                console.log('Must place red capital in top row!\n');
            }
          }
          else{
            if(tileY === 9){
                board[tileY][tileX] = 3;
                party[tileY-1][tileX-1].push(5);
                party[tileY-1][tileX-1].push(6);
                party[tileY-1][tileX-1].push(7);
                party[tileY-1][tileX-1].push(8);
                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluecapital');
                bluecap = true;
                redturn = true;
                blueturn = false;
               // console.log(board);
               // console.log(party);
            }
            else{
                console.log('Must place blue capital in bottom row!\n')
            }
          }  
        },
        checkAdjacency: function(team, tileX, tileY){
            let neigh = [];
            for(let i=tileX-1; i<tileX+2; i++){
                neigh.push(board[tileY-1][i]);
            }
            for(let j=tileX-1; j<tileX+2; j+=2){
                neigh.push(board[tileY][j]);
            }
            for(let s=tileX-1; s<tileX+2; s++){
                neigh.push(board[tileY+1][s]);
            }
            if(team === 'red'){
                if(neigh.includes(1) || neigh.includes(2)){
                    return true;
                }
                else{
                    console.log('Must claim territory adjacent to already owned red territories!');
                    return false;
                }
            }
            else{
                if(neigh.includes(3) || neigh.includes(4)){
                    return true;
                }
                else{
                    console.log('Must claim territory adjacent to already owned blue territories!');
                    return false;
                }
            }
        },
        claimTerritory: function(team, tileX, tileY){
            let tile = board[tileY][tileX];
          if(team === 'red'){
           if(tile === 0 && this.checkAdjacency(team, tileX, tileY)){
             board[tileY][tileX] = 2;
             game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redflag');
             redCount++;
             redturn = false;
             blueturn = true;
           }
          }
          else{
              if(tile === 0 && this.checkAdjacency(team, tileX, tileY)){
             board[tileY][tileX] = 4;
             game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueflag');
             blueCount++;
             redturn = true;
             blueturn = false;
           }
          }  
        },
        processClick: function(){
            currentTileX = Math.floor(game.input.mousePointer.x/100) + 1;
            currentTileY = Math.floor(game.input.mousePointer.y/100) + 1;
            if(game.input.mousePointer.isDown){
               // console.log(currentTileX, currentTileY);
                if(redcap === false && redturn){
                    this.placeCapital('red', currentTileX, currentTileY);
                }
                else if(bluecap === false && blueturn){
                    this.placeCapital('blue', currentTileX, currentTileY);
                }
                else if(redturn){
                    this.claimTerritory('red', currentTileX, currentTileY);
                }
                else if(blueturn){
                    this.claimTerritory('blue', currentTileX, currentTileY);
                }

            }

        },
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
           this.processClick();
         
        }
    };
};
