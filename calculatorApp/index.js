
let currentOutput = ""; // current box output
let previousEntry = ""; // the previous item clicked
let currentEntry = ""; // the last item clicked
let currentNumber = ""; // current consecutive number

const displayCurrentOutputToUser = () => {
    const output = document.querySelector("#output")
    output.innerHTML = currentOutput;
    
}

const isNumber = (string) => { return !isNaN(string)}

const isOperator = (string) => { return ["+", "-", "÷", "×"].includes(string)}

const updateOutput = (value) => {
    if (isNumber(value)){ 
        currentOutput = value
    } else if (isOperator(value)){
        currentOutput += value
    }
}


const buttonEventHandler = function() {
    const clickedValue = this.value
    previousEntry = currentEntry

    // user can enter consecutive numerals 
    if (isNumber(clickedValue)){
        currentNumber += clickedValue
        currentEntry = currentNumber;
        updateOutput(currentNumber) 

    } else if (isOperator(clickedValue)){
        currentNumber = "";
        currentEntry = clickedValue
        updateOutput(clickedValue)

    }

    console.log(`Previous: ${previousEntry}`)
    console.log(`Current: ${currentEntry}`)
    
    
    
    displayCurrentOutputToUser()
}



const setNumButtonEventHandlers = (buttonNodeList) => {
    for (const button of buttonNodeList){
        button.addEventListener("click", buttonEventHandler);
    }
}


const calcButtons = document.querySelectorAll("button");;
setNumButtonEventHandlers(calcButtons);

