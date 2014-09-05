/*
    functions:
        function Game(name1, name2) - constructor.
        void getNames() - asks users to input their names, creates object 'Game' and displays names/scores. 
        void checkOrder(cell) - choses appropriate cell, depends on where user clicked on. Sends corresponding canvas id to draw fanction. 
        void reset() - clears gamefield. Reset all temporary data. Connected with 'Reset Field' button.
        void resetScore() - calls reser() function to clear field and reset score (set to 0). Connected with 'Reset Score' button.
        void switchPlayers() - calls reser() function to clear field and switch palyers' places. Connected with 'Switch' button.
    methods:
        void drawFigure(game.canvasID[]) - gets as input current canvas id and draw figure (cross or zero) depend on turn. When winner is defined 
                                           function redrows won composition in red color to highlite it.  
        void changeState(i) - marks clicked cells to not allow them to be used twice. Calls function to check whether we have a winner and changes                                   turn.
        void setScore() - counts and displays score and block game field.
        bool checkWinner() - checks winnig combinations and if matched one is reached calls drawFigure function to redraw it in red color.
        void clearArea() - erases all canvas. 
        void changeTurn() - changes game turn.
*/

var game;

function Game(name1, name2){
    this.name1 = name1 || "Player #1";
    this.name2 = name2 || "Player #2";
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
    console.log("Created game!");

}



function getNames(){
    var name1 = prompt("Hello, write name of the 1st player!");
    var name2 = prompt("Hello, write name of the 2nd player!");
    game = new Game(name1, name2);
    //setting names
    document.getElementById("player1Name").innerHTML = game.name1.substr(0, 14);
    document.getElementById("player2Name").innerHTML = game.name2.substr(0, 14);
    document.getElementById("p1score").innerHTML = game.p1_score;
    document.getElementById("p2score").innerHTML = game.p2_score;
}

Game.prototype.setScore = function(){
    game.block = true;
    if(game.turn == true){
        game.p1_score++;
        document.getElementById("p1score").innerHTML = game.p1_score;
    }
    else{
        game.p2_score++;
        document.getElementById("p2score").innerHTML = game.p2_score;
    }
};

Game.prototype.changeStates = function(i){
    if(game.turn == true){
        game.cross[i] = true;
        game.crossCount++;
    }
    else{
        game.zero[i] = true;
        game.zeroCount++;
    }
    game.state[i] = false;
    
    if(game.crossCount >= 3 || game.zeroCount >= 3){
        var x = game.checkWinner();
        var j = 0;
        for(var k = 0; k < game.state.length; ++k){
            if(game.state[k] == true)
                break;
            else{
                j++;                //check if we have all cells used but no winner.
                if(j == 9 && x == false){
                    alert("Dead Heat!");
                }
            }
        }//for
    }
    game.changeTurn();
};

Game.prototype.checkWinner = function(){
    var sender = [];
    if(game.turn == true){
        if(game.cross[0] == true && game.cross[4] == true && game.cross[8] == true){
            sender = [game.canvasID[0], game.canvasID[4], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[2] == true && game.cross[4] == true && game.cross[6] == true){
            sender = [game.canvasID[2], game.canvasID[4], game.canvasID[6]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[0] == true && game.cross[1] == true && game.cross[2] == true){
            sender = [game.canvasID[0], game.canvasID[1], game.canvasID[2]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[3] == true && game.cross[4] == true && game.cross[5] == true){
            sender = [game.canvasID[3], game.canvasID[4], game.canvasID[5]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[6] == true && game.cross[7] == true && game.cross[8] == true){
            sender = [game.canvasID[6], game.canvasID[7], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[0] == true && game.cross[3] == true && game.cross[6] == true){
            sender = [game.canvasID[0], game.canvasID[3], game.canvasID[6]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[1] == true && game.cross[4] == true && game.cross[7] == true){
            sender = [game.canvasID[1], game.canvasID[4], game.canvasID[7]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.cross[2] == true && game.cross[5] == true && game.cross[8] == true){
            sender = [game.canvasID[2], game.canvasID[5], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
    }
    else{
        if(game.zero[0] == true && game.zero[4] == true && game.zero[8] == true){
            sender = [game.canvasID[0], game.canvasID[4], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[2] == true && game.zero[4] == true && game.zero[6] == true){
            sender = [game.canvasID[2], game.canvasID[4], game.canvasID[6]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[0] == true && game.zero[1] == true && game.zero[2] == true){
            sender = [game.canvasID[0], game.canvasID[1], game.canvasID[2]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[3] == true && game.zero[4] == true && game.zero[5] == true){
            sender = [game.canvasID[3], game.canvasID[4], game.canvasID[5]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[6] == true && game.zero[7] == true && game.zero[8] == true){
            sender = [game.canvasID[6], game.canvasID[7], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[0] == true && game.zero[3] == true && game.zero[6] == true){
            sender = [game.canvasID[0], game.canvasID[3], game.canvasID[6]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[1] == true && game.zero[4] == true && game.zero[7] == true){
            sender = [game.canvasID[1], game.canvasID[4], game.canvasID[7]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
        else if(game.zero[2] == true && game.zero[5] == true && game.zero[8] == true){
            sender = [game.canvasID[2], game.canvasID[5], game.canvasID[8]];
            game.red = true;
            for(var i = 0; i < 3; i++)
                game.drawFigure(sender[i]);
            game.setScore();
            return true;
        }
    }
    
    return false;
    
};

Game.prototype.drawFigure = function(canID){
    if(game.turn == true){
        var c = document.getElementById(canID);
        var ctx = c.getContext("2d");
        ctx.moveTo(10, 10);
        ctx.lineTo(180, 180);
        ctx.stroke();
        ctx.moveTo(180, 10);
        ctx.lineTo(10, 180);
        ctx.lineWidth = 8;
        if(game.red == true)
            ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }
    else{
        var c = document.getElementById(canID);
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,95,90,0,2*Math.PI);
        ctx.lineWidth = 7;
        if(game.red == true)
            ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }
};


function resetScore(){
    reset();
    if(isBot == false){
        game.p1_score = 0;
        game.p2_score = 0;
        document.getElementById("p1score").innerHTML = game.p1_score;
        document.getElementById("p2score").innerHTML = game.p2_score;
    }
    else{
        gameBot.p1_score = 0;
        gameBot.p2_score = 0;
        document.getElementById("p1score").innerHTML = gameBot.p1_score;
        document.getElementById("p2score").innerHTML = gameBot.p2_score;
    }
}

function reset(){
    if(isBot == false){
        game.turn = true;
        game.state = [true, true, true, true, true, true, true, true, true];
        game.cross = [false, false, false, false, false, false, false, false, false];
        game.zero = [false, false, false, false, false, false, false, false, false];
        game.crossCount = 0;
        game.zeroCount = 0;
        game.red = false;
        game.block = false;
        game.clearArea();
    }
    else{
        gameBot.turn = true;
        gameBot.state = [true, true, true, true, true, true, true, true, true];
        gameBot.cross = [false, false, false, false, false, false, false, false, false];
        gameBot.zero = [false, false, false, false, false, false, false, false, false];
        gameBot.crossCount = 0;
        gameBot.zeroCount = 0;
        gameBot.red = false;
        gameBot.block = false;
        gameBot.clearArea();
        if(gameBot.name1 == "Bot"){
            gameBot.turn = false;  
            gameBot.botTurn();
        }
    }
}


function switchPlayers(){
    if(isBot == false){
        var swap = game.name1;
        game.name1 = game.name2;
        game.name2 = swap;

        swap = game.p1_score;
        game.p1_score = game.p2_score;
        game.p2_score = swap;

        document.getElementById("player1Name").innerHTML = game.name1.substr(0, 14);
        document.getElementById("player2Name").innerHTML = game.name2.substr(0, 14);

        document.getElementById("p1score").innerHTML = game.p1_score;
        document.getElementById("p2score").innerHTML = game.p2_score;
    }
    else{
        var swap = gameBot.name1;
        gameBot.name1 = gameBot.name2;
        gameBot.name2 = swap;

        swap = gameBot.p1_score;
        gameBot.p1_score = gameBot.p2_score;
        gameBot.p2_score = swap;

        document.getElementById("player1Name").innerHTML = gameBot.name1.substr(0, 14);
        document.getElementById("player2Name").innerHTML = gameBot.name2.substr(0, 14);

        document.getElementById("p1score").innerHTML = gameBot.p1_score;
        document.getElementById("p2score").innerHTML = gameBot.p2_score;
    }
    reset();
}


Game.prototype.clearArea = function(){
    for(var i = 0; i < game.canvasID.length; i++){
        var cl = document.getElementById(game.canvasID[i]);
        cl.width = cl.width; //the other methods don't clear it properly.
    }
};

Game.prototype.changeTurn = function(){
    if(game.turn == true)
        game.turn = false;
    else
        game.turn = true;
};

function checkOrder(cell) {
    //alert(game.turn); 
    
    if(isBot == false){
    
        if (game.block == false){
            if(game.turn == true){
                switch (cell){
                case "one":
                        if(game.state[0] == true){
                            game.drawFigure(game.canvasID[0]);
                            game.changeStates(0);
                        }
                        break;
                case "two":
                        if(game.state[1] == true){
                            game.drawFigure(game.canvasID[1]);
                            game.changeStates(1);
                        }
                        break;
                case "three":
                        if(game.state[2] == true){
                            game.drawFigure(game.canvasID[2]);
                            game.changeStates(2);
                        }
                        break;
                case "four":
                        if(game.state[3] == true){
                            game.drawFigure(game.canvasID[3]);
                            game.changeStates(3);  
                        }
                        break;
                case "five":
                        if(game.state[4] == true){
                            game.drawFigure(game.canvasID[4]);
                            game.changeStates(4);
                        }
                        break;
                case "six":
                        if(game.state[5] == true){
                            game.drawFigure(game.canvasID[5]);
                            game.changeStates(5);
                        }
                        break;
                case "seven":
                        if(game.state[6] == true){
                            game.drawFigure(game.canvasID[6]);
                            game.changeStates(6);
                        }
                        break;
                case "eight":
                        if(game.state[7] == true){
                            game.drawFigure(game.canvasID[7]);
                            game.changeStates(7);
                        }
                        break;
                case "nine":
                        if(game.state[8] == true){
                            game.drawFigure(game.canvasID[8]);
                            game.changeStates(8);
                        }
                        break;

                } //switch
            } //if
            else{   //game.turn == false
                switch (cell){
                case "one":
                        if(game.state[0] == true){
                            game.drawFigure(game.canvasID[0]);
                            game.changeStates(0);
                        }
                        break;
                case "two":
                        if(game.state[1] == true){
                            game.drawFigure(game.canvasID[1]);
                            game.changeStates(1);
                        }
                        break;
                case "three":
                        if(game.state[2] == true){
                            game.drawFigure(game.canvasID[2]);
                            game.changeStates(2);
                        }
                        break;
                case "four":
                        if(game.state[3] == true){
                            game.drawFigure(game.canvasID[3]);
                            game.changeStates(3);    
                        }
                        break;
                case "five":
                        if(game.state[4] == true){
                            game.drawFigure(game.canvasID[4]);
                            game.changeStates(4);
                        }
                        break;
                case "six":
                        if(game.state[5] == true){
                            game.drawFigure(game.canvasID[5]);
                            game.changeStates(5);
                        }
                        break;
                case "seven":
                        if(game.state[6] == true){
                            game.drawFigure(game.canvasID[6]);
                            game.changeStates(6);
                        }
                        break;
                case "eight":
                        if(game.state[7] == true){
                            game.drawFigure(game.canvasID[7]);
                            game.changeStates(7);
                        }
                        break;
                case "nine":
                        if(game.state[8] == true){
                            game.drawFigure(game.canvasID[8]);
                            game.changeStates(8);
                        }
                        break;

                } //switch
            } //else
        } //block
    }
    else{
        if(gameBot.turn == true && gameBot.block == false){
            switch (cell){
            case "one":
                    if(gameBot.state[0] == true){
                        gameBot.drawFigure(gameBot.canvasID[0]);    
                        gameBot.changeStates(0);
                    }
                    break;
            case "two":
                    if(gameBot.state[1] == true){
                        gameBot.drawFigure(gameBot.canvasID[1]);
                        gameBot.changeStates(1);
                    }
                    break;
            case "three":
                    if(gameBot.state[2] == true){
                        gameBot.drawFigure(gameBot.canvasID[2]);
                        gameBot.changeStates(2);
                    }
                    break;
            case "four":
                    if(gameBot.state[3] == true){
                        gameBot.drawFigure(gameBot.canvasID[3]);
                        gameBot.changeStates(3);  
                    }
                    break;
            case "five":
                    if(gameBot.state[4] == true){
                        gameBot.drawFigure(gameBot.canvasID[4]);
                        gameBot.changeStates(4);
                    }
                    break;
            case "six":
                    if(gameBot.state[5] == true){
                        gameBot.drawFigure(gameBot.canvasID[5]);
                        gameBot.changeStates(5);
                    }
                    break;
            case "seven":
                    if(gameBot.state[6] == true){
                        gameBot.drawFigure(gameBot.canvasID[6]);
                        gameBot.changeStates(6);
                    }
                    break;
            case "eight":
                    if(gameBot.state[7] == true){
                        gameBot.drawFigure(gameBot.canvasID[7]);
                        gameBot.changeStates(7);
                    }
                    break;
            case "nine":
                    if(gameBot.state[8] == true){
                        gameBot.drawFigure(gameBot.canvasID[8]);
                        gameBot.changeStates(8);
                    }
                break;

            } //switch
        } //if
    }
}