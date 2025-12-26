const rawData = Deno.readTextFileSync("./input.txt");
const parseInput = (rawData) => rawData.split("\n").map((each) => +each);

const possiblyChoose = (options, total) => {
  const ways = [];

  for (let index = 0; index < options.length; index++) {
    const val = options[index].val;
    if (val < total) {
      const moreItems = possiblyChoose(
        options.filter((each) => each !== options[index]),
        total - val,
      );
      // console.log({ moreItems });

      for (const vals of moreItems) {
        ways.push([options[index], ...vals]);
      }
    } else if (val === total) {
      ways.push([options[index]]);
    }
  }

  return ways;
};

const makeOptions = (vals) => {
  const dat = [];
  for (let index = 0; index < vals.length; index++) {
    dat.push({ id: index, val: vals[index] });
  }
  return dat;
};

const isSame = (val, val2) => {
  if (val.length !== val2.length) {
    return false;
  }
  for (let index = 0; index < val.length; index++) {
    if (val[index].id !== val2[index].id) {
      return false;
    }
  }
  return true;
};

const includes = (vals, val) => {
  for (const each of vals) {
    if (isSame(each, val)) {
      return true;
    }
  }
  return false;
};

const findUniqueCombs = (combs) => {
  const sortedList = combs.map((each) => each.toSorted((a, b) => a.id - b.id));

  const uniques = [];
  for (const comb of sortedList) {
    if (!includes(uniques, comb)) {
      uniques.push(comb);
    }
  }
  return uniques;
};

const data = parseInput(rawData);

const findMin = (vals) => {
  let min = Infinity;
  for (let index = 0; index < vals.length; index++) {
    if (min > vals[index].length) {
      min = vals[index].length;
    }
  }
  return min;
};

const sums = possiblyChoose(makeOptions(data), 150);

const minLen = findMin(sums);

const newVals = sums.filter((each) => each.length === minLen);
console.log(sums);

console.log(findUniqueCombs(newVals).length);
