/*
Input:  { 2, 0, 2, 1, 4, 3, 1, 0 }
Output: The largest subarray is { 0, 2, 1, 4, 3 }
*/

import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { ExerciseWrapper } from '../../components/ExerciseWrapper'
import { accessValue, createSlot, switchPositions } from '../../utils/animations';
import { createArray } from '../../utils'

let input = createArray(8, 0, 2);

export const DutchNationalFlag = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    var two = new Two({
      type: Two.Types.svg,
      width: inputRef.current.offsetWidth,
      height: 210,
    }).appendTo(inputRef.current);

    var slots = [];
    var slotsGroup = new Two.Group();

    input.forEach((e, i) => {
      let color, textColor;
      switch (e) {
        case 0:
          color = '#990000';
          textColor = '#fff';
          break;
        case 1:
          color = '#fff';
          textColor = '#000';
          break;
        case 2:
          color = '#002350';
          textColor = '#fff';
          break;

        default:
          color = '#28666E';
          textColor = '#fff';
          break;
      }
      const slotGroup = createSlot(e, i, color, textColor)
      slots.push(slotGroup)
      slotsGroup.add(slotGroup);
      i += 1;
    })

    two.add(slotsGroup);

    two.bind('update', function () {
      TWEEN.update();
    }).play();

    const swap = (a = [], i, j) => {
      const temp = a[i]
      a[i] = a[j]
      a[j] = temp
      return a
    }

    const sort = async (arr = [], end = arr.length - 1) => {
      let pivot = 1;
      let start = 0, mid = 0;
      while (mid <= end) {
        const current = arr[mid];
        await accessValue(slots, mid)
        if (current < pivot) {
          arr = swap(arr, start, mid);
          slots = await switchPositions(slots, start, mid)
          start += 1;
          mid += 1;
        } else if (current > pivot) {
          arr = swap(arr, mid, end);
          slots = await switchPositions(slots, mid, end)
          end -= 1;
        } else {
          mid += 1;
        }
      }
      return arr
    }


    const startAlgorithm = async () => {
      await sort(input);
    }
    startAlgorithm();
  }, [])
  return (
    <ExerciseWrapper
      input={`[${input.map((e) => e)}]`}
      title="Sort an array of 0’s, 1’s, and 2’s (Dutch National Flag Problem)"
      message="Given an array containing only 0’s, 1’s, and 2’s, sort it in linear time and using constant space.">
      <div style={{ width: '100%' }} ref={inputRef} />
    </ExerciseWrapper>
  )
}