const isNonDecreasing = (num) => { // 123456
  let last = num % 10;
  let parsingNum = Math.floor(num / 10);
  while (parsingNum !== 0) {
    const secLast = last;
    last = parsingNum % 10;
    if (last > secLast) {
      return false;
    }
    parsingNum = Math.floor(parsingNum / 10);
  }
  return true;
};

const isAnyExactlyTwice = (num) => {
  const nums = [];
  const numStr = num.toString();
  let last = numStr[0];
  for (let index = 1; index < numStr.length; index++) {
    if (last.at(-1) === numStr[index]) {
      last += numStr[index];
    } else {
      nums.push(last);
      last = numStr[index];
    }
  }
  nums.push(last);
  return nums.some((each) => each.length === 2);
};

let count = 0;
for (let st = 136760; st < 595730; st++) {
  if (isNonDecreasing(st) && isAnyExactlyTwice(st)) {
    count++;
  }
}
console.log(count);
