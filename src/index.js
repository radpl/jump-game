import { Application as PIXIApplication, Graphics } from 'pixi.js';
import { setupKeyboardEvents, hitTest, detectBoundaries, randomIntFromInterval, detectOutside } from './utils';
import { drawCircle, drawLine, drawRect, drawReward } from './shapes';

const app = new PIXIApplication({ width: 800, height: 412 });
document.body.appendChild(app.view);

const linePosition = app.renderer.view.height - 30;
const line = drawLine(app.renderer.view.width, linePosition);
app.stage.addChild(line);

const arrlength = 10;
const rects = [];
const rewards = [];

for (let i = 0; i < arrlength; i++) {
  let positionY = linePosition;
  if (i % 2 === 0)
    positionY = linePosition - 150;
  const positionX = randomIntFromInterval(app.renderer.view.width, app.renderer.view.width + 50) + i * 150;
  const rectangle = drawRect(positionX, positionY);
  app.stage.addChild(rectangle);
  rects.push(rectangle);

  //draw rewards
  for (let j = 5; j < 150; j += 15) {
    const rew = drawReward(rectangle.x, rectangle.y - 17, j);
    rectangle.rewards.push(rew);
    rewards.push(rew);
    app.stage.addChild(rew);
  }

}




const circle = drawCircle(linePosition, 0.45);
app.stage.addChild(circle);

// const circle2 = new Graphics();
// circle2.beginFill(0xAAAAAA);
// circle2.lineStyle(1, 26112, 1);
// //circle2.arc(0, 0, 15, arcAngle, 2 * Math.PI - arcAngle, false);
// //circle2.arc(0, 0, 30, 0.25, 2 * Math.PI - 0.25, false);
// circle2.lineTo(0, 0);
// circle2.arc(0, 0, 30, Math.PI + 0.25, Math.PI + 2 * Math.PI - 0.25, false);
// circle2.lineTo(0, 0);
// circle2.endFill();
// circle2.x = 100;
// circle2.y = 200;
// app.stage.addChild(circle2);

// Listen for frame updates
app.ticker.add(() => {

  rects.forEach((rectangle) => { rectangle.handleRedraw() });

  const col = rects.some((rectangle) => hitTest(circle, rectangle));
  circle.hitDetected(col);

  rewards.forEach(reward => {
    const col = hitTest(circle, reward);
    if (col) reward.renderReward = false;
  })

  boundaries = detectBoundaries(circle, { x: 5, y: 5, width: app.renderer.view.width, height: linePosition + 15, });
  circle.boundariesDetected(boundaries);

  let boundaries = {};
  for (let i = 0; i < rects.length; i++) {
    boundaries = detectOutside(circle, rects[i]);
    if (boundaries) {
      circle.boundariesDetected(boundaries);
      break;
    }
  }

  circle.handleMovement();





});

setupKeyboardEvents(circle);
