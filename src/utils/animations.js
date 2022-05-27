import Two from 'two.js';
import * as TWEEN from '@tweenjs/tween.js';
import { SQUARE_SIZE } from './constants';

const ANIMATION_DURATION = 500;
const ANIMATION_DELAY = 0;

export const takeOut = (boxes = [], i) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const {y} = box.position
    const target = { x: box.position.x, y: box.position.y + SQUARE_SIZE + 3 }
    console.log(box.position, target)
        const takeOut = new TWEEN.Tween(box).to(target, ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onUpdate(function (box, elapsed) {
        box.position.y = y + (TWEEN.Easing.Linear.None(elapsed) * 100);
      })
      .onComplete(function (position) {
        position.fill = "#28666E";
        resolve();
      })
    takeOut.start();
  })
}

export const putIn = (boxes = [], i) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const {y} = box.position
    const target = { x: box.position.x, y: box.position.y - (SQUARE_SIZE + 3) }
    const putIn = new TWEEN.Tween(box).to(target, ANIMATION_DURATION).delay(ANIMATION_DELAY)
      .onUpdate(function (box, elapsed) {
        box.position.y = y - (TWEEN.Easing.Linear.None(elapsed) * 100);
      })
      .onComplete(function (box) {
        resolve();
      })
    putIn.start();
  })
}

// Requires items to be already taken out for better
export const traverse = (boxes = [], src, dst) => new Promise((resolve, reject) => {
  console.log(src, " -> ", dst)
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
  const multiplier2 = src - dst;
  const target2 = { x: box2.position.x + SQUARE_SIZE * multiplier2, y: box2.position.y }
  const move2 = new TWEEN.Tween(box2).to(target2, ANIMATION_DURATION).delay(ANIMATION_DELAY + 10)
    .onUpdate(function (box, elapsed) {
        box.position.x = x - (multiplier * (TWEEN.Easing.Linear.None(elapsed) * 100));
    })
    .onComplete((box) => {
      boxes[src] = aux;
      console.log(boxes.map(e => e.children[1].value))
      resolve(boxes)
    })

  move1.start()
  move2.start()
})

export const accessValue = async (boxes = [], i = 0) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const changeColor = new TWEEN.Tween(box).duration(0).delay(ANIMATION_DELAY)
      .onComplete(async (box) => {
        box.fill = "#28666E";
        resolve();
      })
    changeColor.start();
  })
}

export const readValue = async (boxes = [], i = 0) => {
  return new Promise((resolve, reject) => {
    const box = boxes[i]
    const changeColor = new TWEEN.Tween(box).duration(0).delay(ANIMATION_DELAY)
      .onComplete(async (box) => {
        box.fill = "#28666E";
        await takeOut(boxes, i)
        resolve();
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
  const y = padding
  const x = i * SQUARE_SIZE + padding;
  const relativeX = (SQUARE_SIZE * i) + (SQUARE_SIZE / 2) + 3

  var box = new Two.Rectangle(x, y, SQUARE_SIZE, SQUARE_SIZE);
  box.fill = '#28666E';
  box.stroke = '#033F63';
  box.linewidth = 5;

  const valueText = new Two.Text(e, relativeX, SQUARE_SIZE / 2, 'normal');
  valueText.fill = '#FFFFFF';
  valueText.stroke = '#FFFFFF';
  valueText.size = 18

  const boxGroup = new Two.Group(box, valueText);
  boxGroup.id = "box-" + e;
  return boxGroup;
}