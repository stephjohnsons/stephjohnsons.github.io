// Randomly return either rock, papers, or scissors
// as computer's choice. 
function computerPlay() {
    var computerSelection;
     // Returns a random integer from 0 to 2.
     function randomInt() {
        return Math.floor(Math.random() * 3);
    };

    // Convert random integer to rock, papers, or scissors. 
    switch (randomInt()) {
        case 0:
            computerSelection = "rock";
            break;
        case 1:
            computerSelection = "papers";
            break; 
        case 2: 
            computerSelection = "scissors";
            break;
    };

    return computerSelection;
};

// Checks the player's selection against computer's. 
function playRound(playerSelection, computerSelection) {
    // Check for tie 
    if (playerSelection === computerSelection) {
        return "It is a tie!";
    }

    // Check for rock
    if (playerSelection === "rock") {
        if (computerSelection === "scissors") {
            return "You win! Rock beat scissors!";
        } else {
            return "You lose! Paper beat rock!";
        }
    }; 

    // Check for scissors 
    if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            return "You lose! Rock beat scissors!";
        } else {
            return "You win! Scissors beat paper!";
        }
    };

    // Check for paper 
    if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            return "You win! Paper beat rock!";
        } else {
            return "You lose! Scissors beat paper!";
        }
    };
};

// Record results of five rounds with just one call of the function. 
function game() {
    for (let i = 1; i < 6; i++) {
        console.log(i);
        // Prompts user to enter five answers each time. 
        var playerSelection = prompt("Rock, paper, or scissors?\nType your answer and click OK!");
        // Generates a random computer selection. 
        const computerSelection = computerPlay();
        // Logs results on the console. 
        console.log(playRound(playerSelection, computerSelection));
    };
};

game();

