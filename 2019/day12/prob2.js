const rawData = `<x=0, y=6, z=1>
<x=4, y=4, z=19>
<x=-11, y=1, z=8>
<x=2, y=19, z=15>`;

const parseSingleMoonData = (moonData) => {
  const data =
    [...moonData.matchAll(/<x=([-\d]+), y=([-\d]+), z=([-\d]+)>/g)][0];

  return { x: +data[1], y: +data[2], z: +data[3] };
};
const getAllMoonData = (data) =>
  data.split("\n").map((each) => parseSingleMoonData(each));

const data = getAllMoonData(rawData);

const createMoon = ({ x, y, z }) => ({ x, y, z, vx: 0, vy: 0, vz: 0 });

const moons = data.map(createMoon);

const updateMoonsVelocity = (moons) => {
  moons.forEach((moon) => {
    let dvx = 0;
    let dvy = 0;
    let dvz = 0;
    const otherMoons = moons.filter((each) => each !== moon);
    otherMoons.forEach((each) => {
      if (each.x > moon.x) dvx += 1;
      if (each.x < moon.x) dvx -= 1;

      if (each.y > moon.y) dvy += 1;
      if (each.y < moon.y) dvy -= 1;

      if (each.z > moon.z) dvz += 1;
      if (each.z < moon.z) dvz -= 1;
    });

    moon.vx += dvx;
    moon.vy += dvy;
    moon.vz += dvz;
  });
};

const updateMoonsPlace = (moons) => {
  moons.forEach((each) => {
    each.x += each.vx;
    each.y += each.vy;
    each.z += each.vz;
  });
};
const moveTime = (moons) => {
  updateMoonsVelocity(moons);
  updateMoonsPlace(moons);
};

const lcm = (a, b) => {
  let mFactor = 1;
  while ((mFactor * a) % b !== 0) {
    mFactor++;
  }
  return mFactor * a;
};

const repeats = {
  x: -1,
  y: -1,
  z: -1,
};
const findRepeatition = (data, key = "x") => {
  const moons = data.map(createMoon);
  const postions = [
    { x: moons[0].x, y: moons[0].y, z: moons[0].z },
    { x: moons[1].x, y: moons[1].y, z: moons[1].z },
    { x: moons[2].x, y: moons[2].y, z: moons[2].z },
    { x: moons[3].x, y: moons[3].y, z: moons[3].z },
  ];
  let times = 2;
  let sameX = false;
  moveTime(moons);
  moveTime(moons);

  while (!sameX) {
    moveTime(moons);
    sameX = true;
    moons.forEach((moon, index) => {
      sameX = sameX && moon[key] === postions[index][key];
    });
    times++;
  }
  return times + 1;
};
const repeatX = findRepeatition(data, "x");
const repeatY = findRepeatition(data, "y");
const repeatZ = findRepeatition(data, "z");
console.log(lcm(lcm(repeatX, repeatY), repeatZ));
