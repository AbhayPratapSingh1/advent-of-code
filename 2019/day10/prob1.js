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

const data = rawData.split("\n").map((each) => each.split(""));

const getStarsPos = () => {
  const stars = [];
  let id = 1;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data.length; col++) {
      if (data[row][col] === "#") {
        stars.push({ x: col, y: row, id });
        id++;
      }
    }
  }
  return stars;
};

const stars = getStarsPos();

const slope = (x1, y1, x2, y2) => {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return deltaY / deltaX;
};

const nearlyEqual = (a, b) => {
  if (a + "" === "Infinity" && b + "" === "Infinity") {
    return true;
  }
  if (a + "" === "-Infinity" && b + "" === "-Infinity") {
    return true;
  }
  return a - b > -0.001 && a - b < 0.001;
};

const getEachStarRelation = (star, stars) => {
  const otherStarts = stars.filter((each) => each.id !== star.id);
  const uniques = [];
  for (const eachStar of otherStarts) {
    const currentSlope = slope(eachStar.x, eachStar.y, star.x, star.y);

    const adx = Math.sign(eachStar.x - star.x);
    const ady = Math.sign(eachStar.y - star.y);
    const isNotLOC = uniques.some((each) =>
      nearlyEqual(each.slope, currentSlope) && each.adx === adx &&
      each.ady === ady
    );
    if (!isNotLOC) {
      uniques.push({ slope: currentSlope, adx, ady });
    }
  }

  return uniques.length;
};

const getAllStarRelation = (stars) => {
  let max = { val: -Infinity };
  const lens = [];
  for (const star of stars) {
    lens.push(getEachStarRelation(star, stars));
    if (lens.at(-1) > max.val) {
      max = { val: lens.at(-1), ...star };
    }
  }
  console.log(max);

  return lens;
};
const pos = getAllStarRelation(stars);

console.log(pos.map((each) => each).length);
