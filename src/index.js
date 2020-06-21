import { Application as PIXIApplication, Graphics } from 'pixi.js';
import sound from 'pixi-sound';
import { setupKeyboardEvents, hitTest, detectBoundaries, randomIntFromInterval, detectOutside } from './utils';
import { drawCircle, drawLine, drawRect, drawReward } from './shapes';
import * as mySound from './sounds/car.mp3';


const app = new PIXIApplication({ width: 800, height: 412 });
document.body.appendChild(app.view);

const linePosition = app.renderer.view.height - 30;
const line = drawLine(app.renderer.view.width, linePosition);
app.stage.addChild(line);

app.loader.add('car', mySound.default).load(function () {
  //sound.play('car', { loop: true });
  app.render();
});
//sound.stop('car');
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
let gameScore = 0;
let gameScorePrev = 0;
let soundPlay = false;

// Listen for frame updates
document.getElementById("start").addEventListener("click", function () { app.ticker.start(); });
document.getElementById("pause").addEventListener("click", function () { app.ticker.stop(); sound.stop('car'); });

app.loader.load()
app.ticker.add(() => {

  rects.forEach((rectangle) => { rectangle.handleRedraw() });

  const col = rects.some((rectangle) => hitTest(circle, rectangle));
  circle.hitDetected(col);
  gameScorePrev = gameScore;
  rewards.forEach(reward => {
    const col = hitTest(circle, reward);
    if (col) {
      reward.renderReward = false
      gameScore++;
      document.getElementById("score").innerText = gameScore.toString().padStart(8, "0");
    };
  });

  if (gameScore > gameScorePrev && soundPlay === false) {
    sound.play('car', { loop: true })
    soundPlay = true;
  } else if (gameScore === gameScorePrev && soundPlay === true) {
    sound.stop('car');
    soundPlay = false;
  }
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

app.ticker.stop();
setupKeyboardEvents(circle);
