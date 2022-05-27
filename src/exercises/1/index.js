

import { createArray, randomNumberBetween } from '../../utils'
import { Animation } from './Animation';
const findPair = () => {
  for (let i = 1; i < input.length; i++) {
    let prev = input[i - 1];
    if (prev + input[i] === sum) {
      return [prev, input[i]];
    }
    prev = input[i];
  }
}
let input = createArray(10, 0, 10);
let sum = randomNumberBetween(1, 10);

console.log("Given the array: ", input);
console.log("Find a pair with the given sum: ", sum);
const pair = findPair();

if (!pair) {
  console.log("No pair found");
} else {
  console.log("Pair found: ", pair);
}
const FindPair = () => {
  return (
    <div>
      <h1>Bubble sort</h1>
      {/* <h1>Find a pair with the given sum in an array</h1> */}
      {/* <h3>Given an unsorted integer array, find a pair with the given sum in it.</h3> */}
      <Animation />
    </div>
  )
}
export default FindPair;

// DONE!
