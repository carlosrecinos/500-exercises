
export const randomNumberBetween = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createArray = (length, min = 0, max = 100) => {
  let arr = new Array(length || 0), i = length;
  arr.fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = randomNumberBetween(min, max);
  }
  return arr;
}

export const arraymove = (arr, fromIndex, toIndex) => {
  let copy = [...arr]
  var element = copy[fromIndex];
  copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, element);
  return copy;
}

export const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}