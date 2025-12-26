const rawData2 = Deno.readTextFileSync("./input.txt");

const rawData1 = `children: 3;
cats: 7;
samoyeds: 2;
pomeranians: 3;
akitas: 0;
vizslas: 0;
goldfish: 5;
trees: 3;
cars: 2;
perfumes: 1;
`;

const parsesAntsData = (datas) => {
  const data = datas.split("\n");
  const ants = [];
  for (const ant of data) {
    const antId = [...ant.matchAll(/Sue (\d+)/g)][0][1];
    const details = ant.split(`Sue ${antId}:`)[1];

    const differentFields = [
      ...details.matchAll(/([^ ,]*): (\d+)/g),
    ];
    const fields = {};
    for (const field of differentFields) {
      const property = field[1];
      fields[property] = +field[2];
    }
    fields.no = antId;
    ants.push(fields);
  }
  return ants;
};
const parsesKnownData = (data) => {
  const differentFields = [...data.matchAll(/(.*): (\d+);/g)];
  const fields = {};
  for (const field of differentFields) {
    const property = field[1];
    fields[property] = +field[2];
  }
  return fields;
};

const isSameAnt = (known, ant, matchingFunc) => {
  for (const field in known) {
    if (field in ant && !matchingFunc(field, ant[field], known[field])) {
      return false;
    }
  }
  return true;
};

const bestMathAnt = (known, ants, matchingFunc) => {
  for (const ant of ants) {
    console.log({ ant });

    if (isSameAnt(known, ant, matchingFunc)) {
      return ant.no;
    }
  }
  return "non";
};

const matches = parsesKnownData(rawData1);
const antsData = parsesAntsData(rawData2);
// console.log({ antsData });

const matchingFunc = (field, val1, val2) => {
  if (["pomeranians", "goldfish "].includes(field)) {
    return val1 < val2;
  }
  if (["cats", "trees"].includes(field)) {
    return val1 > val2;
  }
  return val1 === val2;
};

const ant = bestMathAnt(matches, antsData, matchingFunc);
console.log({ ant });
