/*
Find the duplicate element in a limited range array
Given a limited range array of size n containing elements between 1 and n-1 with one element repeating, 
find the duplicate number in it without using any extra space.
*/

const { createArray } = require("./utils");

const elements = [1, 2, 3, 4, 4];
const map = new Map();

elements.forEach((element) => {
  if (map.has(element)) {
    console.log("Duplicated element: ", element);
  } else {
    map.set(element, 1);
  }
});

