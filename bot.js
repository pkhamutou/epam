
var gameBot;

function GameBot(name1){
    this.name1 = name1 || "Player #1";
    this.name2 = "Bot";
    this.isbot = true;
    this.turn = true; //game turn. true - cross, false - zero.
    this.state = [true, true, true, true, true, true, true, true, true]; //if cell was used set its value to false. This parameter is used to define                                                                              which cells were used.
    this.cross = [false, false, false, false, false, false, false, false, false]; //used to define winning composition for crosses.
    this.zero = [false, false, false, false, false, false, false, false, false]; //used to define winning composition for zeros.
    this.crossCount = 0; //counts crosses to deside when win-composition should be checked (when >=3).
    this.zeroCount = 0; //counts zeros to deside when win-composition should be checked (when >=3).
    this.block = false; //block gamefield when winner is defined. 
    this.canvasID = ["can1", "can2", "can3", "can4", "can5", "can6", "can7", "can8", "can9"]; //array of ids.
    this.red = false; //used to set red color to redraw win-composition.
    this.p1_score = 0; 
    this.p2_score = 0;

    console.log("Created gameBot!");
}

function getNamesBot(){
    var name1 = prompt("Hello, write your name!");
    if(name1 == "Bot")
        name1 = "YouCan'tHackMe";
    gameBot = new GameBot(name1);   
    //setting names
    document.getElementById("player1Name").innerHTML = gameBot.name1.substr(0, 14);
    document.getElementById("player2Name").innerHTML = gameBot.name2;
    document.getElementById("p1score").innerHTML = gameBot.p1_score;
    document.getElementById("p2score").innerHTML = gameBot.p2_score;
}

GameBot.prototype.drawFigure = function(canID){
    if(gameBot.turn == true){
        var c = document.getElementById(canID);
        var ctx = c.getContext("2d");
        ctx.moveTo(10, 10);
        ctx.lineTo(180, 180);
        ctx.stroke();
        ctx.moveTo(180, 10);
        ctx.lineTo(10, 180);
        ctx.lineWidth = 8;
        if(gameBot.red == true)
            ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }
    else{
        var c = document.getElementById(canID);
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,95,90,0,2*Math.PI);
        ctx.lineWidth = 7;
        if(gameBot.red == true)
            ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }
};

GameBot.prototype.changeStates = function(i){
    if(gameBot.turn == true){
        gameBot.cross[i] = true;
        gameBot.crossCount++;
    }
    else{
        gameBot.zero[i] = true;
        gameBot.zeroCount++;
    }
    gameBot.state[i] = false;
    
    if(gameBot.crossCount >= 3 || gameBot.zeroCount >= 3){
        var x = gameBot.checkWinner();
        var j = 0;
        for(var k = 0; k < gameBot.state.length; ++k){
            if(gameBot.state[k] == true)
                break;
            else{
                j++;                //check if we have all cells used but no winner.
                if(j == 9 && x == false){
                    alert("Dead Heat!");
                }
            }
        }//for
    }

    gameBot.changeTurn();
    gameBot.botTurn();
    
};

GameBot.prototype.changeTurn = function(){
    if(gameBot.block == false){
        if(gameBot.turn == true)
            gameBot.turn = false;
        else
            gameBot.turn = true;
    }
};

GameBot.prototype.botTurn = function(){
    if(gameBot.turn == false && gameBot.block == false){
        var tmp = [];
        var k = 0;
        for(var i = 0; i < gameBot.state.length; i++ ){ //i from 0 to 8
            if(gameBot.state[i] == true){
                tmp[k] = i;
                k++;
            }
        }

        var randcell = Math.floor((Math.random() * tmp.length) + 0);
        //here i should have added a delay. this way doesn't work.
        //setTimeout(gameBot.drawFigure(gameBot.canvasID[tmp[randcell]]), 3000);

        gameBot.drawFigure(gameBot.canvasID[tmp[randcell]]);
        gameBot.changeStates(tmp[randcell]);
      
    }

};

GameBot.prototype.setScore = function(){
    gameBot.block = true;
    if(gameBot.name1 == "Bot"){
        if(gameBot.turn == false){
            gameBot.p1_score++;
            document.getElementById("p1score").innerHTML = gameBot.p1_score;
        }
        else{
            gameBot.p2_score++;
            document.getElementById("p2score").innerHTML = gameBot.p2_score;
        }    
    }
    else{
        if(gameBot.turn == true){
            gameBot.p1_score++;
            document.getElementById("p1score").innerHTML = gameBot.p1_score;
        }
        else{
            gameBot.p2_score++;
            document.getElementById("p2score").innerHTML = gameBot.p2_score;
        }
    }
};

GameBot.prototype.checkWinner = function(){
    var sender = [];
    if(gameBot.turn == true){
        if(gameBot.cross[0] == true && gameBot.cross[4] == true && gameBot.cross[8] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[4], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[2] == true && gameBot.cross[4] == true && gameBot.cross[6] == true){
            sender = [gameBot.canvasID[2], gameBot.canvasID[4], gameBot.canvasID[6]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[0] == true && gameBot.cross[1] == true && gameBot.cross[2] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[1], gameBot.canvasID[2]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[3] == true && gameBot.cross[4] == true && gameBot.cross[5] == true){
            sender = [gameBot.canvasID[3], gameBot.canvasID[4], gameBot.canvasID[5]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[6] == true && gameBot.cross[7] == true && gameBot.cross[8] == true){
            sender = [gameBot.canvasID[6], gameBot.canvasID[7], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[0] == true && gameBot.cross[3] == true && gameBot.cross[6] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[3], gameBot.canvasID[6]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[1] == true && gameBot.cross[4] == true && gameBot.cross[7] == true){
            sender = [gameBot.canvasID[1], gameBot.canvasID[4], gameBot.canvasID[7]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.cross[2] == true && gameBot.cross[5] == true && gameBot.cross[8] == true){
            sender = [gameBot.canvasID[2], gameBot.canvasID[5], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
    }
    else{
        if(gameBot.zero[0] == true && gameBot.zero[4] == true && gameBot.zero[8] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[4], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[2] == true && gameBot.zero[4] == true && gameBot.zero[6] == true){
            sender = [gameBot.canvasID[2], gameBot.canvasID[4], gameBot.canvasID[6]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[0] == true && gameBot.zero[1] == true && gameBot.zero[2] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[1], gameBot.canvasID[2]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[3] == true && gameBot.zero[4] == true && gameBot.zero[5] == true){
            sender = [gameBot.canvasID[3], gameBot.canvasID[4], gameBot.canvasID[5]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[6] == true && gameBot.zero[7] == true && gameBot.zero[8] == true){
            sender = [gameBot.canvasID[6], gameBot.canvasID[7], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[0] == true && gameBot.zero[3] == true && gameBot.zero[6] == true){
            sender = [gameBot.canvasID[0], gameBot.canvasID[3], gameBot.canvasID[6]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[1] == true && gameBot.zero[4] == true && gameBot.zero[7] == true){
            sender = [gameBot.canvasID[1], gameBot.canvasID[4], gameBot.canvasID[7]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
        else if(gameBot.zero[2] == true && gameBot.zero[5] == true && gameBot.zero[8] == true){
            sender = [gameBot.canvasID[2], gameBot.canvasID[5], gameBot.canvasID[8]];
            gameBot.red = true;
            for(var i = 0; i < 3; i++)
                gameBot.drawFigure(sender[i]);
            gameBot.setScore();
            return true;
        }
    }
    return false;
};

GameBot.prototype.clearArea = function(){
    for(var i = 0; i < gameBot.canvasID.length; i++){
        var cl = document.getElementById(gameBot.canvasID[i]);
        cl.width = cl.width; //the other methods don't clear it properly.
    }
};

