import { rawData } from "./input.js";

const data = rawData.split("\n").map((each) => each.split("x").map(Number));

const calculateAreaOfCuboid = (l, b, h) => {
  const sideArea = 2 * h * b;
  const faceBackArea = 2 * h * l;
  const topDownArea = 2 * l * b;
  return sideArea + faceBackArea + topDownArea;
};

const getMin2Num = (l, b, h) => {
  const maxOne = Math.max(l, b, h);
  const index = [l, b, h].indexOf(maxOne);
  return [l, b, h].filter((_, i) => i !== index);
};

const paperRequiredByGift = ([l, b, h]) => {
  const surfaceArea = calculateAreaOfCuboid(l, b, h);
  const minTwoSides = getMin2Num(l, b, h);
  const extraPaper = minTwoSides[0] * minTwoSides[1];
  return surfaceArea + extraPaper;
};

const eachPresentPaperRequired = data.map(paperRequiredByGift);

const totalPaper = eachPresentPaperRequired.reduce((a, b) => a + b);
console.log(totalPaper);
