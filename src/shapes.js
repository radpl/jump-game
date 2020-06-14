/* eslint-disable no-param-reassign */
/* eslint-disable spaced-comment */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import * as PIXI from 'pixi.js';

export const drawCircle = () => {
  const newCircle = new PIXI.Graphics();
  newCircle.beginFill(0xAAAAAA);
  newCircle.lineStyle(1, 26112, 1);
  newCircle.drawCircle(0, 0, 15);
  newCircle.endFill();
  newCircle.x = 100;
  newCircle.y = 435;
  newCircle.vx = 0;
  newCircle.vy = 0;

  newCircle.accelerationX = 0;
  newCircle.accelerationY = 0;
  newCircle.frictionX = 1;
  newCircle.frictionY = 1;

  newCircle.speed = 0.2;

  newCircle.drag = 0.98;

  newCircle.applyAcceleration = function () {
    this.vx += this.accelerationX;
    this.vy += this.accelerationY * 3;
  };
  newCircle.applyFriction = function () {
    this.vx *= this.frictionX;
    this.vy *= this.frictionY;
  };
  newCircle.applyGravity = function () {
    this.vy += 0.1;
  };
  newCircle.applyVelocity = function () {
    this.x += this.vx;
    this.y += this.vy;
  };

  newCircle.hitDetected = function (check) {
    this.clear();
    if (check) {
      this.beginFill(0xFF0000);
    } else {
      this.beginFill(0xAAAAAA);
    }
    this.lineStyle(1, 26112, 1);
    this.drawCircle(0, 0, 15);
    this.endFill();
  };

  newCircle.boundariesDetected = function (boundaries) {
    if (boundaries) {
      if (boundaries.left === 0) {
        this.vx = -this.vx / 2;
        this.x = boundaries.left;
      }
      if (boundaries.right) {
        this.vx = -this.vx / 2;
        this.x = boundaries.right;
      }
      if (boundaries.top === 0) {
        this.vy = -this.vy / 2;
        this.y = boundaries.top;
      }
      if (boundaries.bottom) {
        this.vy = -this.vy / 2;
        this.y = boundaries.bottom;
      }
    }
  };

  return newCircle;
};

export const drawLine = (width) => {
  const newLine = new PIXI.Graphics();
  newLine.lineStyle(1, 0xFFFFFF, 1);
  newLine.moveTo(0, 450);
  newLine.lineTo(width, 450);

  return newLine;
};

export const drawRect = (orgX) => {
  const newRect = new PIXI.Graphics();
  newRect.redraw = function () {
    this.lineStyle(1, 0xFFFFFF, 1);
    this.drawRect(0, 0, 26, 46);
    this.alpha = 0.5;
    this.y = 404;
    this.orgX = orgX;
  };

  newRect.shouldRedraw = function () { return this.x + this.width < 0; };
  return newRect;
};
