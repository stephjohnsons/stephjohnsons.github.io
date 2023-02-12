// Set global variables. 
let userMarks = 0; 
let comMarks = 0; 
let roundNumber = 1;

// Set computer's selection.
function comSel() {
    var comSelection;
    function randomInt() {
        return Math.floor(Math.random() * 3);
    };
    // Convert random integer to rock, papers, or scissors. 
    switch (randomInt()) {
        case 0:
            comSelection = "rock";
            break;
        case 1:
            comSelection = "paper";
            break; 
        case 2: 
            comSelection = "scissors";
            break;
    };

    return comSelection;
};

// Function is triggered upon clicking the icons.
function playRound(userSelection) {
    let result;
    let log;
    const comSelection = comSel();
    
    if (userSelection == 'rock' && comSelection == 'scissors' || 
        userSelection == 'paper' && comSelection == 'rock' ||
        userSelection == 'scissors' && comSelection == 'paper') {
     result = 'You win this round!';
     log = "win";
     userMarks++;
    } else if (userSelection == comSelection) {
     result = 'It\'s a tie!';
     log = "tie";
    } else {
     result = 'You lose this round!';
     log = "lose";
     comMarks++; 
    }; 

    // Display marks for each user
    document.getElementById("com-res-marks").innerHTML = comMarks; // Change to score (naming issue)
    document.getElementById("user-res-marks").innerHTML = userMarks; // Change to score (naming issue)
    document.getElementById("result-text").innerHTML = result;

    // Log the rounds and results.
    function logResults() {
        var table = document.querySelector(".choice-log");
        var row = table.insertRow();
        var logCount = row.insertCell(0);
        var comLog = row.insertCell(1);
        var userLog = row.insertCell(2);
        var resLog = row.insertCell(3);
        logCount.innerHTML = roundNumber;
        comLog.innerHTML = comSelection;
        userLog.innerHTML = userSelection;
        resLog.innerHTML = log;
    };

    logResults();
    roundNumber++;

    // First to get 5 points wins
    let comResult = document.getElementById("com-res-marks").innerText; // defined in the beginning 
    let userResult = document.getElementById("user-res-marks").innerText; // defined in the beginning
    if (comResult.includes("5")) {
        if (confirm("Computer won the match! Better luck next time.\nPress OK to reset the game, or cancel to view your scores.")) {
            location.reload();
        } else {
            document.addEventListener("click", handler, true);
            function handler(e) {
                e.stopPropagation();
                e.preventDefault();
                alert("Refresh the page to play again!");
            };
        }
    } else if (userResult.includes("5")) {
        if (confirm("You won the match! Congratulations!\nPress OK to reset the game, or cancel to view your scores.")) {
            location.reload();
        } else {
            document.addEventListener("click", handler, true);
            function handler(e) {
                e.stopPropagation();
                e.preventDefault();
                alert("Refresh the page to play again!");
            };
        }
    };
};

// Work on programming structure. 