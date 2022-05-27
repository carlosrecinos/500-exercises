import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { SQUARE_SIZE } from './constants';
const ANIMATION_DURATION = 100;
const ANIMATION_DELAY = 0;

export const takeOut = (boxes = [], i) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    box.fill = "#6e3028";
    const { y } = box.position
    const target = { x: box.position.x, y: box.position.y + SQUARE_SIZE + 3 }
    const takeOut = new TWEEN.Tween(box).to(target, ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onUpdate(function (box, elapsed) {
        box.position.y = y + (TWEEN.Easing.Linear.None(elapsed) * 100);
      })
      .onComplete(function (position) {
        resolve();
      })
    takeOut.start();
  })
}

export const putIn = (boxes = [], i) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const { y } = box.position
    const target = { x: box.position.x, y: box.position.y - (SQUARE_SIZE + 3) }
    const putIn = new TWEEN.Tween(box).to(target, ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onUpdate(function (box, elapsed) {
        box.position.y = y - (TWEEN.Easing.Linear.None(elapsed) * 100);
      })
      .onComplete(function (box) {
        box.fill = "#28666E";
        resolve();
      })
    putIn.start();
  })
}

// Requires items to be already taken out for better
export const traverse = (boxes = [], src, dst) => new Promise((resolve, reject) => {
  const aux = boxes[dst];
  const box = boxes[src]
  const { x } = box.position

  const multiplier = dst - src;
  const target = { x: box.position.x + SQUARE_SIZE * multiplier, y: box.position.y }
  const move1 = new TWEEN.Tween(box).to(target, ANIMATION_DURATION).delay(ANIMATION_DELAY)
    .onUpdate(function (box, elapsed) {
      box.position.x = x + (multiplier * (TWEEN.Easing.Linear.None(elapsed) * 100));
    })
    .onComplete((box) => {
      boxes[dst] = boxes[src];
    })

  const box2 = boxes[dst]
  const x2 = box2.position.x
  const multiplier2 = src - dst;
  const target2 = { x: box2.position.x + SQUARE_SIZE * multiplier2, y: box2.position.y }
  const move2 = new TWEEN.Tween(box2).to(target2, ANIMATION_DURATION).delay(ANIMATION_DELAY + 10)
    .onUpdate(function (box, elapsed) {
      box.position.x = x2 + (multiplier2 * (TWEEN.Easing.Linear.None(elapsed) * 100));
    })
    .onComplete((box) => {
      boxes[src] = aux;
      resolve(boxes)
    })

  move1.start()
  move2.start()
})

export const accessValue = async (boxes = [], i = 0) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    if (!box) {
      resolve();
    }
    box.fill = "#6e3028";
    const changeColor = new TWEEN.Tween(box).duration(ANIMATION_DURATION).delay(ANIMATION_DELAY)
    .onComplete(async (box) => {
      box.fill = "#28666E";
      resolve(box.children[1].value);
    })
    changeColor.start();
  })
}

export const readValue = async (boxes = [], i = 0) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const changeColor = new TWEEN.Tween(box).duration(ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onUpdate(() => {
        box.fill = "#6e3028";
      })
      .onComplete(async (box) => {
        await takeOut(boxes, i)
        resolve();
      })
    changeColor.start();
  })
}

export const updateMapSlot = async (boxes = new Map(), key = 1, value) => {
  return new Promise(async (resolve, reject) => {
    const exists = boxes.has(key);
    const box = exists ? boxes.get(key) : boxes.get(0)
    const valueText = box.children[1]
    const keyText = box.children[3]
    valueText.value = value
    keyText.value = key
    box.fill = "#6e3028";
    
    const changeColor = new TWEEN.Tween(box).duration(ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onComplete(async (box) => {
        if (!exists) {
          boxes.set(key, box);
        }
        resolve(boxes);
      })
    changeColor.start();
  })
}

export const switchPositions = async (boxes, from, to) => {
  return new Promise(async (resolve, reject) => {


    readValue(boxes, from)
    await readValue(boxes, to)

    boxes = await traverse(boxes, from, to)

    putIn(boxes, from, to)
    await putIn(boxes, to, from)

    resolve(boxes)
  })
}

export const createSlot = (e, i) => {
  const padding = (SQUARE_SIZE / 2) + 3
  const x = (SQUARE_SIZE * i) + padding
  const y = padding

  var box = new Two.Rectangle(x, y, SQUARE_SIZE, SQUARE_SIZE);
  box.fill = '#28666E';
  box.stroke = '#033F63';
  box.linewidth = 5;

  const valueText = new Two.Text(e, x, padding, 'normal');
  valueText.fill = '#ffffff';
  valueText.stroke = '#ffffff';
  valueText.size = 18

  const boxGroup = new Two.Group(box, valueText);
  return boxGroup;
}

export const createKeyValueSlot = (k, v, i) => {
  const padding = (SQUARE_SIZE / 2) + 3
  const x = (SQUARE_SIZE * i) + padding
  const y = padding

  var box = new Two.Rectangle(x, y, SQUARE_SIZE, SQUARE_SIZE);
  box.fill = '#28666E';
  box.stroke = '#033F63';
  box.linewidth = 5;

  const valueText = new Two.Text(v, x, padding - 10, 'normal');
  valueText.fill = '#ffffff';
  valueText.stroke = '#ffffff';
  valueText.size = 18

  var separator = new Two.Rectangle(x, padding + 26, SQUARE_SIZE, 1);
  separator.fill = "#033F63"
  separator.stroke = "#033F63"
  separator.linewidth = 5

  const keyText = new Two.Text(k, x, padding + 40, 'normal');
  keyText.bor = '#033F63';
  keyText.stroke = '#eeeeee';
  keyText.size = 12

  const boxGroup = new Two.Group(box, valueText, separator, keyText);
  return boxGroup;
}