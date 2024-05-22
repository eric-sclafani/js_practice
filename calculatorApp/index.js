
let currentOutput = ""; // current box output
let previousEntry = ""; // the previous item clicked
let currentEntry = ""; // the last item clicked
let currentNumber = ""; // current consecutive number

let result = "";
let operandOne;
let operandTwo;


String.prototype.count=function(c) { 
    var result = 0, i = 0;
    for(i;i<this.length;i++){
        if(this[i]==c)
            result++;
    };
    return result;
  };


const displayCurrentOutputToUser = () => {
    const output = document.querySelector("#output");
    output.innerHTML = currentOutput; 
}

const isValidDecimal = (string) => {
    return string == "." && previousEntry.count(".") == 0;
}

const isNumber = (string) => { 
    if (string && !isNaN(string)){
        return true; 
    } else if (isValidDecimal(string)){
        return true;
    }
    
}

const isOperator = (string) => { return ["+", "-", "÷", "×"].includes(string); }

const isEquals = (string) => { return string == "="; }

const updateOutput = (value) => {

    if (isNumber(value) || (isOperator(value) && !isOperator(previousEntry))){
        currentOutput += value;
    } 
}

const setOperandOne = () =>{ operandOne = previousEntry}

const applyOperator = (value1, value2, operator) => {
    let result;
    switch (operator) {
        case "+":
            result = value1 + value2;
            break;
        case "-":
            result = value1 - value2;
            break;
        case "÷": 
            result = value1 / value2;
            break;
        case "×":
            result = value1 * value2;
            break; 
    }
    return result;
  }

const getButtonValue = function() {
    const clickedValue = this.value
    previousEntry = currentEntry;
    
    if (isNumber(clickedValue)){

        currentNumber += clickedValue // user can enter consecutive numerals 
        currentEntry = currentNumber;
        updateOutput(clickedValue);

        if (operandOne){ // at this point, the user has clicked a number(s) and an operator
            
        }

    } else if (isOperator(clickedValue) && isNumber(previousEntry)){

        if (!isOperator(previousEntry)){ // disable consecutive operators
            currentNumber = "";
            currentEntry = clickedValue;
            updateOutput(clickedValue);

            setOperandOne()
        }
    }

    console.log(`Previous: ${previousEntry}`);
    console.log(`Current: ${currentEntry}`);
    console.log(`Operand one: ${operandOne}`)

    displayCurrentOutputToUser();
}





const setButtonEventHandlers = (buttonNodeList, handler) => {
    for (const button of buttonNodeList){
        button.addEventListener("click", handler);
    }
}


const calcButtons = document.querySelectorAll("button");
setButtonEventHandlers(calcButtons, getButtonValue);

