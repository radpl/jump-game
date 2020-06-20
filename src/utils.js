export function setupKeyboardEvents(subscriber) {

  function keyDownHandler(event) {
    switch (event.keyCode) {
      case 37:
        subscriber.keyDown('left');
        break;
      case 38:
        subscriber.keyDown('up');
        break;
      case 39:
        subscriber.keyDown('right')
        break;
      case 40:
        subscriber.keyDown('down');
        break;
    }
    event.preventDefault();
  };

  function keyUpHandler(event) {
    switch (event.keyCode) {
      case 37:
        subscriber.keyUp('left');
        break;
      case 38:
        subscriber.keyUp('up');
        break;
      case 39:
        subscriber.keyUp('right')
        break;
      case 40:
        subscriber.keyUp('down');
        break;
    }
    event.preventDefault();
  };

  function touchHandler() {
    this.keyDown('up');
    setTimeout(() => {
      this.keyUp('up');
    }, 100)
  }

  window.addEventListener('keydown', keyDownHandler, false);
  window.addEventListener('keyup', keyUpHandler, false);
  window.addEventListener('touchstart', touchHandler.bind(subscriber), false);

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

  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  r1.distX = Math.abs(r1.x - r2.centerX);
  r1.distY = Math.abs(r1.y - r2.centerY);

  if (r1.distX > (r2.width / 2 + 15)) { return false; }
  if (r1.distY > (r2.height / 2 + 15)) { return false; }

  if (r1.distX <= (r2.width / 2)) { return true; }
  if (r1.distY <= (r2.height / 2)) { return true; }

  const cornerDistance_sq = (r1.distX - r2.width / 2) ** 2 + (r1.distY - r2.height / 2) ** 2;
  if (cornerDistance_sq <= 15 ** 2) return true;

}
