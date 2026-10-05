const SAMPLES = {
  "INPUT": "./input.txt",
  "SAMPLE": "./sample.txt",
};

const input = Deno.readTextFileSync(SAMPLES.INPUT);

const data = input.split("\n").map((each) =>
  each.split("").map((num) => Number(num))
);

const findMaxContinuousValue = (values = [], needed) => {
  if (needed === 1) {
    return Math.max(...values);
  }

  const lastPossibleCandidateIndex = values.length - (needed - 1);
  const valueCandidates = values.slice(0, lastPossibleCandidateIndex);

  const maxValuesIndexes = [];
  const maxValue = Math.max(...valueCandidates);

  for (let index = 0; index < valueCandidates.length; index++) {
    if (valueCandidates[index] === maxValue) {
      maxValuesIndexes.push(index);
    }
  }

  const possibleValues = maxValuesIndexes.map((index) =>
    findMaxContinuousValue(values.slice(index + 1), needed - 1)
  );

  const sortedValues = possibleValues.toSorted((a, b) => b - a);
  return Number(maxValue.toString() + sortedValues[0].toString());
};

const sum = (numbers) => 
  numbers.reduce((a, b) => a + b, 0);


const findMaxValuesSum = () => {
  const maxValues = [];
  for (let index = 0; index < data.length; index++) {
    const maxValue = findMaxContinuousValue(data[index], 12);
    maxValues.push(maxValue);
  }
  return sum(maxValues);
};

console.log(findMaxValuesSum(data));
