// // Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// // Create a Tic-Tac-Toe game grid using your HTML element of choice.
// // When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// // A heading should say whether it is X's or O's turn and change with each move made.
// // A button should be available to clear the grid and restart the game.
// // When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.



const cells = $(".tic-tac-toe-cell");// defining cells as the tic-tac-toe grid
const turn = $("#turn-indicator");// defining whose turn it is with the id turn-indicator
const restartButton = $("#restart-button");// defining the restart button with the ID
const alertContainer = $('#alert-container');
const winningCombinations = [// need to define all the winning possible combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let cellInput = ["", "", "", "", "", "", "", "", ""];// empty array of possibilities
let currentPlayer = "X"; // start with player X
let gameActive = false;

function startGame() {// this sets up event listeners for each cell and the restart button and sets the game to active.
    cells.each(function() {
        $(this).on('click', cellClicked);
    }); //for each cell clicked I will invoke the cellClicked method.
    restartButton.on('click', restartGame);// when clicking the restart button it will reset the game to all blank fields
    turn.text(`${currentPlayer}'s turn`);// this will show which player's turn it is.
    gameActive = true;// activates the game
}

function cellClicked() {// this method handles the cell clicks and updates the cell if it's empty while the game is active
    const cell = $(this);//"this" refers to whichever specific cell is clicked
    const cellIndex = cell.attr("cellIndex");//I am setting an attribute to display the cell index.

    if (cellInput[cellIndex] != "" || !gameActive) {//checking if the cell is empty and the game is not active then return
        return;
    }
    updateCell(cell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {// updates the clicked cell with the current player's symbol and also updated the cellInput array.
    cellInput[index] = currentPlayer;
    cell.text(currentPlayer);
}

function switchPlayer() {// switches the current player and updates the turn indicator
    currentPlayer = (currentPlayer == "X") ? "O" : "X";// if current player is equal to X reassign it to O. Otherwise keep X
    turn.text(`${currentPlayer}'s turn`);//displays which player's turn it is.
}

function checkWinner() {// this method checks if there's a winner or a draw
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const condition = winningCombinations[i];//eg. [0,1,2]
        const cellA = cellInput[condition[0]];
        const cellB = cellInput[condition[1]];
        const cellC = cellInput[condition[2]];// this will iterate over all the possible winning combinations

        if (cellA == "" || cellB == "" || cellC == "") {// if there are empty cells then continue
            continue;
        }
        if (cellA == cellB && cellB == cellC) {// if three cells in a row are the same we have a winner!
            roundWon = true;
            break;// exists the loop
        }
    }
    if (roundWon) {// if roundWon is true then the game is over
        gameActive = false;
        showAlert(`${currentPlayer} Wins!`);
    } else if (!cellInput.includes("")) {// if the cellInput array DOES NOT contain an empty string, (all cells are filled are the is no winner then it's a draw.)
        gameActive = false;
        showAlert("Draw!");
    } else {
        switchPlayer();//invokes the switch player method -continues the game
    }
}

function showAlert(message) {// displays an alert within the bootstrap button in the HTML. The message parameter allows me to display different messages without changing the function.
    alertContainer.html(`
        <div class="alert alert-success" role="alert">
            ${message}
        </div>
    `);
}

function restartGame() {// this method resets the game to it's initial state
    currentPlayer = "X";// reset current player to "X"
    cellInput = ["", "", "", "", "", "", "", "", ""];
    cells.text("").removeClass("player-X player-O");// this sets the cell to an empty string and removes any CSS classes (X's or O's) from the previous game
    turn.text(`${currentPlayer}'s Turn`);//updates the turn indicator
    alertContainer.html('');// clear any alert messages
    gameActive = true;// sets the game back to active to start a new game
}

startGame();


// Since this week was about using jQuery I went ahead and used it instead of vanilla. Using jQuery objects such as ($(this)) instead of raw DOM elements provides several advantages:
// For instance:
// Method Chaining: jQuery allows chaining multiple methods in a single statement. For example: cell.text(currentPlayer).addClass('player-X');. or cells.text("").removeClass("player-X player-O")
// Convenient Methods: jQuery offers a wide range of utility methods that make DOM manipulation easier, such as text(), html(), css(), attr(), on(), etc.