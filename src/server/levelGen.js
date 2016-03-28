import {WIDTH, HEIGHT} from '../universal/constants';

// const level = {
//   points: [
//     [0, 200],
//     [100, 200],
//     [200, 150],
//     [300, 200],
//     [500, 200]
//   ],
//   hole: [400, 200],
//   spawn: [50, 200],
// };

/* get an int between min and max inclusive */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function levelGen() {
  const numSegments = randInt(10, 30);

  const spawnX = randInt(20, Math.floor(WIDTH / 3));
  const holeX = randInt(Math.floor(WIDTH / 3) * 2, WIDTH - 20);

  // ceil to prevent sum(segment widths) with being < WIDTH
  const segmentWidth = Math.ceil(WIDTH / numSegments);

  // TODO: Prevent spawning on the "corner" of a segment
  // TODO: center hole within Segment
  // Use ball radius/hole width to help with this!

  const points = [];
  let spawnY, holeY;

  for (let idx = 0; idx <= numSegments; idx++) {
    let x, y;

    if (idx === 0) {
      x = 0;
    } else {
      x = points[idx - 1][0] + segmentWidth;
    }

    if (x > WIDTH) {
      x = WIDTH;
    }

    // TODO: lol
    y = randInt(HEIGHT - 150, HEIGHT - 20);

    if (x > holeX && holeY === undefined) {
      y = points[idx - 1][1];
      holeY = y;
    }

    if (x > spawnX && spawnY === undefined) {
      y = points[idx - 1][1];
      spawnY = y;
    }

    points.push([x, y]);
  }

  const level = {
    points,
    hole: [holeX, holeY],
    spawn: [spawnX, spawnY],
  };

  return level;
}