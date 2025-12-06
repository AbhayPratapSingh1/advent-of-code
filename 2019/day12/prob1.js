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

for (let index = 0; index < 1000; index++) {
  moveTime(moons);
}

const KEAndPEofMoon = (moon) => {
  const KE = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
  const PE = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
  return { KE, PE };
};

const totalEnergy = (moonsKEPE) => moonsKEPE.KE * moonsKEPE.PE;

const moonsKEPE = moons.map(KEAndPEofMoon);
const moonsTotalEnergy = moonsKEPE.map(totalEnergy);

const allMoonsTotalEnergy = moonsTotalEnergy.reduce((a, b) => a + b);
console.log(moonsKEPE);
console.log(moonsTotalEnergy);
console.log(allMoonsTotalEnergy);
