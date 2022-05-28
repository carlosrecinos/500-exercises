import { useEffect, useRef, useState } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { createArray, randomNumberBetween, sleep } from '../../utils'
import { accessValue, createKeyValueSlot, createSlot, putIn, switchPositions, takeOut, updateMapSlot } from '../../utils/animations';

let input = createArray(8, -5, 5);

export const Find0SumSubarray = () => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [sum, setSum] = useState(0)
  useEffect(() => {

    var two = new Two({
      type: Two.Types.svg,
      width: mapRef.current.offsetWidth,
      height: 210,
    }).appendTo(mapRef.current);

    var two2 = new Two({
      type: Two.Types.svg,
      width: inputRef.current.offsetWidth,
      height: 210,
    }).appendTo(inputRef.current);

    var slots = [];
    var slotsGroup = new Two.Group();

    var mapSlots = new Map();
    var mapGroup = new Two.Group();

    input.forEach((e, i) => {
      const slotGroup = createSlot(e, i)
      slots.push(slotGroup)
      slotsGroup.add(slotGroup);
      i += 1;
    })

    two.add(mapGroup);
    two2.add(slotsGroup);

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
        mapGroup.add(slotGroup);
      }
      map.set(key, value)
      await updateMapSlot(mapSlots, key, value);
    }

    const findSubarraysWithZeroSum = async () => {
      return new Promise(async (resolve, reject) => {
        const map = new Map();
        await addMapValue(map, 0, [-1])
        let sum = 0;
        const subArrays = []
        for (let i = 0; i < input.length; i++) {
          sum += input[i];
          setSum(sum + input[i])
          await accessValue(slots, i)
          if (map.has(sum)) {
            const list = map.get(sum);
            list.forEach(value => {
              subArrays.push({ start: value + 1, end: i })
            })
          }
          const prev = map.get(sum) || [];
          const newValue = [...prev, i]
          await addMapValue(map, sum, newValue)
        }
        resolve(subArrays)
      })
    };

    const startAlgorithm = async () => {
      const subArrays = await findSubarraysWithZeroSum(input, input.length);
      console.log("Found subarrays: ", subArrays);
      for (let i = 0; i < subArrays.length; i++) {
        const subArray = subArrays[i];
        for (let i = subArray.start; i <= subArray.end; i++) {
          if (i < subArray.end) {
            takeOut(slots, i)
          } else {
            await takeOut(slots, i)
            await sleep(100)

          }
        }

        for (let i = subArray.start; i <= subArray.end; i++) {
          if (i < subArray.end) {
            putIn(slots, i)
          } else {
            await putIn(slots, i)
            await sleep(100)

          }
        }
      }
    }

    startAlgorithm();
  }, [])
  return (
    <div>
      <h1>Print all subarrays with 0 sum</h1>
      <h3>Given an integer array, print all subarrays with zero-sum.</h3>
      <h3>[{input.map((e) => `${e}, `)}] - Current elements SUM = [{sum}]</h3>
      <div style={{ width: '100%' }} ref={inputRef} />
      <div style={{ width: '100%' }} ref={mapRef} />
    </div>
  )
}
export default Find0SumSubarray;
