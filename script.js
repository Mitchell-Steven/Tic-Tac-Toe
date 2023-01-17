/**
 * Array Variables
 */
//Array representing the cells on the board
const gameCells = [
    document.getElementById("b0"),
    document.getElementById("b1"),
    document.getElementById("b2"),
    document.getElementById("b3"),
    document.getElementById("b4"),
    document.getElementById("b5"),
    document.getElementById("b6"),
    document.getElementById("b7"),
    document.getElementById("b8"),
]
//Array representing all the possible win conditions of tic-tac-toe
const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var playerSelections = ["", "", "", "", "", "", "", "", ""] //Array that holds all cell selections made by the player and the computer
var availableCells = [] //Array of cells available for the computer to place an O to attempt a win

//Standard variables
var currentPlayer = "X";    //Variable representing the current player (will be changed after each selection a player makes)
var gameOver = false;   //Boolean that will be used to determine whether or not the game has ended
var difficulty = "";    //The difficulty the player has selected the game to be
var ranNum = 0; //Will hold the randomly generated number the computer will use to determine where to place an O
var validPlay = false;  //Determines if the computer has selected a valid space for play

disableButtons();

/**
 * THIS FUNCTION IS FOR THE ACTUAL GAME LOOP
 */

//Parameters are the id of the buttons the function is being used for and the indices of the playerSelection array
function cellClick(id, pSelect) {
    /**
     * Tells the player to select play again if the game has ended and they attempt to click another cell
     * Gives the player an error if they attempt to click a cell that already contains an X or an O
     * If the player selects a valid cell an X is placed and all cells are disabled until computer completes its turn
     * The player choice is placed into the playerSelection array, the error message is cleared if there is one, the status of the game is checked and the player is set to O
     */
    if(gameOver == true)
    {
        document.getElementById("replayHeader").innerHTML = "Please select play again if you would like another try.";
    }
    else if (document.getElementById(id).innerHTML == "X" || document.getElementById(id).innerHTML == "O")
    {
        document.getElementById("messageHeader").innerHTML = "Invalid Selection";
    }
    else if (currentPlayer == "X")
    {
        document.getElementById(id).innerHTML = "X";
        disableButtons();
        playerSelections[pSelect] = currentPlayer;
        document.getElementById("messageHeader").innerHTML = "";
        gameStatus();
        currentPlayer = "O";
    }
    
    /**
     * If loop runs if it's time for the AI to make a move and the game has not yet ended
     * For loop contains 2 if statement. The first checks if it is possible for the computer to win and places accordingly and the second checks if it is possible to block the
     * player from winning and places accordingly
     * If neither if loop is triggered the computer will select a random square on the board and place an O there after a 1 second pause,
     * provided the square selected does not already contain and X or an O
     * If a square already containing an X or an O is selected the loop will be run again with a different randomly selected square until a valid choice is found
     * Once a valid square is selected and the O is placed the player will be set to X and the loop will end
     */
    //Gameplay loop for when the user selects easy difficulty
    if (currentPlayer == "O" && gameOver != true && difficulty == "easy")
    {
        validPlay = false;

        while (validPlay == false)
        {
            ranNum = Math.floor(Math.random() * 9);

            if (document.getElementById("b" + ranNum).innerHTML == "")
            {
                //console.log("I got here");
                setTimeout(() => {if(currentPlayer == "O"){document.getElementById("b" + ranNum).innerHTML = "O"}}, 1000);
                setTimeout(() => {enableButtons()}, 1000);
                playerSelections[ranNum] = currentPlayer; 
                gameStatus();
                if (gameOver != true){
                    setTimeout(() => {currentPlayer = "X"}, 1000);
                }
                validPlay = true;
            }
            else
            {
                //console.log("I did it");
                continue;
            }
        }
    }
    //Gameplay loop for when the user selects normal difficulty
    else if (currentPlayer == "O" && gameOver != true && difficulty == "normal")
    {
        validPlay = false;

        while (validPlay == false)
        {
            ranNum = Math.floor(Math.random() * 9);
            
            for (let i = 0; i < winCons.length; i++)
            {
                if (playerSelections[winCons[i][0]] == "O" && playerSelections[winCons[i][1]] == "O" || playerSelections[winCons[i][1]] == "O" && playerSelections[winCons[i][2]] == "O" || playerSelections[winCons[i][0]] == "O" && playerSelections[winCons[i][2]] == "O")
                {
                    for (let c = 0; c < winCons[i].length; c++)
                    {
                        if (playerSelections[winCons[i][c]] == "")
                        {
                            ranNum = winCons[i][c];
                            break;
                        }
                    }
                }
                else if (playerSelections[winCons[i][0]] == "X" && playerSelections[winCons[i][1]] == "X" || playerSelections[winCons[i][1]] == "X" && playerSelections[winCons[i][2]] == "X" || playerSelections[winCons[i][0]] == "X" && playerSelections[winCons[i][2]] == "X")
                {

                    for (let d = 0; d < winCons[i].length; d++)
                    {
                        if (playerSelections[winCons[i][d]] == "")
                        {
                            ranNum = winCons[i][d];
                            break;
                        }
                    }
                }
            }

            if (document.getElementById("b" + ranNum).innerHTML == "")
            {
                setTimeout(() => {if(currentPlayer == "O"){document.getElementById("b" + ranNum).innerHTML = "O"}}, 1000);
                setTimeout(() => {enableButtons()}, 1000);
                playerSelections[ranNum] = currentPlayer; 
                gameStatus();
                if (gameOver != true){
                    setTimeout(() => {currentPlayer = "X"}, 1000);
                }
                validPlay = true;
            }
            else
            {
                continue;
            }
        }
    }
    //Gameplay loop for when the user selects hard
    else
    {
        validPlay = false;

        while (validPlay == false)
        {
            for (let i = 0; i < winCons.length; i++)
            {
                if (playerSelections[winCons[i][0]] == "O" && playerSelections[winCons[i][1]] == "O" || playerSelections[winCons[i][1]] == "O" && playerSelections[winCons[i][2]] == "O" || playerSelections[winCons[i][0]] == "O" && playerSelections[winCons[i][2]] == "O")
                {
                    for (let c = 0; c < winCons[i].length; c++)
                    {
                        if (playerSelections[winCons[i][c]] == "")
                        {
                            ranNum = winCons[i][c];
                            break;
                        }
                    }
                }
                else if (playerSelections[winCons[i][0]] == "X" && playerSelections[winCons[i][1]] == "X" || playerSelections[winCons[i][1]] == "X" && playerSelections[winCons[i][2]] == "X" || playerSelections[winCons[i][0]] == "X" && playerSelections[winCons[i][2]] == "X")
                {

                    for (let d = 0; d < winCons[i].length; d++)
                    {
                        if (playerSelections[winCons[i][d]] == "")
                        {
                            ranNum = winCons[i][d];
                            break;
                        }
                    }
                }
                else
                {
                    if (playerSelections[winCons[i][0]] == "O" || playerSelections[winCons[i][1]] == "O" || playerSelections[winCons[i][2]] == "O")
                    {
                        if (playerSelections[winCons[i][0]] == "X" || playerSelections[winCons[i][1]] == "X" || playerSelections[winCons[i][2]] == "X")
                        {
                            break;
                        }
                        else
                        {
                            console.log("I got here!!!");

                            if (playerSelections[winCons[i][0]] == "") {availableCells.push(playerSelections[winCons[i][0]])}

                            if (playerSelections[winCons[i][1] == ""]) {availableCells.push(playerSelections[winCons[i][1]])}

                            if (playerSelections[winCons[i][2]] == "") {availableCells.push(playerSelections[winCons[i][2]])}
                        }
                    }
                }

                console.log(availableCells);
            }

            ranNum = Math.floor(Math.random() * availableCells.length + 1);
            console.log(ranNum);

            if (document.getElementById("b" + ranNum).innerHTML == "")
            {
                setTimeout(() => {if(currentPlayer == "O"){document.getElementById("b" + ranNum).innerHTML = "O"}}, 1000);
                setTimeout(() => {enableButtons()}, 1000);
                playerSelections[ranNum] = currentPlayer; 
                gameStatus();
                if (gameOver != true){
                    setTimeout(() => {currentPlayer = "X"}, 1000);
                }
                validPlay = true;
            }
            else
            {
                continue;
            }
        }
    }
}

/**
 * THIS FUNCTION IS ONLY FOR RESTARTING THE GAME
 */

/**
 * Runs when the player clicks play again
 * Foreach loop enables all the cells on the board, removes all the Xs and Os, resets the cell colours to their default
 * Removes error/victory/draw message from the screen if there is one, resets the player to X, resets the array containing player selections
 * Makes the game active again and removes the prompt to select play again if there is one
 */
function playAgain() {
    gameCells.forEach(element => {
        element.disabled = true;
        element.innerHTML = "";
        element.style.backgroundColor=null;
    });
    document.getElementById("messageHeader").innerHTML = "";
    currentPlayer = "X";
    playerSelections = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    document.getElementById("replayHeader").innerHTML = "";
    difficulty = "";
    document.getElementById("easy").style.display = "inline-block";
    document.getElementById("normal").style.display = "inline-block";
    document.getElementById("hard").style.display = "inline-block";
}

/**
 * ALL FUNCTIONS BELOW HERE ARE ONLY TO HELP THE GAME LOOP FUNCTION APPROPRIATELY
 */

/**
 * Checks if a player has won the game and if one has a message is displayed declaring the victor, the winning cells are hilighted green and the game is made inactive
 * If the game ends in a tie a message stating so is displayed, the cells are hilighted orange to make a C for cats game and the game is made inactive
 */
function gameStatus() {
    for(let i = 0; i < winCons.length; i++)
    {
        if(playerSelections[winCons[i][0]] == currentPlayer && playerSelections[winCons[i][1]] == currentPlayer && playerSelections[winCons[i][2]] == currentPlayer)
        {
            if (currentPlayer == "O") {
                setTimeout(() => {document.getElementById("messageHeader").innerHTML = `Player ${currentPlayer} has won the game!`}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][0]).style.backgroundColor="green"}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][1]).style.backgroundColor="green"}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][2]).style.backgroundColor="green"}, 1000);
                gameOver = true;
            }
            else if (currentPlayer == "X") {
                document.getElementById("messageHeader").innerHTML = `Player ${currentPlayer} has won the game!`;
                document.getElementById("b" + winCons[i][0]).style.backgroundColor="green";
                document.getElementById("b" + winCons[i][1]).style.backgroundColor="green";
                document.getElementById("b" + winCons[i][2]).style.backgroundColor="green";
                enableButtons();
                gameOver = true;
            }
            
        }
        else if(!playerSelections.includes("") && gameOver == false && i == winCons.length - 1)
        {
            document.getElementById("messageHeader").innerHTML = "The game has ended in a draw. Would you like to play again?";
            document.getElementById("b0").style.backgroundColor = "orange";
            document.getElementById("b1").style.backgroundColor = "orange";
            document.getElementById("b2").style.backgroundColor = "orange";
            document.getElementById("b3").style.backgroundColor = "orange";
            document.getElementById("b6").style.backgroundColor = "orange";
            document.getElementById("b7").style.backgroundColor = "orange";
            document.getElementById("b8").style.backgroundColor = "orange";
            gameOver = true;
            enableButtons();
        }
    }
}

function disableButtons() {
    gameCells.forEach(element => {
        element.disabled = true;
    });
}

function enableButtons() {
    gameCells.forEach(element => {
        element.disabled = false;
    });
}

function difficultySelect(id) {
    difficulty = id;
    document.getElementById("easy").style.display = "none";
    document.getElementById("normal").style.display = "none";
    document.getElementById("hard").style.display = "none";
    enableButtons();
}