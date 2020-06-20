/* eslint-disable no-param-reassign */
/* eslint-disable spaced-comment */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import { Graphics as PIXIGraphics } from 'pixi.js';

export const drawCircle = () => {
  const newCircle = new PIXIGraphics();

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

  newCircle.handleMovement = function () {
    this.vx += this.accelerationX;
    this.vy += this.accelerationY * 3;
    this.vx *= this.frictionX;
    this.vy *= this.frictionY;
    this.vy += 0.1;
    this.x += this.vx;
    this.y += this.vy;
  }

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

  newCircle.keyUp = function (direction) {
    switch (direction) {
      case 'left':
        this.accelerationX = 0;
        this.frictionX = this.drag;
        break;
      case 'right':
        this.accelerationX = 0;
        this.frictionX = this.drag;
        break;
      case 'up':
        this.accelerationY = 0;
        this.frictionY = this.drag;
        break;
      case 'down':
        this.accelerationY = 0;
        this.frictionY = this.drag;
        break;
    }
  }

  newCircle.keyDown = function (direction) {
    switch (direction) {
      case 'left':
        this.accelerationX = -this.speed;
        this.frictionX = 1;
        break;
      case 'right':
        this.accelerationX = this.speed;
        this.frictionX = 1;
        break;
      case 'up':
        this.accelerationY = -this.speed;
        this.frictionY = 1;
        break;
      case 'down':
        this.accelerationY = this.speed;
        this.frictionY = 1;
        break;
    }
  }

  return newCircle;
};

export const drawLine = (width) => {
  const newLine = new PIXIGraphics();
  newLine.lineStyle(1, 0xFFFFFF, 1);
  newLine.moveTo(0, 450);
  newLine.lineTo(width, 450);

  return newLine;
};

export const drawRect = (orgX) => {
  const newRect = new PIXIGraphics();

  newRect.redraw = function () {
    this.lineStyle(1, 0xFFFFFF, 1);
    this.drawRect(0, 0, 26, 46);
    this.alpha = 0.5;
    this.y = 404;
    this.orgX = orgX;
  };

  newRect.shouldRedraw = function () { return this.x + this.width < 0; };

  newRect.handleRedraw = function () {
    if (this.shouldRedraw()) {
      this.clear();
      this.x = this.orgX;
    } else {
      this.clear();
      this.redraw();
      this.x -= 1;
    }
  }
  return newRect;
};
