const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const sqrtButton = document.querySelector('[data-sqrt]');
const expButton = document.querySelector('[data-mul]');
const decimalBtn = document.querySelector('[data-decimal]');
let permitDecimal = true;

for (let index = 0; index < numberButtons.length; index++) {
   const btnNum = numberButtons[index];
   btnNum.addEventListener('click', (e) => {
      insert(e.target.textContent)
   })
};

for (let index = 0; index < operationButtons.length; index++) {
   const btnNum = operationButtons[index];
   btnNum.addEventListener('click', (e) => {
      insert(e.target.textContent)
   })
};

sqrtButton.addEventListener('click', (e) => {
   insert(e.target.dataset.sqrt)
});

expButton.addEventListener('click', (e) => {
   insert(e.target.dataset.mul)
});

decimalBtn.addEventListener('click', (e) => {
   insert(e.target.dataset.decimal)
});

allClearButton.addEventListener('click', clean);
deleteButton.addEventListener('click', back);
equalsButton.addEventListener('click', equal);

function insert(sym) {
   if (sym == 'sqrt' && currentOperandTextElement.textContent !== '' && !currentOperandTextElement.textContent.includes('-')) {
      let display = currentOperandTextElement.textContent;
      currentOperandTextElement.textContent = Math.sqrt(display)
   } else if (sym == 'sqrt' && currentOperandTextElement.textContent.includes('-')) {
      previousOperandTextElement.textContent = 'Ошибка';
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if (sym == 'sqrt' && currentOperandTextElement.textContent == '') {
      currentOperandTextElement.textContent = '√'
   } else if (sym == 'mul') {
      currentOperandTextElement.textContent += '^'
   } else if ((sym === 'decimal') && (permitDecimal) && currentOperandTextElement.textContent == '') {
      currentOperandTextElement.textContent += '0.'
      permitDecimal = false;
   } else if ((sym === 'decimal') && (permitDecimal)) {
      currentOperandTextElement.textContent += '.'
      permitDecimal = false;
   } else if ((sym === '+' || sym === '-' || sym === '*' || sym === '/') && !currentOperandTextElement.textContent.includes('√')) {
      currentOperandTextElement.textContent = currentOperandTextElement.textContent + sym;
      permitDecimal = true;
   } else if ((sym === '-') && currentOperandTextElement.textContent.includes('√') && currentOperandTextElement.textContent.length == 1) {
      currentOperandTextElement.textContent += sym;
      permitDecimal = true;
   } else if ((sym === '-') && currentOperandTextElement.textContent.includes('√') && currentOperandTextElement.textContent.includes('-')) {
      previousOperandTextElement.textContent = 'Ошибка';
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if ((sym === '-') && currentOperandTextElement.textContent.includes('√') && !currentOperandTextElement.textContent.includes('-')) {
      let display = currentOperandTextElement.textContent;
      currentOperandTextElement.textContent = Math.sqrt(display.slice(display.lastIndexOf('√') + 1)) + sym;
      permitDecimal = true;
   } else if ((sym === '+' || sym === '*' || sym === '/') && currentOperandTextElement.textContent.includes('√') && !currentOperandTextElement.textContent.includes('-')) {
      let display = currentOperandTextElement.textContent;
      currentOperandTextElement.textContent = Math.sqrt(display.slice(display.lastIndexOf('√') + 1)) + sym;
      permitDecimal = true;
   } else if ((sym === '+' || sym === '*' || sym === '/') && currentOperandTextElement.textContent.includes('√') && currentOperandTextElement.textContent.includes('-')) {
      previousOperandTextElement.textContent = 'Ошибка';
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if (sym !== 'decimal' && currentOperandTextElement.textContent === '√') {
      currentOperandTextElement.textContent = currentOperandTextElement.textContent + sym;
   } else if (sym !== 'decimal' && currentOperandTextElement.textContent !== '√') {
      currentOperandTextElement.textContent = currentOperandTextElement.textContent + sym;
   }
};

function clean() {
   currentOperandTextElement.textContent = '';
   previousOperandTextElement.textContent = '';
   permitDecimal = true;
}

function back() {
   let display = currentOperandTextElement.textContent;
   currentOperandTextElement.textContent = display.slice(0, display.length - 1)
}

function equal() {
   if (currentOperandTextElement.textContent.includes('√') && !currentOperandTextElement.textContent.includes('-')) {
      let display = currentOperandTextElement.textContent;
      previousOperandTextElement.textContent = Math.sqrt(display.slice(display.lastIndexOf('√') + 1));
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if (currentOperandTextElement.textContent.includes('√') && currentOperandTextElement.textContent.includes('-')) {
      previousOperandTextElement.textContent = 'Ошибка';
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if (currentOperandTextElement.textContent.includes('^')) {
      let display = currentOperandTextElement.textContent;
      previousOperandTextElement.textContent = Math.pow(display.slice(0, display.lastIndexOf('^')), display.slice(display.lastIndexOf('^') + 1));
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if ((eval(currentOperandTextElement.textContent).toString().includes('00000000') === true) && !currentOperandTextElement.textContent.includes('-')) {
      let firstNull = eval(currentOperandTextElement.textContent).toString().indexOf('0', 3)
      console.log(firstNull)
      let display = eval(currentOperandTextElement.textContent).toString().slice(0, firstNull);
      previousOperandTextElement.textContent = display;
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if ((eval(currentOperandTextElement.textContent).toString().includes('00000000') === true) && currentOperandTextElement.textContent.includes('-') && currentOperandTextElement.textContent.toString().indexOf('0') !== 0) {
      let firstNull = eval(currentOperandTextElement.textContent).toString().indexOf('0', 4)
      console.log(firstNull)
      let display = eval(currentOperandTextElement.textContent).toString().slice(0, firstNull);
      previousOperandTextElement.textContent = display;
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else if ((eval(currentOperandTextElement.textContent).toString().includes('00000000') === true) && currentOperandTextElement.textContent.includes('-') && currentOperandTextElement.textContent.toString().indexOf('0') === 0) {
      let firstNull = eval(currentOperandTextElement.textContent).toString().indexOf('0', 3)
      console.log(firstNull)
      let display = eval(currentOperandTextElement.textContent).toString().slice(0, firstNull);
      previousOperandTextElement.textContent = display;
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   } else {
      console.log(eval(currentOperandTextElement.textContent).toString().includes('00000000'))
      let res = currentOperandTextElement.textContent;
      previousOperandTextElement.textContent = eval(res);
      currentOperandTextElement.textContent = '';
      permitDecimal = true;
   }
}