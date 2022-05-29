

import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { createArray, randomNumberBetween } from '../../utils'
import { accessValue, createSlot, takeOut } from '../../utils/animations';

let input = createArray(8, 1, 5);
let sum = randomNumberBetween(5, 10);

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

    const findPair = async () => {
      let pair;
      for (let i = 1; i < input.length; i++) {
        let prev = input[i - 1];
        accessValue(slots, i - 1)
        await accessValue(slots, i)
        if (prev + input[i] === sum) {
          pair = [prev, input[i]];
          takeOut(slots, i - 1)
          await takeOut(slots, i)
          break
        }
        prev = input[i];
      }
      if (!pair) {
        console.log("No pair found");
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
      <h3>[{input.map((e) => `${e}, `)}], SUM = {sum}</h3>
      <div style={{ width: '100%' }} ref={ref} />
    </div>
  )
}
export default FindPair;

// DONE!
