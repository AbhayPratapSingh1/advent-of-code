const rawData = Deno.readTextFileSync("input.txt");

const knownCharWithLen = {
  "\\": {
    length: 2,
    getChar: () => "\\\\",
  },

  // "\\x": {
  //   length: 4,
  //   getChar: getASCII,
  // },

  '"': {
    length: 1,
    getChar: () => '\\"',
  },
};

const isKnown = (value) => Object.keys(knownCharWithLen).includes(value);
const getEachLineLen = (sentence) => {
  const values = [];

  for (const char of sentence) {
    if (isKnown(char)) {
      values.push(knownCharWithLen[char].getChar(char));
    } else {
      values.push(char);
    }
  }
  console.log(values.join(""));

  return '"' + values.join("") + '"';
};
// const val = getEachLineLen(rawData);

const datas = rawData.split("\n");

const newVals = datas.map(getEachLineLen);
const prevLen = datas.reduce((s, e) => s + e.length, 0);
const newLen = newVals.reduce((s, e) => s + e.length, 0);

console.log({ prevLen });
console.log({ newLen });
console.log({ v: newLen - prevLen });

// console.log(rawData);
// console.log(val);

// console.log(rawData.length);

// console.log(val.length);
