// next of
// const data = "abcdefgh"; //
// const check = "abcdffaa";

// const data = "ghijklmn";
// const check = "ghjaabcc";
// is correct
// const data = "ghjaabcc";
// const data = "abcdffaa";
// const data = "hijklmmn";
// const data = "abbceffg";
// const data = "abbcegjk";

const data = "hxbxwxba";

const checkTwoDigitRepeatTwice = (data) => {
  let founded = 0;
  let index = 0;
  while (index < data.length - 1) {
    if (data[index] === data[index + 1]) {
      founded += 1;
      index += 2;
    } else {
      index++;
    }
  }
  return founded >= 2;
};

const chars = [..."abcdefghijkjmnopqrstuvwxyz"];

const isConcecutive3 = (password) => {
  for (let index = 0; index < password.length - 2; index++) {
    const char1 = password[index];
    const char2 = password[index + 1];
    const char3 = password[index + 2];
    const is12IsOrder = chars.indexOf(char1) === chars.indexOf(char2) - 1;
    const islastordered = chars.indexOf(char3) - 2 === chars.indexOf(char2) - 1;
    if (is12IsOrder && islastordered) {
      return true;
    }
  }
  return false;
};

const checkPassword = (password) => {
  if (["i", "o", "l"].some((ch) => password.includes(ch))) {
    return false;
  }
  if (!checkTwoDigitRepeatTwice(password)) {
    return false;
  }
  if (!isConcecutive3(password)) {
    return false;
  }
  return true;
};

const passwordChars = [..."abcdefghijklmnopqrstuvwxyz"];

const nextCombination = (values) => {
  const indexes = values.map((each) => passwordChars.indexOf(each));
  let curIndex = indexes.length - 1;
  indexes[curIndex] += 1;
  while (indexes[curIndex] >= passwordChars.length) {
    indexes[curIndex] = 0;
    curIndex -= 1;
    indexes[curIndex] += 1;
  }
  return indexes.map((each) => passwordChars[each]);
};

const findNextPassword = (current) => {
  let passwordCandidate = nextCombination([...current]);
  while (!checkPassword(passwordCandidate.join(""))) {
    passwordCandidate = nextCombination(passwordCandidate);
  }
  return passwordCandidate;
};

console.log(findNextPassword(findNextPassword(data).join("")).join(""));
