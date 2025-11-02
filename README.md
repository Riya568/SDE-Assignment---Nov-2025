# Merge Discontinuous Time Ranges

A Node.js module that merges overlapping or closely spaced time ranges within a given threshold.

## Problem Description

Given an array of time ranges representing when a system was active, this module merges ranges that:
- Overlap with each other
- Are separated by gaps smaller than a specified threshold

Each range is represented as `[start, end]` where:
- `start` and `end` are UNIX timestamps in milliseconds
- The range includes `start` but excludes `end` (half-open interval)

## Installation

No external dependencies required. Just ensure you have Node.js installed.

```bash
node --version  # Should be v12 or higher
```

## Usage

### Basic Usage

```javascript
const { mergeTimeRanges } = require('./mergeTimeRanges.js');

const ranges = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],
  [8000, 9000],
  [9050, 9500]
];
const threshold = 200;

const result = mergeTimeRanges(ranges, threshold);
console.log(result);
// Output: [[1000, 2000], [2500, 4100], [8000, 9500]]
```

### API

```javascript
mergeTimeRanges(ranges, threshold)
```

**Parameters:**
- `ranges` (Array<[number, number]>): Array of [start, end) ranges (unsorted, may overlap)
- `threshold` (number): Max gap (in milliseconds) allowed between ranges to still be merged

**Returns:**
- `Array<[number, number]>`: Sorted, non-overlapping merged ranges

## Examples

### Example 1: Merging overlapping and closely spaced ranges

```javascript
const ranges = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],  // Overlaps with [2500, 4000]
  [8000, 9000],
  [9050, 9500]   // Gap of 50ms from [8000, 9000] (within threshold)
];
const threshold = 200;

mergeTimeRanges(ranges, threshold);
// Returns: [[1000, 2000], [2500, 4100], [8000, 9500]]
```

**Explanation:**
- `[2500, 4000]` and `[3900, 4100]` overlap → merged to `[2500, 4100]`
- `[8000, 9000]` and `[9050, 9500]` have gap of 50ms (≤ 200ms) → merged to `[8000, 9500]`
- Gap between `[1000, 2000]` and `[2500, 4000]` is 500ms (> 200ms) → kept separate

### Example 2: Gaps exceed threshold

```javascript
const ranges = [
  [0, 10],
  [15, 20],
  [25, 30]
];
const threshold = 4;

mergeTimeRanges(ranges, threshold);
// Returns: [[0, 10], [15, 20], [25, 30]]
```

**Explanation:**
- All gaps (5ms each) exceed the threshold (4ms) → no merging occurs

### Example 3: All gaps within threshold

```javascript
const ranges = [
  [0, 10],
  [12, 15],
  [17, 25],
  [27, 35]
];
const threshold = 3;

mergeTimeRanges(ranges, threshold);
// Returns: [[0, 35]]
```

**Explanation:**
- All gaps (2ms each) are within threshold (3ms) → all ranges merged into one

## Algorithm

1. **Sort** ranges by start time
2. **Iterate** through sorted ranges
3. **Merge** if ranges overlap or gap ≤ threshold
4. **Extend** merged range's end time to cover both ranges
5. **Return** sorted, non-overlapping merged ranges

**Time Complexity:** O(n log n) due to sorting  
**Space Complexity:** O(n) for the sorted array and result

## Running Tests

Create a test file:

```javascript
// test.js
const { mergeTimeRanges } = require('./mergeTimeRanges.js');

// Your test cases here
const ranges = [[1000, 2000], [2500, 4000]];
const threshold = 200;
console.log(mergeTimeRanges(ranges, threshold));
```

Run with:
```bash
node test.js
```

## Edge Cases

- Empty array: Returns `[]`
- Single range: Returns the range as-is
- Negative threshold: Function accepts it (though it should be non-negative in practice)
- Invalid input: Returns empty array

## License

This code is provided as part of a coding assignment.

