import { useEffect, useRef } from 'react';
import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { createArray, randomNumberBetween } from '../../utils'
import { accessValue, createKeyValueSlot, createSlot, switchPositions, takeOut, updateMapSlot } from '../../utils/animations';

let input = [6, 3, -1, -3, 4, -2, 2];

export const Find0SumSubarray = () => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);

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
      const slotGroup = createKeyValueSlot(null, null, i)
      mapSlots.set(i, slotGroup)
      mapGroup.add(slotGroup);
      i += 1;
    })
    
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

    const findSubarraysWithZeroSum = async () => {
      const map = new Map();
      map.set(0, [-1]);
      let sum = 0;
      
      for (let i = 0; i < input.length; i++) {
        sum += input[i];
        await accessValue(slots, i)
        await accessValue(mapSlots, sum)
        if (map.has(sum)) {
          const list = map.get(sum);
          list.forEach(value => {
            console.log(`Sublist with 0 SUM: (${value + 1}, ${i})`);
          })
        }
        const prev = map.get(sum) || [];
        mapSlots = await updateMapSlot(mapSlots, sum, [...prev, i]);
        map.set(sum, [...prev, i]);
      }
    };

    const startAlgorithm = async () => {
      await findSubarraysWithZeroSum(input, input.length);
    }

    startAlgorithm();
  }, [])
  return (
    <div>
      <h1>Print all subarrays with 0 sum</h1>
      <h3>Given an integer array, print all subarrays with zero-sum.</h3>
      <h3>[{input.map((e) => `${e}, `)}]</h3>
      <div style={{ width: '100%' }} ref={inputRef} />
      <div style={{ width: '100%' }} ref={mapRef} />
    </div>
  )
}
export default Find0SumSubarray;
