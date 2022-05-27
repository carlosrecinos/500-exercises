/*
Sort binary array in linear time
Given a binary array, sort it in linear time and constant space. 
The output should print all zeroes, followed by all ones.
*/


const { createArray } = require("./utils");
const size = 5;
const input = createArray(size, 0, 1);

const sortBinaryArray = () => {
  let count = 0;
  const newArray = new Array(size);
  newArray.fill(1);
  input.forEach((element, index) => {
    if (element === 0) {
      count += 1;
    }
  })
  for (let i = 0; i < count; i++) {
    newArray[i] = 0;
  }
  return newArray;
}

const sortedBinaryArray = sortBinaryArray();

console.log("Input: ", input);
console.log("Sorted binary array: ", sortedBinaryArray);