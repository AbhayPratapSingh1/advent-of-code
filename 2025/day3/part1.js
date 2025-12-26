const input = Deno.readTextFileSync("./input.txt");

const data = input.split("\n");

const findMaxContinuousValue = (values, needed) => {
  if (needed === 1) {
    return Math.max(...values);
  }

  const valueCandidates = values
    .slice(0, values.length - (needed - 1))
    .split("")
    .map((each) => +each);

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
  const maxOne = possibleValues.toSorted((a, b) => a - b);
  return maxValue.toString() + maxOne[0].toString();
};

for (let index = 0; index < data.length; index++) {
  console.log(index);

  console.log(findMaxContinuousValue(data[index], 12));
}
