
let 
    currentOutput = "", // current box output
    previousEntry = "", // the previous item clicked
    currentEntry = "", // the last item clicked
    currentNumber = "", // current consecutive number
    currentOperator = ""; // current operator for computation

let operand1, operand2, result;

String.prototype.count=function(c) { 
    var result = 0, i = 0;
    for(i;i<this.length;i++){
        if(this[i]==c)
            result++;
    };
    return result;
  };


const updateUIElementByID = (id, updatedValue) => {
    const element = document.querySelector(id);
    element.innerHTML = updatedValue; 
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

const performComputation = (value1, value2, operator) => {
    let result;

    value1 = parseFloat(value1)
    value2 = parseFloat(value2)

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

        if (operand1 || operand1 === 0){ // at this point, the user has clicked a number(s) and an operator
            operand2 = currentNumber
            console.log(`Computing ${operand1} ${currentOperator} ${operand2}`)

            if (operand2 != "."){
                result = performComputation(operand1, operand2, currentOperator)
                console.log(`Result: ${result}`)
                updateUIElementByID("#result", result);
            }
            
        }

    } else if (isOperator(clickedValue) && isNumber(previousEntry)){

        if (!isOperator(previousEntry)){ // disable consecutive operators

            if (result || result === 0){
                operand1 = result;
            } else {
                operand1 = currentNumber
            }
            
            currentNumber = "";
            currentEntry = clickedValue;
            currentOperator = clickedValue;

            updateOutput(clickedValue);

            
        }
    }

    updateUIElementByID("#output", currentOutput);;
}





const setButtonEventHandlers = (buttonNodeList, handler) => {
    for (const button of buttonNodeList){
        button.addEventListener("click", handler);
    }
}


const calcButtons = document.querySelectorAll("button");
setButtonEventHandlers(calcButtons, getButtonValue);

