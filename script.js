const result = document.getElementById("result");
const buttons = document.querySelectorAll(".cal-buttons button");
let currentInput = "0";
let shouldResetScreen = false;

function updateDisplay() {
    result.textContent = currentInput;
}

function clearAll() {
    currentInput = "0";
    shouldResetScreen = false;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "" || currentInput === "-") currentInput = "0";
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (currentInput === "0" && num !== ".") {
            currentInput = num;
        } else {
            // Prevent multiple decimal points
            if (num === "." && currentInput.includes(".")) return;
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    // Don't allow operator as first character except minus
    if (currentInput === "0" && op !== "-") return;
    
    // Replace last operator if exists
    if ("+-×÷".includes(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    shouldResetScreen = false;
    updateDisplay();
}

function calculate() {
    try {
        // Replace multiplication and division symbols
        let expression = currentInput
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
        
        // Evaluate and round to 8 decimal places
        let result = eval(expression);
        currentInput = Number(result.toFixed(8)).toString();
    } catch {
        currentInput = "Error";
    }
    shouldResetScreen = true;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("num")) {
            appendNumber(value);
        }
        else if (button.classList.contains("decimal")) {
            appendNumber(".");
        }
        else if (value === "C") {
            clearAll();
        }
        else if (value === "←") {
            backspace();
        }
        else if (value === "=") {
            calculate();
        }
        else if (button.classList.contains("operator")) {
            appendOperator(value);
        }
    });
});

updateDisplay();