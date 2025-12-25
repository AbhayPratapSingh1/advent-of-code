const rawData = Deno.readTextFileSync("./input2.txt");

const parseInput = (rawData) => {
  const data = [];
  const matchingParts = [
    ...rawData.matchAll(
      /(.+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/g,
    ),
  ];
  matchingParts.forEach((item) => {
    data.push({
      name: item[1],
      capacity: +item[2],
      durability: +item[3],
      flavor: +item[4],
      texture: +item[5],
      calories: +item[6],
    });
  });
  return data;
};
const eachFieldVals = (data, fields) => {
  const keys = {};

  for (const key of Object.keys(data)) {
    const times = data[key];

    const itemData = fields.find((each) => each.name === key);
    const fil = (Object.keys(itemData)).filter((each) => each !== "name");

    for (const field of fil) {
      keys[field] = (keys[field] || 0) + (itemData[field] * times);
    }
  }

  return keys;
};

const bestSuitedforField = (data, negativeOne) => {
  console.log(data, negativeOne);
  let maxVal = 0;
  let fieldName = "";
  for (let index = 0; index < data.length; index++) {
    if (maxVal < data[index][negativeOne]) {
      maxVal = data[index][negativeOne];
      fieldName = data[index].name;
    }
  }
  return fieldName;
};

const allDataIsBalanced = (data, fields) => {
  return !Object.values(eachFieldVals(data, fields)).some((val) => val < 0);
};

const normaliseData = (data) => {
  const fields = data.filter((each) => each !== "name");
  const choosen = {};
  choosen[data[0].name] = 1;

  while (!allDataIsBalanced(choosen, fields)) {
    const getVals = eachFieldVals(choosen, fields);

    const negativeOne = Object.keys(getVals).find((key) => getVals[key] < 0);
    if (negativeOne === -1) {
      return choosen;
    }

    const toAddField = bestSuitedforField(data, negativeOne);
    choosen = toAddField[]
  }
};

const data = parseInput(rawData);
console.log(data);
normaliseData(data);
