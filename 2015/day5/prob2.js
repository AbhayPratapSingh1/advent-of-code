const testCases = {
  t1: "qjhvhtzxzqqjkmpb", // t
  t2: "xxyxx", // t
  t3: "uurcxstgmygtbstg", // f
  t4: "ieodomkazucvgmuy", // f
};
const test = testCases.t3;

const isAnyOneGapTwice = (string) => {
  for (let index = 1; index < string.length - 1; index++) {
    if (string[index - 1] === string[index + 1]) {
      return true;
    }
  }
  return false;
};

const isAnyRepeatingTwoDigit = (string) => {
  const uniqueTwo = [];
  for (let index = 1; index < string.length; index++) {
    const matchIndex = uniqueTwo.findIndex((each) =>
      each === (string[index] + string[index - 1])
    );
    if (matchIndex !== -1 && matchIndex !== uniqueTwo.length - 1) {
      return true;
    }
    uniqueTwo.push(string[index] + string[index - 1]);
  }
  return false;
};

const isValid = (dataString) => {
  return isAnyRepeatingTwoDigit(dataString) && isAnyOneGapTwice(dataString);
};

const finalData = Deno.readTextFileSync("./input.txt");

const data = finalData.split("\n");
console.log(data.length);

let count = 0;
for (const eachLine of data) {
  if (isValid(eachLine)) {
    count++;
  }
}

console.log(count);
// console.log(isValid(test));
