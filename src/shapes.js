/* eslint-disable no-param-reassign */
/* eslint-disable spaced-comment */
/* eslint-disable func-names */
/* eslint-disable no-undef */
import { Graphics as PIXIGraphics } from 'pixi.js';

export const drawCircle = (positionY, arcAngle) => {
  const newCircle = new PIXIGraphics();

  newCircle.beginFill(0xAAAAAA);
  newCircle.lineStyle(1, 26112, 1);
  newCircle.x = 100;
  newCircle.y = positionY;
  //newCircle.drawCircle(0, 0, 15);
  newCircle.arc(0, 0, 15, arcAngle, 2 * Math.PI - arcAngle, false);
  //circle.arc(0, 0, 30, 0.25, 2 * Math.PI - 0.25, false);
  newCircle.lineTo(0, 0);
  newCircle.endFill();
  newCircle.x = 100;
  newCircle.y = positionY;
  newCircle.vx = 0;
  newCircle.vy = 0;
  newCircle.radius = 15;
  newCircle.arcAngle = arcAngle;
  newCircle.arcAngleSpeed = 0.05;
  newCircle.myDirection = false;

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
    if (this.arcAngle > 0.45 || this.arcAngle < 0) this.arcAngleSpeed = -this.arcAngleSpeed;
    this.arcAngle += this.arcAngleSpeed;
  }

  newCircle.hitDetected = function (check) {
    this.clear();
    if (check) {
      this.beginFill(0xFF0000);
    } else {
      this.beginFill(0xAAAAAA);
    }
    //console.log(this.arcAngle);
    this.lineStyle(1, 26112, 1);
    if (this.myDirection) {
      this.arc(0, 0, 15, Math.PI + this.arcAngle, Math.PI + 2 * Math.PI - this.arcAngle, false);
    } else {
      this.arc(0, 0, 15, this.arcAngle, 2 * Math.PI - this.arcAngle, false);

    }

    this.lineTo(0, 0);
    this.endFill();
  };

  newCircle.boundariesDetected = function (boundaries) {
    if (boundaries) {
      if (boundaries.left) {
        this.vx = -this.vx / 2;
        this.x = boundaries.left;
      }
      if (boundaries.right) {
        this.vx = -this.vx / 2;
        this.x = boundaries.right;
      }
      if (boundaries.top) {
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
        this.myDirection = true;
        break;
      case 'right':
        this.accelerationX = this.speed;
        this.frictionX = 1;
        this.myDirection = false;
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

export const drawLine = (width, positionY) => {
  const newLine = new PIXIGraphics();
  newLine.lineStyle(1, 0xFFFFFF, 1);
  newLine.moveTo(0, positionY);
  newLine.lineTo(width, positionY);

  return newLine;
};

export const drawReward = (x, y, pos) => {
  const newReward = new PIXIGraphics();
  //newReward.clear();
  newReward.beginFill(0xAAAAAA);
  newReward.lineStyle(1, 26112, 1);
  newReward.drawCircle(0, 0, 5);
  newReward.endFill();
  newReward.x = x + pos;
  newReward.pos = pos;
  newReward.y = y;
  newReward.renderReward = true;

  newReward.redraw = function (x, y) {
    if (this.renderReward) {
      this.clear();
      this.beginFill(0xAAAAAA);
      this.lineStyle(1, 26112, 1);
      this.drawCircle(0, 0, 5);
      this.endFill();
      this.x = x + this.pos;
      this.y = y;
    } else {
      this.clear();
    }

  }

  return newReward;

}

export const drawRect = (orgX, positionY) => {
  const newRect = new PIXIGraphics();
  newRect.rewards = [];
  newRect.redraw = function () {
    this.lineStyle(1, 0xFFFFFF, 1);
    this.drawRect(0, 0, 150, 46);
    this.alpha = 0.5;
    this.y = positionY - 46;
    this.orgX = orgX;

    for (let i = 0; i < this.rewards.length; i++) {
      this.rewards[i].redraw(this.x, this.y - 17);
    }
  };

  newRect.shouldRedraw = function () { return this.x + this.width < 0; };

  newRect.handleRedraw = function () {
    if (this.shouldRedraw()) {
      this.clear();
      this.x = this.orgX;
      for (let i = 0; i < this.rewards.length; i++) {
        this.rewards[i].renderReward = true;
      }
    } else {
      this.clear();
      this.redraw();
      this.x -= 1;
    }
  }
  return newRect;
};
