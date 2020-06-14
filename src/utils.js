/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* eslint-disable import/prefer-default-export */

function Keyboard(keyCode, jump = false) {
  this.code = keyCode;
  this.jump = jump;
  this.isDown = false;
  this.isUp = true;
  this.press = undefined;
  this.release = undefined;

  this.downHandler = (event) => {
    if (this.jump && event.keyCode === this.code) {
      this.press();
      setTimeout(() => { this.release(); }, 100);
    } else if (event.keyCode === this.code) {
      if (this.isUp && this.press) this.press();
      this.isDown = true;
      this.isUp = false;
    }
    event.preventDefault();
  };

  this.upHandler = (event) => {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) this.release();
      this.isDown = false;
      this.isUp = true;
    }
    event.preventDefault();
  };

  window.addEventListener('keydown', this.downHandler, false);
  window.addEventListener('keyup', this.upHandler, false);
}

export function setupKeyboardEvents(obj) {
  const left = new Keyboard(37, false);
  const up = new Keyboard(38, true);
  const right = new Keyboard(39, false);
  const down = new Keyboard(40, false);

  left.press = function () {
    obj.accelerationX = -obj.speed;
    obj.frictionX = 1;
  };

  left.release = function () {
    if (!right.isDown) {
      obj.accelerationX = 0;
      obj.frictionX = obj.drag;
    }
  };

  up.press = function () {
    obj.accelerationY = -obj.speed;
    obj.frictionY = 1;
  };
  up.release = function () {
    if (!down.isDown) {
      obj.accelerationY = 0;
      obj.frictionY = obj.drag;
    }
  };

  right.press = function () {
    obj.accelerationX = obj.speed;
    obj.frictionX = 1;
  };
  right.release = function () {
    if (!left.isDown) {
      obj.accelerationX = 0;
      obj.frictionX = obj.drag;
    }
  };

  down.press = function () {
    obj.accelerationY = obj.speed;
    obj.frictionY = 1;
  };
  down.release = function () {
    if (!up.isDown) {
      obj.accelerationY = 0;
      obj.frictionY = obj.drag;
    }
  };
}

export function detectBoundaries(object, container) {
  const collision = {};

  if (object.x < container.x) {
    collision.left = container.x;
  }

  if (object.y < container.y) {
    collision.top = container.y;
  }

  if (object.x + object.width > container.width) {
    collision.right = container.width - object.width;
  }

  if (object.y + object.height > container.height) {
    collision.bottom = container.height - object.height;
  }

  if (Object.keys(collision).length === 0) return undefined;

  return collision;
}

export function hitTest(r1, r2) {
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  if (Math.abs(r1.centerX - r2.centerX) < r1.halfWidth + r2.halfWidth && Math.abs(r1.centerY - r2.centerY) < r1.halfHeight + r2.halfHeight) {
    return true;
  }

  return false;
}
