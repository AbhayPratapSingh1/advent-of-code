const factors = (num) => {
  let leftTerm = num;
  let currentNo = 1;
  const factors = [];
  while (leftTerm >= currentNo) {
    if (leftTerm % currentNo === 0) {
      console.log(leftTerm, currentNo);

      leftTerm -= currentNo;
      factors.push(currentNo);
    }

    currentNo++;
  }
  return factors;
};

const gcd = (a, b) => {
  let n1 = Math.abs(a);
  let n2 = Math.abs(b);
  while (n2 !== 0) {
    [n1, n2] = [n2, n1 % n2];
  }
  return n1;
};

const lcmOfTwo = (a, b) => {
  const g = gcd(a, b);
  return (a * b) / g;
};
const lcm = (...vals) => {
  if (vals.length < 2) {
    return vals[0];
  }
  let lcmCandidate = 1;
  for (let index = 0; index < vals.length; index++) {
    lcmCandidate = lcmOfTwo(lcmCandidate, vals[index]);
  }
  return lcmCandidate;
};

const sum = (...vals) => {
  return vals.reduce((a, b) => a + b);
};

const findHouse = (elfs, gifts) => {
  for (let index = 0; index < elfs.length; index++) {
    const possibleElfs = elfs.slice(0, index + 1);
    const houseNo = lcm(...possibleElfs);
    console.log({ houseNo });

    console.log(houseNo * sum(...possibleElfs) * 10);

    if ((houseNo * sum(...possibleElfs) * 10) === gifts) {
      return houseNo;
    }
  }
  return -1;
};

// const gifts = 10;
// const gifts = 30;
// const gifts = 40;
// const gifts = 70;
// const gifts = 60;
// const gifts = 120;
// const gifts = 80;
// const gifts = 150;
// const gifts = 130;

const giftFactors = factors(gifts / 10);
console.log({ giftFactors });

// console.log(lcm(...giftFactors));
// console.log("House No:", findHouse(giftFactors, gifts));
