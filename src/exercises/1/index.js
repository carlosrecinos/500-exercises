

import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { createArray, randomNumberBetween } from '../../utils'
import { accessValue, createSlot, switchPositions } from '../../utils/animations';

let input = createArray(5, 0, 10);
let sum = randomNumberBetween(1, 10);

if (!pair) {
  console.log("No pair found");
} else {
  console.log("Pair found: ", pair);
}
const FindPair = () => {
  const ref = useRef(null);
  useEffect(() => {
    var two = new Two({
      type: Two.Types.svg,
      width: ref.current.offsetWidth,
      height: 210,
    }).appendTo(ref.current);

    var slotsGroup = new Two.Group();
    var slots = [];
    input.forEach((e, i) => {
      const slotGroup = createSlot(e, i)
      slots.push(slotGroup)
      slotsGroup.add(slotGroup);
    })
    two.add(slotsGroup);
    two.bind('update', function () {
      TWEEN.update();
    }).play();

    const findPair = () => {
      for (let i = 1; i < input.length; i++) {
        let prev = input[i - 1];
        if (prev + input[i] === sum) {
          return [prev, input[i]];
        }
        prev = input[i];
      }
    }

    const startAlgorithm = async () => {
      await findPair(input, input.length);
    }

    startAlgorithm();
  }, [])
  return (
    <div>
      <h1>Find pair within array</h1>
      <h3>Find a pair with the given sum in an array</h3>
      <h3>Given an unsorted integer array, find a pair with the given sum in it.</h3>
      <div style={{ width: '100%' }} ref={ref} />
    </div>
  )
}
export default FindPair;

// DONE!
