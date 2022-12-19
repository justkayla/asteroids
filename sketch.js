let ship;
let asteroids = [];
// part of the ship class?
let lasers = [];

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key === " ") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode === UP_ARROW) {
    ship.boosting(true);
  }
}

function draw() {
  background(20);
  // forEach loop?
  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("You've been hit!");
      // change ship color on impact?
      // ship.col = color(`hsl(${~~random(360)}, 100%, 50%)`);
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  // forEach loop?
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 13) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  // if all asteroids are destroyed, console.log("You won!")
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}
