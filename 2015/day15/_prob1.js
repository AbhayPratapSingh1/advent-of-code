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

const getSpecificItem = (data, key) => {
  const vals = [];
  for (const item of data) {
    vals.push({ name: item.name, value: item[key] });
  }
  return vals;
};

const lcm = (a, b) => {
  let multiplier = 1;

  while ((b * multiplier) % a !== 0) {
    multiplier++;
  }
  return b * multiplier;
};

const findMinPossible = (data) => {
  const features = Object.keys(data[0]).filter((each) => each !== "name");
  const mins = {};

  for (const feature of features) {
    const feat = getSpecificItem(data, feature);
    const negativeOnes = feat.filter((each) => each.value < 0);

    const maxOne = feat.reduce((max, current) =>
      max.value > current.value ? max : current
    );

    for (const field of negativeOnes) {
      // console.log(field, maxOne);

      const balanceTimes = lcm(-1 * field.value, maxOne.value);

      const aReq = balanceTimes / -field.value;
      const bReq = balanceTimes / maxOne.value;
      const totalRequired = aReq + bReq;
      // console.log({ aReq, bReq, totalRequired });

      const totalPossible = Math.ceil((102 - data.length) / totalRequired) *
        aReq;

      if ((mins[field.name] || Infinity) > totalPossible) {
        mins[field.name] = totalPossible;
      }
    }
  }

  return mins;
};

const conditionalPermutation = (valuesSet) => {
  if (valuesSet.length === 1) {
    const vals = [];
    const [start, end] = valuesSet[0];
    for (let index = start; index < end; index++) {
      vals.push([index]);
    }
    return vals;
  }

  const vals = [];
  const [start, end] = valuesSet[0];
  for (let index = start; index < end; index++) {
    const leftVals = conditionalPermutation(valuesSet.slice(1));

    for (const prevVals of leftVals) {
      vals.push([index, ...prevVals]);
    }
  }
  return vals;
};

const findScore = (data, eachTimes) => {
  // console.log(data, eachTimes);
  const sums = [];
  const fields = Object.keys(data[0]).filter((each) =>
    each !== "name" && each !== "calories"
  );
  for (const field of fields) {
    let everyOneSum = 0;
    for (let index = 0; index < eachTimes.length; index++) {
      everyOneSum += data[index][field] * eachTimes[index];
    }
    sums.push(everyOneSum);
  }

  if (sums.some((each) => each < 0)) {
    return 0;
  }
  // console.log(sums);
  return sums.reduce((a, b) => a * b);
};

const data = parseInput(rawData);

const possibleMaxes = findMinPossible(data);

console.log(data);

// console.log(possibleMaxes);

const permutionsRange = Object.values(possibleMaxes).map((each) => [0, each]);
// const permutions = conditionalPermutation(permutionsRange);

// console.log(data);
console.log(permutionsRange);

// const validPermutation = permutions.filter((each) =>
//   each.reduce((a, b) => a + b) === 100
// );

const indCalory = (data, combs) => {
  const field = "calories";
  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum += combs[index] * data[index][field];
  }
  return sum;
};
const bruteForce = (data) => {
  let max = 0;
  let maxOne = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < 100; k++) {
        for (let l = 0; l < 100; l++) {
          if (i + j + k + l === 100) {
            const calories = indCalory(data, [i, j, k, l]);
            const score = findScore(data, [i, j, k, l]);
            if (score > max && calories === 500) {
              max = score;
              maxOne = [i, j, k, l];
            }
          }
        }
      }
    }
  }
  console.log(max);
  console.log(maxOne);
};

bruteForce(data);
// const best = (validPermutation) => {
//   let max = 0;
//   let id = 0;
//   for (let index = 0; index < validPermutation.length; index++) {
//     const score = findScore(data, validPermutation[index]);
//     if (score > max) {
//       max = score;
//       id = index;
//     }
//   }
//   return { max, id };
// };

// console.log(best(validPermutation));

// const id = best(validPermutation).id;
// console.log(validPermutation[id]);

// // const score = validPermutation.map((each) => findScore(data, each));

// // console.log(score);
// // console.log(Math.max(...score));
