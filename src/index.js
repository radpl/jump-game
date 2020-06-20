import { Application as PIXIApplication } from 'pixi.js';
import { setupKeyboardEvents, hitTest, detectBoundaries } from './utils';
import { drawCircle, drawLine, drawRect } from './shapes';

const app = new PIXIApplication({ width: 1024, height: 512 });
document.body.appendChild(app.view);

const line = drawLine(app.renderer.view.width);
app.stage.addChild(line);

const arr = [1064, 1100, 1200, 1300, 1500, 1800];
const rects = [];
arr.forEach((el) => {
  const rectangle = drawRect(el);
  app.stage.addChild(rectangle);
  rects.push(rectangle);
});

const circle = drawCircle();
app.stage.addChild(circle);

// Listen for frame updates
app.ticker.add(() => {

  rects.forEach((rectangle) => { rectangle.handleRedraw() });

  circle.handleMovement();

  const col = rects.some((rectangle) => hitTest(circle, rectangle));

  circle.hitDetected(col);

  var boundaries = detectBoundaries(circle,
    {
      x: 0, y: 0, width: app.renderer.view.width, height: app.renderer.view.height - 50,
    });
  circle.boundariesDetected(boundaries);

});

setupKeyboardEvents(circle);
