import { rawData } from "./input.js";

const data = rawData.split("\n").map((each) => each.split("x").map(Number));

const volumnOfCuboid = (l, b, h) => l * b * h;

const getMin2Num = (l, b, h) => {
  const maxOne = Math.max(l, b, h);
  const index = [l, b, h].indexOf(maxOne);
  return [l, b, h].filter((_, i) => i !== index);
};

const ribbonRequiredByGift = ([l, b, h]) => {
  const [side1, side2] = getMin2Num(l, b, h);
  const wrappingLength = 2 * (side1 + side2);
  const bowLength = volumnOfCuboid(l, b, h);
  return wrappingLength + bowLength;
};

const eachPresentRibbonRequired = data.map(ribbonRequiredByGift);

const totalRibbon = eachPresentRibbonRequired.reduce((a, b) => a + b);
console.log(totalRibbon);
