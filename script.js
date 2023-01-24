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
var aiPlays = [];                                           //Used to determine which cells the ai will play in

//Standard variables
var currentPlayer = "X";    //Variable representing the current player (will be changed after each selection a player makes)
var gameOver = false;       //Boolean that will be used to determine whether or not the game has ended
var difficulty;             //The difficulty the player has selected the game to be
var ranNum = 0;             //Will hold the randomly generated number the computer will use to determine where to place an O

disableButtons();

/**
 * Runs each time a cell on the board is clicked by the user
 * @param {*} id        The ID of the cell being selected by the player
 * @param {*} pSelect   The number of the cell being selected by the player
 */
function cellClick(id, pSelect) {
    if(gameOver == true)
    {
        document.getElementById("replayHeader").innerHTML = "Please select play again if you would like another try.";
    }
    else if (document.getElementById(id).innerHTML == "X" || document.getElementById(id).innerHTML == "O")
    {
        document.getElementById("messageHeader").innerHTML = "Invalid Selection";
    }
    /**
     * Sets the cell text to X, disables all the buttons on the board, assigns X to the playerSelection array
     * Resets the message header, checks the status of the game, sets current player to O and runs the logic of the game based on the difficulty
     */
    else if (currentPlayer == "X")
    {
        document.getElementById(id).innerHTML = "X";
        disableButtons();
        playerSelections[pSelect] = currentPlayer;
        document.getElementById("messageHeader").innerHTML = "";
        gameStatus();
        currentPlayer = "O";
        aiPlacement(difficulty);
    }
}

/**
 * Resets all necessary aspects of the game when the play again button is clicked
 */
function playAgain() {
    //disables all the buttons on the game board, resets their text and the colour of the cells
    gameCells.forEach(element => {
        element.disabled = true;
        element.innerHTML = "";
        element.style.backgroundColor=null;
    });
    /**
     * Resets message header, sets current player to X, resets playerSelection, sets gameOver to false, resets replay header
     * Resets difficulty, displays each of the difficulty select buttons
     */
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
 * Checks the status of the game (whether it has ended in a win for the player, a win for the computer or a cats game)
 */
function gameStatus() {
    for(let i = 0; i < winCons.length; i++)
    {
        //If all the cells in a line have the same character in them
        if(playerSelections[winCons[i][0]] == currentPlayer && playerSelections[winCons[i][1]] == currentPlayer && playerSelections[winCons[i][2]] == currentPlayer)
        {
            /**
             * If the characters are Os
             * hilights the matching cells in green and declares O as the winner
             */
            if (currentPlayer == "O") {
                setTimeout(() => {document.getElementById("messageHeader").innerHTML = `Player ${currentPlayer} has won the game!`}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][0]).style.backgroundColor="green"}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][1]).style.backgroundColor="green"}, 1000);
                setTimeout(() => {document.getElementById("b" + winCons[i][2]).style.backgroundColor="green"}, 1000);
                gameOver = true;
            }
            /**
             * If the characters are Os
             * hilights the matching cells in green and declares X as the winner
             */
            else if (currentPlayer == "X") {
                document.getElementById("messageHeader").innerHTML = `Player ${currentPlayer} has won the game!`;
                document.getElementById("b" + winCons[i][0]).style.backgroundColor="green";
                document.getElementById("b" + winCons[i][1]).style.backgroundColor="green";
                document.getElementById("b" + winCons[i][2]).style.backgroundColor="green";
                enableButtons();
                gameOver = true;
            }
            
        }
        /**
         * If there are no empty cells on the board and no win has been found (cats game)
         * hilights cells orange in the shape of a C and declares a cats game
         */
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

/**
 * Disables each of the buttons on the board
 */
function disableButtons() {
    gameCells.forEach(element => {
        element.disabled = true;
    });
}

/**
 * Enables each of the buttons on the board
 */
function enableButtons() {
    gameCells.forEach(element => {
        element.disabled = false;
    });
}

/**
 * 
 * @param {*} id The ID of the button being clicked
 * Sets the difficulty to the id passed to the function
 * Hides each of the difficulty buttons
 * Enables each of the buttons on the board
 */
function difficultySelect(id) {
    difficulty = id;
    document.getElementById("easy").style.display = "none";
    document.getElementById("normal").style.display = "none";
    document.getElementById("hard").style.display = "none";
    enableButtons();
}

/**
 * 
 * @param {*} array The array being searched for a specific value
 * @param {*} value The value being searched for in the array
 * @returns An array of the values searched for and pulled from the array passed to the function
 */
function getAllIndices(array, value) {
    let indices = [];

    for (i = 0; i < array.length; i++)
    {
        if (array[i] == value)
        {
            indices.push(i);
        }
    }

    return indices;
}

/**
 * 
 * @param {*} difficulty The difficulty chosen by the player
 */
function aiPlacement(difficulty) {
    let aiPlacement;                                //The cell the ai will place on
    aiPlays = ["", "", "", "", "", "", "", "", ""]; //Used by checkArray to get the indexes the ai will play on
    let checkArray = [];                            //Viable cells for the ai to place on
    let matchCheck = "";                            //Used to check for matching characters

    //If index of playerSelection is not empty, places an N into the aiPlays array
    for (i = 0; i < playerSelections.length; i++) {
        if (playerSelections[i] != "") aiPlays[i] = "N";
    }

    //If player chose normal or hard as the difficulty
    if (difficulty == "normal" || difficulty == "hard") {
        //concatonates the characters in the playerSelection array corresponding to each of the indexes in the current winCons array
        for (i = 0; i < winCons.length; i++) {
            matchCheck = playerSelections[winCons[i][0]] + playerSelections[winCons[i][1]] + playerSelections[winCons[i][2]]

            if (matchCheck == "OO") {
                //Places OO into the index of playerSelection that matches with the index from above that contained a blank string
                for (j = 0; j < winCons[i].length; j++) {
                    if (playerSelections[winCons[i][j]] == "") aiPlays[winCons[i][j]] = "OO";
                }
            }
            else if (matchCheck == "XX") {
                //Places XX into the index of playerSelection that matches with the index from above that contained a blank string
                for (k = 0; k < winCons[i].length; k++) {
                    if (playerSelections[winCons[i][k]] == "") aiPlays[winCons[i][k]] = "XX";
                }
            }

            //If player chose hard as the difficulty
            if(difficulty == "hard") {
                if (matchCheck == "O") {
                    ////Places O into the indexes of playerSelection that match with the indexes from above that contained blank strings
                    for (l = 0; l < winCons.length; l++) {
                        if (playerSelections[winCons[i][l]] == "") aiPlays[winCons[i][l]] = "O";
                    }
                }
            }
        }
    }

    if (aiPlays.includes("OO") == true) {
        //Places the index numbers of aiPlays that contain an OO into checkArray
        checkArray = getAllIndices(aiPlays, "OO");
    }
    else if (aiPlays.includes("XX") == true) {
        //Places the index numbers of aiPlays that contain an XX into checkArray
        checkArray = getAllIndices(aiPlays, "XX");
    }
    else if (aiPlays.includes("O") == true) {
        //Places the index numbers of aiPlays that contain an O into checkArray
        checkArray = getAllIndices(aiPlays, "O");
    }
    else {
        //Places the index numbers of aiPlays that contain a blank string into checkArray
        checkArray = getAllIndices(aiPlays, "");
    }

    //Randomly generates a number between 0 and the length of checkArray
    ranNum = Math.floor(Math.random() * checkArray.length);
    //Assigns the value contained at the index of whatever ranNum is to aiPlacement
    aiPlacement = checkArray[ranNum];

    /**
     * Places an O into the cell number contained within aiPlacement after a 1 second delay
     * Enables all the buttons on the board after a 1 second delay
     * Assigns an O to the index of playerSelections that matches whatever number is contained in aiPlacement
     * Checks the status of the game (whether a player has won or the game has ended in a cats game)
     * If the game has not ended he currentPlayer is set to X after a 1 second delay
     */
    setTimeout(() => {document.getElementById("b" + aiPlacement).innerHTML = "O"}, 1000);
    setTimeout(() => {enableButtons()}, 1000);
    playerSelections[aiPlacement] = currentPlayer; 
    gameStatus();
    if (gameOver != true) setTimeout(() => {currentPlayer = "X"}, 1000);
}