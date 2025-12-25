const rawData = Deno.readTextFileSync("./input1.txt");

const parseInput = (rawData) => {
  const matches = [...rawData.matchAll(
    /(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./g,
  )];
  const data = [];

  for (let index = 0; index < matches.length; index++) {
    const reindeer = {
      name: matches[index][1],
      speed: +matches[index][2],
      runDuration: +matches[index][3],
      restDuration: +matches[index][4],
    };
    data.push(reindeer);
  }
  return data;
};

const createRendier = (rendierDetail) => {
  return {
    ...rendierDetail,
    curRunLeft: rendierDetail.runDuration,
    curRestLeft: rendierDetail.restDuration,
    distanceTraveled: 0,
    points: 0,
    state: "run",
  };
};

const actions = {
  "run": (rendier) => {
    rendier.curRunLeft -= 1;
    rendier.distanceTraveled += rendier.speed;
    if (rendier.curRunLeft === 0) {
      rendier.curRunLeft = rendier.runDuration;
      rendier.state = "rest";
    }
  },
  "rest": (rendier) => {
    rendier.curRestLeft -= 1;
    if (rendier.curRestLeft === 0) {
      rendier.curRestLeft = rendier.restDuration;
      rendier.state = "run";
    }
  },
};

const moveRendierOnce = (rendiers) => {
  for (const rendier of rendiers) {
    actions[rendier.state](rendier);
  }
};

const givePointToMaxDistanceCoveredRendier = (rendiers) => {
  const distances = rendiers.map((each) => each.distanceTraveled);
  const maxDistance = Math.max(...distances);

  rendiers.forEach((rendier) => {
    if (rendier.distanceTraveled === maxDistance) {
      rendier.points += 1;
    }
  });
};

const runRendiers = (rendiers, duration) => {
  for (let index = 0; index < duration; index++) {
    moveRendierOnce(rendiers);
    givePointToMaxDistanceCoveredRendier(rendiers);
  }
};

const data = parseInput(rawData);
const rendiers = data.map(createRendier);

runRendiers(rendiers, 2503);

const points = rendiers.map((each) => each.points);
console.log(points);
console.log(Math.max(...points));
