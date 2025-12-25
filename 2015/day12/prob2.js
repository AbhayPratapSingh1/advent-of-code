// const data = '{"a":2,"b":4}';
// const data = '{"a":{"b":4},"c":-1}';

const raw = Deno.readTextFileSync("./input.txt");
// const raw = "[1,2,3]";
// const raw = '[1,{"c":"red","b":2},3]';
// const raw = '{"d":"red","e":[1,2,3,4],"f":5}';
// const raw = '[1,"red",5]';
// const numbers = [..."1234567890"];

const data = JSON.parse(raw);

const fetchValues = (item, value = []) => {
  if (Array.isArray(item)) {
    getAllNumberInArray(item, value);
  } else {
    if (!Object.values(item).includes("red")) {
      getAllNumberFromObj(item, value);
    }
  }
};

const getAllNumberInArray = (array, value) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (typeof element === "number") {
      value.push(element);
    } else if (typeof element === "object") {
      fetchValues(element, value);
    }
  }
};

const getAllNumberFromObj = (valueObj, value) => {
  for (const key in valueObj) {
    const element = valueObj[key];
    if (typeof element === "number") {
      value.push(element);
    } else if (typeof element === "object") {
      fetchValues(element, value);
    }
  }
};

const numValues = [];
fetchValues(data, numValues);

console.log(numValues.reduce((a, b) => a + b, 0));
