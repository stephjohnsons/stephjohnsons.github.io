/* 
*  Assignment 3A
*  Write a JavaScript program that accepts 2 integers
*  and displays the larger of the two.
*/

function checkLarger() {
    // Gets user input.
    let num1 = prompt("What is your first number?");
    let num2 = prompt("What is your second number?");
    
    // Prints results. 
    if (num1 > num2) {
        text = `${num1} is larger than ${num2}.`
    } else if (num1 < num2) {
        text = `${num1} is smaller than ${num2}.`
    } else {
        text = `${num1} is the same as ${num2}... 
            Are you sure you're not high? `
    };
    
    // Insert into HTML as text. 
    document.getElementById("larger-result").innerHTML = text;
};

/* 
*  Assignment 3B
*  Write a JavaScript program that checks
*  whether an integer is an even or an odd number.
*/

function oddEven() {
    let text;

    // Gets user input. 
    let num3 = prompt("Choose a number to see if it is even or odd number:");

    // Print results on screen.
    if (num3 % 2 == 0) {
        text = `The number ${num3} is an even number!`
    } else {
        text = `The number ${num3} is an even number!`
    }; 
    document.getElementById("num3-result").innerHTML = text;
};
