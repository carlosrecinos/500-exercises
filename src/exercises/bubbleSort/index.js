import * as TWEEN from '@tweenjs/tween.js';
import { useEffect, useRef, useState } from 'react';
import Two from 'two.js';
import { accessValue, createSlot, switchPositions } from '../../utils/animations';
import { createArray } from '../../utils/';

export const BubbleSort = () => {
  const ref = useRef(null);
  const [input, setInput] = useState(createArray(8, -1000, 1000));
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

    const bubbleSort = async (arr, n) => {
      var i, j, temp;
      var swapped;
      for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
          accessValue(slots, j)
          await accessValue(slots, j + 1)

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
      await bubbleSort(input, input.length);
    }

    startAlgorithm();
  }, [])

  return <div>
    <h1>Bubble sort</h1>
    <h3>Given an array sort the elements.</h3>
    <h3>[{input.map((e) => `${e}, `)}]</h3>
    <div style={{ width: '100%' }} ref={ref} />
  </div>
}
