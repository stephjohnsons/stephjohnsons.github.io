// Logging console to HTML. 
//   Source code from Arun P Johny.
//   https://jsfiddle.net/arunpjohny/mGDet/

(function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();

// Execution of assignment 2.
// ==========================

/* 
*  Assignment 2A
*  Write a JavaScript program to find the diagonal of a square
*  where the length of each side is 9.
*/

console.log("ASSIGNMENT 2a")

// Find diagonal of a square where length of each side is 9. 
// The diagonal of a square where length of each side is 1 is sqrt(2).
let diagSq = Math.sqrt(2).toFixed(3); 
console.log(
    `1. The square root of 2 is ≈${diagSq}.`
); 

// If side is 9, then sqrt(2) shall be multiplied by 9. 
// First, we must establish the function.
function calcSqDiag(x) {
    return diagResult = diagSq * 9;
};

// Multiply sqrt(2) by 9, then rounded to 3 decimal points.
let newDiagResult = calcSqDiag(9).toFixed(3); 
console.log(
    `2. Where the length of each side is 9,
    the diagonal of a square is ≈${newDiagResult}.`
);


/* 
*  Assignment 2B
*  Write a JavaScript program to find the area of a triangle
*  where the length of the three of its sides are 5, 6, and 7.
*/

console.log("\n")
console.log("ASSIGNMENT 2b")

// Where three sides are provided, we can use Heron' formula to calculate the area of a triangle. 
// Heron's formula is "area = 0.25 * sqrt[(a+b+c) * (-a+b+c) * (a-b+c) * (a+b-c)]"

// Establish the length of sides.
let a = 5;
let b = 6;
let c = 7; 

// Establish the contents of square root.
let partOne = a + b + c;
let partTwo = b + c - a; 
let partThree = a - b + c;
let partFour = a + b - c;

// Multiply all four parts of the contents to acquire the result.
let sqrtContentRes = partOne * partTwo * partThree * partFour;

// Calculate the area. 
let area = 0.25 * Math.sqrt(sqrtContentRes);
console.log(
    `≈${area.toFixed(3)} is the area of a triangle when 
    its sides are 5, 6, and 7;`
)

/* 
*  Assignment 2C
*  Write a JavaScript program to find the circumference 
*  and surface area of a circle whose radius is 4. 
*  PI (3.142) is required.
*/

console.log("\n")
console.log("ASSIGNMENT 2c")

// Define PI as a constant, then calculate.
const p = (Math.PI).toFixed(3);
let circumference = 2 * p * 4; 
let surfaceArea = p * 4 * 4;
console.log(
    `A circle whose radius is 4 has
    a circumference of ≈${circumference} and 
    a surface area of ≈${surfaceArea}.`
);