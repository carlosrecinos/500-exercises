/*
Input:  { 2, 0, 2, 1, 4, 3, 1, 0 }
Output: The largest subarray is { 0, 2, 1, 4, 3 }
*/

import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { ExerciseWrapper } from '../../components/ExerciseWrapper'
import { accessValue, createKeyValueSlot, createSlot, putIn, readValue, switchPositions, takeOut, updateMapSlot } from '../../utils/animations';
import { sleep } from '../../utils';

const input = [2, 0, 2, 1, 4, 3, 1, 0];

export const LargestSubArrayContainingConsecutiveNumbers = () => {
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
      const slotGroup = createSlot(e, i)
      slots.push(slotGroup)
      slotsGroup.add(slotGroup);
      i += 1;
    })

    two.add(slotsGroup);

    two.bind('update', function () {
      TWEEN.update();
    }).play();

    const isConsecutive = (arr = [], i, j, min, max) => {
      if (max - min !== j - i) {
        return false
      }

      const visitedMap = new Map()
      for (let k = i; k <= j; k++) {
        const element = arr[k]
        if (visitedMap.has(element)) {
          return false
        }
        visitedMap.set(element, true)
      }
      return true
    }

    const findMaxSubArray = async () => {
      let start = 0, end = 0, len = 0
      for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
          const subArray = input.slice(i, j + 1)
          const min = Math.min(...subArray)
          const max = Math.max(...subArray)
          if (isConsecutive(input, i, j, min, max)) {
            const length = (max - min) + 1
            if (len < length) {
              start = i
              end = j
              len = length
            }
          }
        }
      }
      return { start, end }
    }


    const startAlgorithm = async () => {
      const { start, end } = await findMaxSubArray(input);
      console.log("Found max subarray", { start, end })

      for (let i = start; i <= end; i++) {
        if (i === end) {
          await takeOut(slots, i)
        } else {
          takeOut(slots, i)
        }
      }
    }
    startAlgorithm();
  }, [])
  return (
    <ExerciseWrapper
      input={`[${input.map((e) => e)}]`}
      title="Find the largest subarray formed by consecutive integers"
      message="Given an integer array, find the largest subarray formed by consecutive integers. The subarray should contain all distinct values. Given a limited range array of size n containing elements between 1 and n-1 with one element repeating, 
        find the duplicate number in it without using any extra space.">
      <div style={{ width: '100%' }} ref={inputRef} />
    </ExerciseWrapper>
  )
}