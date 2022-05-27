import * as TWEEN from '@tweenjs/tween.js';
import { useEffect, useRef, useState } from 'react';
import Two from 'two.js';
import { accessValue, createSlot, putIn, readValue, switchPositions, takeOut, traverse,  } from '../../utils/animations';

export const Animation = () => {
  const ref = useRef(null);
  const [input, setInput] = useState([2,3,1]);
  useEffect(() => {
    var two = new Two({
      type: Two.Types.svg,
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

    const bubbleSort = async (arr, n) => {
      console.log("Bubble sorting =>: ", arr)
      var i, j, temp;
      var swapped;
      for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {

            
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
            const from = j, to = j + 1;
            await switchPositions(slots, from, to);
          }
        }

        if (swapped === false)
          break;
      }
      setInput(arr)
    }

    const startAlgorithm = async () => {
      // await bubbleSort(input, input.length);
      slots = await switchPositions(slots, 0, 1);
      slots = await switchPositions(slots, 1, 2);
      slots = await switchPositions(slots, 2, 0);
    }

    startAlgorithm();
    console.log('i fire once');
  }, [])
  console.log("Input: ", input);
  return <div ref={ref} />
}
