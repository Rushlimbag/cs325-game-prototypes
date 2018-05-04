"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
let map = null;
let tilesize = 100;
let currentTileX = null;
let currentTileY = null;
let redcap = false;
let redcapX = null;
let redcapY = null;
let bluecap = false;
let bluecapX = null;
let bluecapY = null;
let redturn = true;
let blueturn = false;
let deadrk = false;
let deadrq = false;
let deadbk = false;
let deadbq = false;
let rcmddead = 0;
let bcmddead = 0;
let redCount = 0;
let blueCount = 0;
let k = null;
let q = null;
let c = null;
let a = null;
let style1 = { font: "40px Impact", fill: "#FF0000", align: "center" };
let style2 = { font: "40px Impact", fill: "#0000FF", align: "center" };
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
        //hotkeys for moving kings (k), queens (q), commanders (c), and assassins (a)
        k = game.input.keyboard.addKey(Phaser.Keyboard.K);
        q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        c = game.input.keyboard.addKey(Phaser.Keyboard.C);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        game.input.onDown.add(unpause, self);
        function unpause(event){
                if(game.paused){
                        game.paused = false;
                }
        };
        },
        placeCapital: function(team, tileX, tileY){
          if(team === 'red'){
            if(tileY === 1){
                board[tileY][tileX] = 1;
                redcapX = tileX-1;
                redcapY = tileY-1;
                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redcapital');
                let rk = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redking');
                let rq = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redqueen');
                let rc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redcmd');
                let ra = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redassn');
                party[tileY-1][tileX-1].push(rk);
                party[tileY-1][tileX-1].push(rq);
                party[tileY-1][tileX-1].push(rc);
                party[tileY-1][tileX-1].push(ra);
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
                bluecapX = tileX-1;
                bluecapY = tileY-1;
                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluecapital');
                let bk = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueking');
                let bq = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluequeen');
                let bc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluecmd');
                let ba = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueassn');
                party[tileY-1][tileX-1].push(bk);
                party[tileY-1][tileX-1].push(bq);
                party[tileY-1][tileX-1].push(bc);
                party[tileY-1][tileX-1].push(ba);
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
                    console.log('Must claim/enter territory adjacent to already owned red territories!');
                    return false;
                }
            }
            else{
                if(neigh.includes(3) || neigh.includes(4)){
                    return true;
                }
                else{
                    console.log('Must claim/enter territory adjacent to already owned blue territories!');
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
        findAndDelete: function(item){
                for(let i=0;i<9;i++){
                        for(let y=0;y<9;y++){
                                for(let x=0;x<4;x++){
                                        if(party[i][y][x] != null){
                                                if(party[i][y][x].key === item){
                                                   party[i][y][x].destroy();
                                                   party[i][y].splice(x,1);
                                                   //console.log(party);
                                                     return true;
                                           }
                                        }
                                }
                        }
                }
                return false;
        },
        attackViable: function(team, tileX, tileY){
                //find position of cmd, unused for now (would check to make sure cmds are on the front before invading enemy territories)
                /* for(let i=0;i<9;i++){
                        for(let y=0;y<9;y++){
                                for(let x=0;x<4;x++){
                                        if(party[i][y][x] != null){
                                                if(party[i][y][x].key === 'redcmd'){
                                                        let rcmdposX = y;
                                                        let rcmdposY = i; 
                                                }
                                                else if(party[i][y][x].key === 'bluecmd' ){
                                                        let bcmdposX = y;
                                                        let bcmdposY = i;
                                                }
                                        }
                                }
                        }
                }*/
        },
        moveKing: function(team, tileX, tileY){
             let tile = board[tileY][tileX];
             if(team === 'red'){
                if(tile === 1 || tile === 2){
                        let rk = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redking');
                        this.findAndDelete('redking');
                        party[tileY-1][tileX-1].push(rk);
                        redturn = false;
                        blueturn = true;
                }
                else{
                        console.log('Must move king within claimed territories!');
                }
             }   
             else{
                if(tile === 3 || tile === 4){
                        let bk = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueking');
                        this.findAndDelete('blueking');
                        party[tileY-1][tileX-1].push(bk);
                        redturn = true;
                        blueturn = false;
                }
                else{
                        console.log('Must move king within claimed territories!');
                }
             }
        },
        moveQueen: function(team, tileX, tileY){
                let tile = board[tileY][tileX];
             if(team === 'red'){
                if(tile === 1 || tile === 2){
                        let rq = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redqueen');
                        this.findAndDelete('redqueen');
                        party[tileY-1][tileX-1].push(rq);
                        redturn = false;
                        blueturn = true;
                }
                else{
                        console.log('Must move queen within claimed territories!');
                }
             }   
             else{
                if(tile === 3 || tile === 4){
                        let bq = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluequeen');
                        this.findAndDelete('bluequeen');
                        party[tileY-1][tileX-1].push(bq);
                        redturn = true;
                        blueturn = false;
                }
                else{
                        console.log('Must move queen within claimed territories!');
                }
             }
        },
        moveCmd: function(team, tileX, tileY){
                   let tile = board[tileY][tileX];
                   let atk = this.checkAdjacency(team, tileX, tileY);
             if(team === 'red'){
                if(tile === 1 || tile === 2){
                        let rc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redcmd');
                        this.findAndDelete('redcmd');
                        party[tileY-1][tileX-1].push(rc);
                        redturn = false;
                        blueturn = true;
                }
                //atttack blue territory
                else if(atk && tile === 4){
                        console.log('red is attacking blue');
                        let rroll = game.rnd.integerInRange(1,8);
                        let broll = game.rnd.integerInRange(1,6);
                        broll += party[tileY-1][tileX-1].length;
                        console.log('red roll: ' + rroll);
                        console.log('blue roll: ' + broll);
                        this.findAndDelete('redcmd');
                        if(rroll > broll){
                                let rc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redcmd');
                                board[tileY][tileX] = 2;
                                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redflag');
                                for(let i=0;i<4;i++){
                                        if(party[tileY-1][tileX-1][i] != null){
                                                if(party[tileY-1][tileX-1][i].key === 'blueking'){
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i];
                                                        deadrk = true;
                                                }
                                                else if(party[tileY-1][tileX-1][i].key === 'bluequeen'){
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i];
                                                        deadrq = true;
                                                }
                                                else{
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i];
                                                }
                                        }
                                }
                                if(deadrk && deadrq){
                                        var text = game.add.text( game.world.centerX, 400, "RED VICTORY! BLUE KING AND QUEEN ARE DEAD!", style1 );
                                        text.anchor.setTo( 0.5, 0.0 );
                                        game.gamePaused();
                                }
                                console.log('Successful attack! Land claimed for RED!');
                                party[tileY-1][tileX-1].push(rc);
                        }
                        else{
                                if(rroll > 1){
                                        let rc = game.add.sprite(redcapX*100, redcapY*100, 'redcmd');
                                        party[redcapY][redcapX].push(rc);
                                        console.log('Failed attack! RED commander returns to the capital!')
                                }else{
                                        console.log('Failed attack! RED commander has been slain! A new commander will be elected in 3 turns!')
                                        rcmddead = 3;
                                }
                        }
                        redturn = false;
                        blueturn = true;
                }
                else{
                        console.log('Must move within claimed territories!');
                }
             }   
             else{
                if(tile === 3 || tile === 4){
                        let bc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluecmd');
                        this.findAndDelete('bluecmd');
                        party[tileY-1][tileX-1].push(bc);
                        redturn = true;
                        blueturn = false;
                }
                 //atttack red territory
                else if(atk && tile === 2){
                        console.log('blue is attacking red');
                        let rroll = game.rnd.integerInRange(1,6);
                        let broll = game.rnd.integerInRange(1,8);
                        rroll += party[tileY-1][tileX-1].length;
                        console.log('red roll: ' + rroll);
                        console.log('blue roll: ' + broll);
                        this.findAndDelete('bluecmd');
                        if(broll > rroll){
                                let bc = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'bluecmd');
                                board[tileY][tileX] = 4;
                                game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueflag');
                                for(let i=0;i<4;i++){
                                        if(party[tileY-1][tileX-1][i] != null){
                                                if(party[tileY-1][tileX-1][i].key === 'redking'){
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i]
                                                        deadbk = true;
                                                }
                                                else if(party[tileY-1][tileX-1][i].key === 'redqueen'){
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i];
                                                        deadbq = true;
                                                }
                                                else{
                                                        party[tileY-1][tileX-1][i].destroy();
                                                        delete party[tileY-1][tileX-1][i];
                                                }
                                        }
                                }
                                if(deadbk && deadbq){
                                        var text = game.add.text( game.world.centerX, 400, "BLUE VICTORY! RED KING AND QUEEN ARE DEAD!", style2 );
                                        text.anchor.setTo( 0.5, 0.0 );
                                        game.gamePaused();
                                }
                                console.log('Successful attack! Land claimed for BLUE!');
                                party[tileY-1][tileX-1].push(bc);
                        }
                        else{
                                if(broll > 1){
                                        let bc = game.add.sprite(bluecapX*100, bluecapY*100, 'bluecmd');
                                        party[bluecapY][bluecapX].push(bc);
                                        console.log('Failed attack! BLUE commander returns to the capital!')
                                }
                                else{
                                        bcmddead = 3;
                                        console.log('Failed attack! BLUE commander has been slain! A new commander will be elected in 3 turns!')
                                }
                        }
                        redturn = true;
                        blueturn = false;
                }
                else{
                        console.log('Must move within claimed territories!');
                }
             }
        },
        moveAssn: function(team, tileX, tileY){
                  let tile = board[tileY][tileX];
             if(team === 'red'){
                if(tile === 1 || tile === 2){
                        let ra = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'redassn');
                        this.findAndDelete('redassn');
                        party[tileY-1][tileX-1].push(ra);
                        redturn = false;
                        blueturn = true;
                }
                else{
                        console.log('Must move queen within claimed territories!');
                }
             }   
             else{
                if(tile === 3 || tile === 4){
                        let ba = game.add.sprite((tileX-1)*100, (tileY-1)*100, 'blueassn');
                        this.findAndDelete('blueassn');
                        party[tileY-1][tileX-1].push(ba);
                        redturn = true;
                        blueturn = false;
                }
                else{
                        console.log('Must move queen within claimed territories!');
                }
             } 
        },
        processClick: function(){
                 //console.log(bcmddead);
            currentTileX = Math.floor(game.input.mousePointer.x/100) + 1;
            currentTileY = Math.floor(game.input.mousePointer.y/100) + 1;
            if(game.input.mousePointer.isDown){
               // console.log(currentTileX, currentTileY);
               if(redturn && rcmddead > 1){
                       rcmddead--;
               }
               else if(blueturn && bcmddead > 1){
                       bcmddead--;
                      
               }
               else if(redturn && rcmddead === 1){
                        rcmddead--;
                        let rc = game.add.sprite(redcapX*100, redcapY*100, 'redcmd');
                        party[redcapY][redcapX].push(rc);
               }
               else if(blueturn && bcmddead === 1){
                       bcmddead--;
                       let bc = game.add.sprite(bluecapX*100, bluecapY*100, 'bluecmd');
                       party[bluecapY][bluecapX].push(bc);
               }
                if(redcap === false && redturn){
                    this.placeCapital('red', currentTileX, currentTileY);
                }
                else if(bluecap === false && blueturn){
                    this.placeCapital('blue', currentTileX, currentTileY);
                }
                else if(redturn && k.isDown){
                    this.moveKing('red', currentTileX, currentTileY);
                }
                else if(redturn && q.isDown){
                    this.moveQueen('red', currentTileX, currentTileY);
                }
                else if(redturn && c.isDown){
                        this.moveCmd('red', currentTileX, currentTileY);
                }
                else if(redturn && a.isDown){
                        this.moveAssn('red', currentTileX, currentTileY);
                }
                else if(blueturn && k.isDown){
                        this.moveKing('blue', currentTileX, currentTileY);
                }
                else if(blueturn && q.isDown){
                        this.moveQueen('blue', currentTileX, currentTileY);
                }
                else if(blueturn && c.isDown){
                        this.moveCmd('blue', currentTileX, currentTileY);
                }
                else if(blueturn && a.isDown){
                        this.moveAssn('blue', currentTileX, currentTileY);
                }
                else if(redturn){
                    this.claimTerritory('red', currentTileX, currentTileY);
                }
                else if(blueturn){
                    this.claimTerritory('blue', currentTileX, currentTileY);
                }
                game.paused = true;
            }

        },
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
           this.processClick();
         
        }
    };
};
