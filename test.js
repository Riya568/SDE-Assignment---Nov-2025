const { mergeTimeRanges } = require('./mergeTimeRanges.js');

// Example from problem description
const ranges = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],
  [8000, 9000],
  [9050, 9500]
];
const threshold = 200;

console.log('Input:', ranges);
console.log('Threshold:', threshold);
console.log('Output:', mergeTimeRanges(ranges, threshold));

