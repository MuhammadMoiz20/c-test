const math = require('../../src/math');
const strings = require('../../src/strings');
const arrays = require('../../src/arrays');

describe('Source File Tests', () => {
  it('should pass - math add function works correctly', () => {
    const result = math.add(5, 3);
    expect(result).to.equal(8);
  });

  it('should fail - math multiply gives wrong result', () => {
    const result = math.multiply(4, 5);
    expect(result).to.equal(100); // This will fail, actual is 20
  });

  describe('String Utilities', () => {
    it('should capitalize first letter', () => {
      const result = strings.capitalize('hello');
      expect(result).to.equal('Hello');
    });

    it('should detect palindromes', () => {
      const result = strings.isPalindrome('racecar');
      expect(result).to.be.true;
    });
  });

  describe('Array Utilities', () => {
    it('should calculate sum correctly', () => {
      const result = arrays.sum([1, 2, 3, 4, 5]);
      expect(result).to.equal(15);
    });

    it('should find maximum value', () => {
      const result = arrays.max([1, 5, 3, 9, 2]);
      expect(result).to.equal(9);
    });

    it('should get unique values', () => {
      const result = arrays.unique([1, 2, 2, 3, 3, 3]);
      expect(result).to.deep.equal([1, 2, 3]);
    });
  });
});
