const rawData = `#...##.####.#.......#.##..##.#.
#.##.#..#..#...##..##.##.#.....
#..#####.#......#..#....#.###.#
...#.#.#...#..#.....#..#..#.#..
.#.....##..#...#..#.#...##.....
##.....#..........##..#......##
.##..##.#.#....##..##.......#..
#.##.##....###..#...##...##....
##.#.#............##..#...##..#
###..##.###.....#.##...####....
...##..#...##...##..#.#..#...#.
..#.#.##.#.#.#####.#....####.#.
#......###.##....#...#...#...##
.....#...#.#.#.#....#...#......
#..#.#.#..#....#..#...#..#..##.
#.....#..##.....#...###..#..#.#
.....####.#..#...##..#..#..#..#
..#.....#.#........#.#.##..####
.#.....##..#.##.....#...###....
###.###....#..#..#.....#####...
#..##.##..##.#.#....#.#......#.
.#....#.##..#.#.#.......##.....
##.##...#...#....###.#....#....
.....#.######.#.#..#..#.#.....#
.#..#.##.#....#.##..#.#...##..#
.##.###..#..#..#.###...#####.#.
#...#...........#.....#.......#
#....##.#.#..##...#..####...#..
#.####......#####.....#.##..#..
.#...#....#...##..##.#.#......#
#..###.....##.#.......#.##...##`;

// 6 - 16

const data = rawData.split("\n").map((each) => each.split(""));

data[22][17] = "X";
const getCannonPos = (data) => {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] === "X") {
        return { x: col, y: row };
      }
    }
  }
};

const sqr = (x) => Math.pow(x, 2);
const getAllAstroidDetails = (data, cannon) => {
  const stars = [];
  let id = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] === "#") {
        const op = col - cannon.x;
        const adj = cannon.y - row;

        const hypo = Math.sqrt(sqr(op) + sqr(adj));

        const sin = op / hypo;
        const cos = adj / hypo;

        stars.push({
          x: col,
          y: row,
          hypo,
          id,
          sin,
          cos,
        });
        id++;
      }
    }
  }
  return stars;
};

const cannon = getCannonPos(data);

const stars = getAllAstroidDetails(data, cannon);

const nearlyEqual = (a, b) => {
  return Math.abs(a - b) < 0.0001;
};

const sortAstroids = (stars) =>
  stars.toSorted((a, b) => {
    if (a.sin >= 0 && b.sin >= 0) {
      if (nearlyEqual(a.cos === b.cos)) {
        return b.hypo - a.hypo;
      }
      return b.cos - a.cos;
    }

    if (a.sin < 0 && b.sin < 0) {
      if (nearlyEqual(a.cos === b.cos)) {
        return b.hypo - a.hypo;
      }
      return a.cos - b.cos;
    } else {
      return b.sin - a.sin;
    }
  });

const isSameSlope = (each, star) =>
  nearlyEqual(each.sin, star.sin) && nearlyEqual(each.cos, star.cos);

const filterSameSlopeOne = (stars) => {
  const uniques = [];
  const left = [];
  for (let index = 0; index < stars.length; index++) {
    const star = stars[index];
    const sameSlopeStarIndex = uniques.findIndex((each) =>
      isSameSlope(each, star)
    );

    if (sameSlopeStarIndex === -1) {
      uniques.push(star);
    } else {
      const obj = uniques[sameSlopeStarIndex];
      if (obj.hypo > star.hypo) {
        left.push(obj);
        uniques[sameSlopeStarIndex] = star;
      } else {
        left.push(star);
      }
    }
  }
  return [uniques, left];
};

const allStarsToShoot = [];

let starLeftToOrder = stars;
while (starLeftToOrder.length !== 0) {
  let newBatch;
  [newBatch, starLeftToOrder] = filterSameSlopeOne(starLeftToOrder);
  const sortedBatches = sortAstroids(newBatch);
  allStarsToShoot.push(sortedBatches);
}

const flatedOne = allStarsToShoot.flat();
for (let index = 0; index < flatedOne.length; index++) {
  const item = flatedOne[index];

  data[item.y][item.x] = index;
}

console.log(allStarsToShoot.flat()[199]);
