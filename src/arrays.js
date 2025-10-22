// Array utility functions

function sum(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}

function average(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

function max(arr) {
  return Math.max(...arr);
}

function min(arr) {
  return Math.min(...arr);
}

function unique(arr) {
  return [...new Set(arr)];
}

module.exports = {
  sum,
  average,
  max,
  min,
  unique
};
