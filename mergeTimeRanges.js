/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
    if (!Array.isArray(ranges) || ranges.length === 0) return [];
  
    // Step 1: Sort ranges by start time
    const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  
    const merged = [];
    let [currStart, currEnd] = sorted[0];
  
    for (let i = 1; i < sorted.length; i++) {
      const [start, end] = sorted[i];
  
      // If overlapping OR gap ≤ threshold -> merge
      if (start <= currEnd + threshold) {
        currEnd = Math.max(currEnd, end);
      } else {
        merged.push([currStart, currEnd]);
        currStart = start;
        currEnd = end;
      }
    }
  
    // Add last range
    merged.push([currStart, currEnd]);
  
    return merged;
  };
  
  module.exports = {
    mergeTimeRanges
  };
  