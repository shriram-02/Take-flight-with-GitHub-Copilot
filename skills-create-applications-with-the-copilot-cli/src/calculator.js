#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (**)
 * - Square Root (sqrt)
 */

/**
 * Performs addition on two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Performs subtraction on two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Performs multiplication on two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Performs division on two numbers
 * @param {number} a - First number (dividend)
 * @param {number} b - Second number (divisor)
 * @returns {number} Quotient of a and b
 * @throws {Error} If divisor is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Performs modulo operation on two numbers
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder of a divided by b
 * @throws {Error} If divisor is zero
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot perform modulo with zero divisor');
  }
  return a % b;
}

/**
 * Raises a number to a power
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} Base raised to the exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number
 * @param {number} n - The number to find the square root of
 * @returns {number} The square root of n
 * @throws {Error} If the number is negative
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of a negative number');
  }
  return Math.sqrt(n);
}

/**
 * Main calculator function that processes CLI arguments
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage:');
    console.log('  Binary operations: calculator.js <number1> <operation> <number2>');
    console.log('  Unary operations: calculator.js <operation> <number>');
    console.log('');
    console.log('Operations:');
    console.log('  Binary: + (add), - (subtract), * (multiply), / (divide), % (modulo), ** (power)');
    console.log('  Unary: sqrt (square root)');
    console.log('');
    console.log('Examples:');
    console.log('  calculator.js 10 + 5');
    console.log('  calculator.js 10 % 3');
    console.log('  calculator.js 2 ** 8');
    console.log('  calculator.js sqrt 16');
    process.exit(1);
  }

  let result;

  try {
    const operation = args[0];

    if (operation === 'sqrt') {
      if (args.length !== 2) {
        console.error('Error: sqrt requires exactly one argument');
        process.exit(1);
      }
      const num = parseFloat(args[1]);
      if (isNaN(num)) {
        console.error('Error: Argument must be a valid number');
        process.exit(1);
      }
      result = squareRoot(num);
      console.log(`sqrt(${num}) = ${result}`);
    } else {
      if (args.length !== 3) {
        console.error('Error: Binary operations require exactly three arguments');
        process.exit(1);
      }
      const num1 = parseFloat(args[0]);
      const op = args[1];
      const num2 = parseFloat(args[2]);

      if (isNaN(num1) || isNaN(num2)) {
        console.error('Error: Both arguments must be valid numbers');
        process.exit(1);
      }

      switch (op) {
        case '+':
          result = add(num1, num2);
          console.log(`${num1} + ${num2} = ${result}`);
          break;
        case '-':
          result = subtract(num1, num2);
          console.log(`${num1} - ${num2} = ${result}`);
          break;
        case '*':
          result = multiply(num1, num2);
          console.log(`${num1} * ${num2} = ${result}`);
          break;
        case '/':
          result = divide(num1, num2);
          console.log(`${num1} / ${num2} = ${result}`);
          break;
        case '%':
          result = modulo(num1, num2);
          console.log(`${num1} % ${num2} = ${result}`);
          break;
        case '**':
          result = power(num1, num2);
          console.log(`${num1} ** ${num2} = ${result}`);
          break;
        default:
          console.error(`Error: Invalid operation '${op}'. Use +, -, *, /, %, or **`);
          process.exit(1);
      }
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
