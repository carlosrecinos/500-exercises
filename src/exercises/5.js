/*
Find the largest subarray formed by consecutive integers
Given an integer array, find the largest subarray formed by consecutive integers. The subarray should contain all distinct values.

Input:  { 2, 0, 2, 1, 4, 3, 1, 0 }
 
Output: The largest subarray is { 0, 2, 1, 4, 3 }
*/

const { createArray, randomNumberBetween } = require("./utils");

const findLargestConsecutiveArray = () => {
  const input = [2, 1, 2, 3, 4, 6, 1, 2, 3, 5, 1, 2];
  let current = [];
  let longest = [];
  console.log(input)

  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (element === 1) {
      if (current.length > longest.length) {
        longest = current
      }
      current = [];
      current.push(element);
    } else {
      let isConsecutive = current[i - 1] ? current[i - 1] + 1 === element : false;
      if (isConsecutive) {
        current.push(element);
      } else {
        if (current.length > longest.length) {
          longest = current
          current = [];
        }
      }
    }
    console.log(`i: ${i}, isConsecutive: ${isConsecutive}`)
  }
  return longest
}

console.log("Largest consecutive array: ", findLargestConsecutiveArray());