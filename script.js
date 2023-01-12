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

var playerSelections = ["", "", "", "", "", "", "", "", ""]
var currentPlayer = "X";
var gameOver = false;

function cellClick(id, id2) {

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
        gameCells.forEach(element => {
            element.disabled = true;
        });
        playerSelections[id2] = currentPlayer;
        document.getElementById("messageHeader").innerHTML = "";
        gameStatus(); //<- This is function iteration causing the issue
        currentPlayer = "O";
    }
    
    if (currentPlayer == "O")
    {
        let validPlay = false;
        while (validPlay == false)
        {
            let ranNum = Math.floor(Math.random() * 9);
            console.log(ranNum);
            
            if (document.getElementById("b" + ranNum).innerHTML == "" /*&& gameOver == false*/) //<- That doesn't work because gameOver is set to true when the winnig square is clicked
            {
                setTimeout(() => {document.getElementById("b" + ranNum).innerHTML = "O"}, 1000);
                setTimeout(() => {gameCells.forEach(element => {
                    element.disabled = false;
                })}, 1000);
                playerSelections[ranNum] = currentPlayer;
                gameStatus();
                if (gameOver != true){
                    currentPlayer = "X"
                }
                validPlay = true;
            }
            else if (!playerSelections.includes(""))
            {
                break;
            }
            else
            {
                continue;
            }
        }
    }
}

function playAgain() {
    gameCells.forEach(element => {
        element.disabled = false;
        element.innerHTML = "";
        element.style.backgroundColor=null;
    });
    document.getElementById("messageHeader").innerHTML = "";
    currentPlayer = "X";
    playerSelections = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    document.getElementById("replayHeader").innerHTML = "";
}

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
                gameOver = true; //<- This is where gameOver is set to true, causing the problem with my while loop
            }
            
        }
        else if(!playerSelections.includes("") && gameOver == false)
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
        }
    }
}