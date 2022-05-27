/* Print all subarrays with 0 sum
Given an integer array, print all subarrays with zero-sum. */

const { createArray } = require("./utils");

const input = [3, 4, 5, -5, 1, 2, -3]

const findSubarraysWithZeroSum = () => {
  const map = new Map();
  map.set(0, [-1]);
  let sum = 0;
  
  for (let i = 0; i < input.length; i++) {
    sum += input[i];
    if (map.has(sum)) {
      const list = map.get(sum);
      list.forEach(value => {
        console.log(`Sublist: (${value + 1}, ${i})`);
      })
    }
    const prev = map.get(sum) || [];
    map.set(sum, [...prev, i]);
  }
};

console.log(findSubarraysWithZeroSum());