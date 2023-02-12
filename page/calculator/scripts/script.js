// Create a calculator class for functions later. 
class Calculator {
  constructor(preOperandTextElement, curOperandTextElement) {
    this.preOperandTextElement = preOperandTextElement // round to 4 decimals
    this.curOperandTextElement = curOperandTextElement // round to 4 decimals 
    this.clear();
  }
  
  // For clearing the entire "memory".
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  // To delete the most recent number keyed. 
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Appends numbers into the display. 
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString(); // change to 4 decimals 
  }

  // Define the operations for computation. 
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    // Computates operands. 
    console.log(`${this.previousOperand} ${this.operation} ${this.currentOperand}`);
    this.currentOperand = computation;
    console.log(`= ${this.currentOperand}`);
    this.operation = undefined;
    this.previousOperand = '';
    console.log("");
  }

  /* Performs computation into the previous operand.
    * This will allow for further computation. */
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute();
    };
    this.operation = operation;    
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // Get the currently displayed number in order to process computation. 
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    };
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    };
  };

  // To update display after every operation or changes made. 
  updateDisplay() {
    this.curOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.preOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.preOperandTextElement.innerText = ''
    };
  };
};

// Define buttons and input.
const numBtn = document.querySelectorAll('[data-number]');
const operBtn = document.querySelectorAll('[data-operation]');
const eqBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-all-clear]');
const delBtn = document.querySelector('[data-delete]');
// Query operands. 
const preOperandTextElement = document.querySelector('[data-previous-operand]');
const curOperandTextElement = document.querySelector('[data-current-operand]');
const calculator = new Calculator(preOperandTextElement, curOperandTextElement);

// For all the functions called below, a updateDisplay() function is called. 
// When number buttons are pressed, append the pressed number into the current operand.
numBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

// When operation buttons are pressed, performs the operation.
operBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

// When equal button is pressed, the operands are computed.
eqBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
}); 

// When All Clear button is clicked, clears the calculator.
clearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

// When delete button is clicked, the last appended number will be deleted. 
delBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

/* Add keyboard support. Only
 * numbers + operators, decimal number (full-stop key),
 * enter or equal, backspace and delete are supported. */
document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  };
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  };
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  };
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});

// Logging console to tape.
///  
let old = console.log;
let logger = document.getElementById('tape-display');
let logButton = document.getElementById('clear-btn');

(function () {
  if (!console) {
      console = {};
  }
  console.log = function (message) {
      if (typeof message == 'object') {
          logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
      } else {
          logger.innerHTML += message + '<br />';
      }
  }
})();

// Clearing the tape. 
logButton.addEventListener('click', () => {
    logger.innerHTML = "";
});
