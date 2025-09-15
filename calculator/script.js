let buttons = document.querySelectorAll(".button-Container button");
let input = document.getElementById("inp");
let signButtons = document.querySelectorAll('.button-sign button')
const functionButtons = document.querySelectorAll('.function-button button');


functionButtons.forEach((value) => {
    value.addEventListener('click', (e) => {
        let target = e.currentTarget.value;
        if (target == "c") {
            input.value = "";
        }
        else if (target == "=") {
         let result=   finnalResult(input.value);
         input.value= result;
        }
    })
})

signButtons.forEach((value) => {
    value.addEventListener('click', (e) => {
        let sign = e.currentTarget.value;
        input.value += sign;
    })
})
buttons.forEach((value) => {
    value.addEventListener('click', (e) => {
        let currunt = e.currentTarget.value;
        input.value += currunt;
    })
});
function finnalResult(value) {

    let num = value.split(/[\+\-\*\/]/)
    let operator = value.match(/[\+\-\*\/]/g);
    let result = Number.parseFloat(num.shift());
    operator.forEach((value, index) => {

        if (value == '*') {
            result *= num[index]
        } else if (value == '-') {
            result -= num[index]
        } else if (value == '+') {

        } else if (value == '/') {
            result /= num[index]
        }else{
            input.value="invalid opreator"
        }

        
        
    })
    return result;
}



















// let number = "9+5*8/10-52+85-96*8/40";
// // Function to parse and calculate the result of the expression
// function calculate(expression) {
//     let numbers = expression.split(/[\+\-\*\/]/); // Split the string by operators (+, -, *, /)
//     let operators = expression.match(/[\+\-\*\/]/g); // Get all operators
//     console.log(numbers)
//     // Start with the first number
//     let result = parseFloat(numbers.shift());

//     // Iterate over the numbers and operators
//     for (let i = 0; i < operators.length; i++) {
//         let num = parseFloat(numbers[i]);
//         let operator = operators[i];
//         console.log(num)

//         // Perform arithmetic operation based on the operator
//         switch (operator) {
//             case '+':
//                 result += num;
//                 break;
//             case '-':
//                 result -= num;
//                 break;
//             case '*':
//                 result *= num;
//                 break;
//             case '/':
//                 result /= num;
//                 break;
//             default:
//                 throw new Error('Invalid operator: ' + operator);
//         }
//     }
//     return result;
// }

// let result = calculate(number);
// console.log(result); // Output will be 2



