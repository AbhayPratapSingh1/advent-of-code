const rawData = Deno.readTextFileSync("input1.txt");

const parseInput = (rawData) => {
  const matches = [
    ...(rawData.matchAll(
      /(.+) would (.+) (\d+) happiness units by sitting next to (.+)./g,
    )),
  ];

  const data = [];

  for (let index = 0; index < matches.length; index++) {
    const person = matches[index][1];
    const sign = matches[index][2] === "gain" ? 1 : -1;
    const happyBy = +matches[index][3];
    const nextTo = matches[index][4];
    data.push({ person, happyBy: happyBy * sign, nextTo });
  }
  return data;
};

const uniqueValues = (data) => {
  const unique = [];
  for (let index = 0; index < data.length; index++) {
    const { person, nextTo } = data[index];

    if (!unique.includes(person)) {
      unique.push(person);
    }

    if (!unique.includes(nextTo)) {
      unique.push(nextTo);
    }
  }
  return unique;
};

const permutations = (values) => {
  if (values.length === 0) {
    return [values];
  }
  const perms = [];
  for (let index = 0; index < values.length; index++) {
    const current = values[index];
    const leftItems = values.filter((each) => each !== current);
    const leftPerms = permutations(leftItems);

    for (const pairs of leftPerms) {
      perms.push([current, ...pairs]);
    }
  }
  return perms;
};

const getTotalHappiness = (arrangement, chart) => {
  const peopleHappinesses = [];

  for (let index = 0; index < arrangement.length; index++) {
    const currentPerson = arrangement[index];
    const prevName = arrangement.at(index - 1);
    const nextName = arrangement[(index + 1) % arrangement.length];

    const prev = chart.find((each) =>
      each.person === currentPerson && each.nextTo === prevName
    );
    const next = chart.find((each) =>
      each.person === currentPerson && each.nextTo === nextName
    );
    peopleHappinesses.push(prev.happyBy + next.happyBy);
  }
  return peopleHappinesses.reduce((a, b) => a + b);
};

const addNewPerson = (data, uniques, person, happinessFn) => {
  for (let index = 0; index < uniques.length; index++) {
    const curPerson = uniques[index];
    const newPersonRecord = {
      person,
      happyBy: happinessFn(),
      nextTo: curPerson,
    };
    const oldPersonRecord = {
      person: curPerson,
      happyBy: happinessFn(),
      nextTo: person,
    };
    data.push(oldPersonRecord, newPersonRecord);
  }
};

const data = parseInput(rawData);
const uniques = uniqueValues(data);

addNewPerson(data, uniques, "ME", () => 0);
uniques.push("ME");

const combinations = permutations(uniques);
const happinesses = combinations.map((each) => getTotalHappiness(each, data));

let max = 0;
for (const val of happinesses) {
  if (max < val) {
    max = val;
  }
}
console.log(max);
