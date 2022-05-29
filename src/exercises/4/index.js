/*

Given a limited range array of size n containing elements between 1 and n-1 with one element repeating, 
find the duplicate number in it without using any extra space.
*/

import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { ExerciseWrapper } from '../../components/ExerciseWrapper'
import { accessValue, createKeyValueSlot, createSlot, takeOut, updateMapSlot } from '../../utils/animations';
import { createArray } from '../../utils';

let input = createArray(8, 0, 10);

export const FindDuplicatedElement = () => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  useEffect(() => {
    var two = new Two({
      type: Two.Types.svg,
      width: inputRef.current.offsetWidth,
      height: 210,
    }).appendTo(inputRef.current);

    var two2 = new Two({
      type: Two.Types.svg,
      width: outputRef.current.offsetWidth,
      height: 210,
    }).appendTo(outputRef.current);

    var slots = [];
    var slotsGroup = new Two.Group();

    var mapSlots = new Map();
    var outputSlotsGroup = new Two.Group();

    input.forEach((e, i) => {
      const slotGroup = createSlot(e, i)
      slots.push(slotGroup)
      slotsGroup.add(slotGroup);
      i += 1;
    })

    two.add(slotsGroup);
    two2.add(outputSlotsGroup);

    two.bind('update', function () {
      TWEEN.update();
    }).play();

    two2.bind('update', function () {
      TWEEN.update();
    }).play();

    const addMapValue = async (map, key, value) => {
      const i = mapSlots.size - 1
      if (!map.has(key)) {
        const slotGroup = createKeyValueSlot(key, value, i)
        mapSlots.set(key, slotGroup)
        outputSlotsGroup.add(slotGroup);
      }
      map.set(key, value)
      await updateMapSlot(mapSlots, key, value);
    }

    const findDuplicatedElement = async (elements) => {
      const map = new Map();
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        await accessValue(slots, i);
        if (map.has(element)) {
          await takeOut(slots, i);
          return element
        } else {
          await addMapValue(map, element, i)
        }
      }
    }

    const addOutputValue = async (i, value) => {
      const slotGroup = createSlot(value, i)
      outputSlotsGroup.add(slotGroup);
    }

    const startAlgorithm = async () => {
      const subArrays = await findDuplicatedElement(input);
      for (let i = 0; i < subArrays.length; i++) {
        const element = subArrays[i];
        addOutputValue(i, element)
      }
    }
    startAlgorithm();
  }, [])
  return (
    <ExerciseWrapper
      input={`[${input.map((e) => e)}]`}
      title="Find the duplicate element in a limited range array"
      message="Given a binary array, sort it in linear time and constant space. The output should print all zeroes, followed by all ones.">
      <div style={{ width: '100%' }} ref={inputRef} />
      <div style={{ width: '100%' }} ref={outputRef} />
    </ExerciseWrapper>
  )
}