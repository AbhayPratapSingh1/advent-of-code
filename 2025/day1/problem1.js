const inputs = {
  simple: "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82",
  actual: Deno.readTextFileSync("./input.txt"),
};

const init = 50;

const add = (a, b) => {
  return a + b;
};
const sub = (a, b) => {
  return a - b;
};

const parseInput = (data) => {
  return data.split("\n").map((each) => {
    const action = each[0] === "L" ? sub : add;
    const val = +each.slice(1);
    return { action, val };
  });
};

const executeInstruction = (action, val, pointing) => {
  return action(val, pointing);
};

const executeInstructions = (inputs, pointer, initialCount = 0) => {
  let count = initialCount;
  let dialerPointer = pointer;
  for (const { action, val } of inputs) {
    dialerPointer = executeInstruction(action, dialerPointer, val);

    if (dialerPointer % 100 === 0) {
      count++;
    }
  }
  return count;
};

const parsedInput = parseInput(inputs.actual);

console.log(executeInstructions(parsedInput, 50, 0));

// console.log(parseInput(inputs.simple));
