import { Application as PIXIApplication } from 'pixi.js';
import { setupKeyboardEvents, hitTest, detectBoundaries, randomIntFromInterval, detectOutside } from './utils';
import { drawCircle, drawLine, drawRect } from './shapes';

const app = new PIXIApplication({ width: 800, height: 412 });
document.body.appendChild(app.view);

const linePosition = app.renderer.view.height - 30;
const line = drawLine(app.renderer.view.width, linePosition);
app.stage.addChild(line);

const arrlength = 10;
const rects = [];
for (let i = 0; i < arrlength; i++) {
  let positionY = linePosition;
  if (i % 2 === 0)
    positionY = randomIntFromInterval(250, 280);
  const positionX = randomIntFromInterval(1064, 2000);
  const rectangle = drawRect(positionX, positionY);
  app.stage.addChild(rectangle);
  rects.push(rectangle);
}

const circle = drawCircle(linePosition);
app.stage.addChild(circle);

// Listen for frame updates
app.ticker.add(() => {

  rects.forEach((rectangle) => { rectangle.handleRedraw() });

  const col = rects.some((rectangle) => hitTest(circle, rectangle));
  circle.hitDetected(col);

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
