const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator Functions', () => {
  
  describe('Addition', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
    });

    test('should add positive and negative numbers', () => {
      expect(add(10, -4)).toBe(6);
    });

    test('should add zero', () => {
      expect(add(5, 0)).toBe(5);
    });

    test('should add floating point numbers', () => {
      expect(add(2.5, 3.7)).toBeCloseTo(6.2);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('should subtract negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    test('should subtract resulting in negative', () => {
      expect(subtract(3, 10)).toBe(-7);
    });

    test('should subtract zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });

    test('should subtract floating point numbers', () => {
      expect(subtract(10.5, 4.3)).toBeCloseTo(6.2);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test('should multiply by zero', () => {
      expect(multiply(100, 0)).toBe(0);
    });

    test('should multiply positive and negative numbers', () => {
      expect(multiply(10, -5)).toBe(-50);
    });

    test('should multiply two negative numbers', () => {
      expect(multiply(-3, -4)).toBe(12);
    });

    test('should multiply floating point numbers', () => {
      expect(multiply(2.5, 4)).toBe(10);
    });

    test('should multiply by one', () => {
      expect(multiply(42, 1)).toBe(42);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers', () => {
      expect(divide(20, 5)).toBe(4);
    });

    test('should divide positive and negative numbers', () => {
      expect(divide(10, -2)).toBe(-5);
    });

    test('should divide two negative numbers', () => {
      expect(divide(-10, -2)).toBe(5);
    });

    test('should divide resulting in decimal', () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 2);
    });

    test('should divide zero by a number', () => {
      expect(divide(0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('should throw error when dividing negative by zero', () => {
      expect(() => divide(-5, 0)).toThrow('Cannot divide by zero');
    });

    test('should divide one by a number', () => {
      expect(divide(1, 4)).toBe(0.25);
    });
  });

  describe('Integration Tests', () => {
    test('should handle example operations from image: 2 + 3', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should handle example operations from image: 10 - 4', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('should handle example operations from image: 45 * 2', () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test('should handle example operations from image: 20 / 5', () => {
      expect(divide(20, 5)).toBe(4);
    });
  });

  describe('Modulo', () => {
    test('should calculate modulo of two positive numbers', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo resulting in zero', () => {
      expect(modulo(10, 5)).toBe(0);
    });

    test('should calculate modulo with larger divisor', () => {
      expect(modulo(3, 10)).toBe(3);
    });

    test('should calculate modulo with negative dividend', () => {
      expect(modulo(-10, 3)).toBe(-1);
    });

    test('should calculate modulo with negative divisor', () => {
      expect(modulo(10, -3)).toBe(1);
    });

    test('should calculate modulo with two negative numbers', () => {
      expect(modulo(-10, -3)).toBe(-1);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot perform modulo with zero divisor');
    });

    test('should handle floating point modulo', () => {
      expect(modulo(5.5, 2)).toBeCloseTo(1.5);
    });
  });

  describe('Power', () => {
    test('should raise positive number to positive exponent', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('should raise number to zero exponent', () => {
      expect(power(5, 0)).toBe(1);
    });

    test('should raise number to power of one', () => {
      expect(power(42, 1)).toBe(42);
    });

    test('should raise number to negative exponent', () => {
      expect(power(2, -2)).toBe(0.25);
    });

    test('should raise negative number to even exponent', () => {
      expect(power(-2, 2)).toBe(4);
    });

    test('should raise negative number to odd exponent', () => {
      expect(power(-2, 3)).toBe(-8);
    });

    test('should raise to fractional exponent', () => {
      expect(power(4, 0.5)).toBe(2);
    });

    test('should calculate large powers', () => {
      expect(power(2, 10)).toBe(1024);
    });

    test('should handle zero to positive power', () => {
      expect(power(0, 5)).toBe(0);
    });
  });

  describe('Square Root', () => {
    test('should calculate square root of perfect square', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('should calculate square root of one', () => {
      expect(squareRoot(1)).toBe(1);
    });

    test('should calculate square root of zero', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('should calculate square root of non-perfect square', () => {
      expect(squareRoot(2)).toBeCloseTo(1.414, 2);
    });

    test('should calculate square root of large number', () => {
      expect(squareRoot(100)).toBe(10);
    });

    test('should calculate square root of decimal number', () => {
      expect(squareRoot(0.25)).toBe(0.5);
    });

    test('should throw error when calculating square root of negative number', () => {
      expect(() => squareRoot(-1)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for large negative numbers', () => {
      expect(() => squareRoot(-100)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should handle very small positive numbers', () => {
      expect(squareRoot(0.01)).toBe(0.1);
    });
  });

  describe('Extended Integration Tests', () => {
    test('should handle modulo from extended image: 5 % 2', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('should handle power from extended image: 2 ** 3', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('should handle square root from extended image: sqrt(16)', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('should combine operations: (10 % 3) + 2', () => {
      expect(add(modulo(10, 3), 2)).toBe(3);
    });

    test('should combine operations: 2 ** 3 * 2', () => {
      expect(multiply(power(2, 3), 2)).toBe(16);
    });

    test('should combine operations: sqrt(25) + sqrt(9)', () => {
      expect(add(squareRoot(25), squareRoot(9))).toBe(8);
    });
  });
});
