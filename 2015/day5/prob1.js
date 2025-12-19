const testCases = {
  t1: "aeiouaeiouaeiou",
  t2: "ugknbfddgicrmopn", // t
  t3: "aaa", // t
  t4: "jchzalrnumimnmhp", // f
  t5: "haegwjzuvuyypxyu", // f
  t6: "dvszwmarrgswjxmb", // f
};
const test = testCases.t6;

const VOWELS = "aeiou";
const INVALID_SEQUENCE = ["ab", "cd", "pq", "xy"];

const isNotAnyGivenSequence = (string) => {
  for (let index = 1; index < string.length; index++) {
    if (INVALID_SEQUENCE.includes(string[index - 1] + string[index])) {
      return false;
    }
  }
  return true;
};

const isAnyTwice = (string) => {
  for (let index = 1; index < string.length; index++) {
    if (string[index] === string[index - 1]) {
      return true;
    }
  }
  return false;
};

const isAtLeast3Vowel = (string) => {
  let vowelFound = 0;
  let i = 0;
  while (vowelFound !== 3 && i < string.length) {
    if (VOWELS.includes(string[i])) {
      vowelFound++;
    }
    i++;
  }
  return vowelFound === 3;
};

const isValid = (dataString) => {
  return isAtLeast3Vowel(dataString) && isAnyTwice(dataString) &&
    isNotAnyGivenSequence(dataString);
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
