import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { createArray, randomNumberBetween, sleep } from '../../utils'
import { accessValue, createKeyValueSlot, createSlot, putIn, switchPositions, takeOut, updateMapSlot } from '../../utils/animations';

const input = createArray(8, 0, 1);

export const SortBinaryArray = () => {
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

    const sortBinaryArray = async () => {
      let count = 0;
      const newArray = new Array(input.length);
      newArray.fill(1);
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if (element === 0) {
          count += 1;
        }
        await accessValue(slots, i)
      }
      for (let i = 0; i < count; i++) {
        newArray[i] = 0;
      }

      console.log("Input", input)
      return newArray;
    }

    const addOutputValue = async (i, value) => {
      const slotGroup = createSlot(value, i)
      outputSlotsGroup.add(slotGroup);
    }

    const startAlgorithm = async () => {
      const subArrays = await sortBinaryArray(input, input.length);
      for (let i = 0; i < subArrays.length; i++) {
        const element = subArrays[i];
        addOutputValue(i, element)
        await sleep(50)
      }
    }
    startAlgorithm();
  }, [])
  return (
    <div>
      <h1>Sort binary array in linear time</h1>
      <h3>Given a binary array, sort it in linear time and constant space.</h3>
      <h3>The output should print all zeroes, followed by all ones.</h3>
      <br />
      <h3>[{input.map((e) => `${e}, `)}]</h3>
      <div style={{ width: '100%' }} ref={inputRef} />
      <div style={{ width: '100%' }} ref={outputRef} />
    </div>
  )
}