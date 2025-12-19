const rawData = Deno.readTextFileSync("input.txt");

const getASCII = (value) => {
  return "|";
};

const knownCharWithLen = {
  "\\\\": {
    length: 2,
    getChar: () => "\\",
  },

  "\\x": {
    length: 4,
    getChar: getASCII,
  },

  '\\"': {
    length: 2,
    getChar: () => '"',
  },
};
const isKnown = (value) => Object.keys(knownCharWithLen).includes(value);
const getEachLineLen = (sentence) => {
  const values = [];
  let index = 2;

  while (index < sentence.length) {
    const lastTwoChar = sentence.slice(index - 1, index + 1);

    if (isKnown(lastTwoChar)) {
      const obj = knownCharWithLen[lastTwoChar];
      index += obj.length;
      values.push(obj.getChar(lastTwoChar));
    } else {
      values.push(sentence[index - 1]);
      index++;
    }
  }
  return values.join("");
};
// const val = getEachLineLen(rawData);

const datas = rawData.split("\n");

const newVals = datas.map(getEachLineLen);
const prevLen = datas.reduce((s, e) => s + e.length, 0);
const newLen = newVals.reduce((s, e) => s + e.length, 0);
console.log({ prevLen });
console.log({ newLen });
console.log({ v: prevLen - newLen });

// console.log(rawData);
// console.log(val);

// console.log(rawData.length);

// console.log(val.length);
