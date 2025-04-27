class Calculator{
    constructor(prevOperandTextElement, curOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.clear();
    }

    clear(){
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.curOperand = this.curOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number == '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.curOperand === '') return;
        if(this.prevOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.curOperand + this.operation;
        this.curOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const cur = parseFloat(this.curOperand);
        if(isNaN(prev) || isNaN(cur)) return;
        switch(this.operation){
            case '+':
                computation = prev + cur;
                break
            case '-':
                computation = prev - cur;
                break
            case '*':
                computation = prev * cur;
                break
            case '/':
                if(cur != 0 ){
                    computation = prev / cur;
                }
                break
            default:
                return;
        }

        this.curOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateDisplay(){
        this.curOperandTextElement.innerText = this.curOperand;
        this.prevOperandTextElement.innerText = this.prevOperand;
    }


}




const numberBtns = document.querySelectorAll('[data-numbers]');
const operationBtns = document.querySelectorAll('[data-operations]');
const equalBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-all-clear]');
const delBtn = document.querySelector('[data-delete]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const curOperandTextElement = document.querySelector('[data-cur-operand]');

const calculator = new Calculator(prevOperandTextElement, curOperandTextElement);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerHTML);
        calculator.updateDisplay();
    })
})


operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerHTML);
        calculator.updateDisplay();
    })
});

equalBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
});

clearBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
});

delBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
});