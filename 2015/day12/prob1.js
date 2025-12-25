// const data = '{"a":2,"b":4}';
// const data = '{"a":{"b":4},"c":-1}';

const data = Deno.readTextFileSync("./input.txt");

const numbers = [..."1234567890"];
const isNumber = (data, index) => {
  if (numbers.includes(data[index])) {
    return true;
  }
  return numbers.includes(data[index + 1]) && data[index] === "-";
};

const extractNo = (data, index) => {
  let idx = index + 1;
  while (numbers.includes(data[idx])) {
    idx++;
  }
  return [idx - index, +data.slice(index, idx)];
};

const getAllNo = (data) => {
  let index = 0;
  const values = [];
  let numbericValue;
  while (index < data.length) {
    let di = 1;
    if (isNumber(data, index)) {
      [di, numbericValue] = extractNo(data, index);
      values.push(numbericValue);
    }
    index += di;
  }
  console.log(values);
  return values;
};
const allValues = getAllNo(data);
const sum = allValues.reduce((a, b) => a + b);

console.log(sum);
