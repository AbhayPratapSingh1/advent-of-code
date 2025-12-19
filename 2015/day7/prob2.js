const data = Deno.readTextFileSync("./input.txt");
// const data = `123 -> x
// 456 -> y
// x AND y -> d
// x OR y -> e
// x LSHIFT 2 -> f
// y RSHIFT 2 -> g
// NOT x -> h
// NOT y -> i`;

// x: 123
// y: 456
// d: 72
// e: 507
// f: 492
// g: 114
// h: 65412
// i: 65079

const operations = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
  NOT: (a, b) => ~a,
  "": (a) => a,
};

const parseOperantsAndOperation = (instruction) => {
  const parts = instruction.split(" ");
  if (parts.length === 1) {
    return { operation: "", operator: [parts[0]] };
  }
  if (parts.length === 2) {
    return { operation: parts[0], operator: [parts[1]] };
  }

  if (parts.length === 3) {
    return { operation: parts[1], operator: [parts[0], parts[2]] };
  }
};

const parseInput = (data) => {
  const object = [];
  const instructions = data.split("\n");
  instructions.forEach((instruction) => {
    const [operants, holder] = instruction.split(" -> ");

    object[holder] = {
      value: 0,
      valueFound: false,
      logic: parseOperantsAndOperation(operants),
    };
  });

  return object;
};

const allValueFound = (keys, data) => {
  return keys.every((each) => {
    if (isANumber(each)) {
      return true;
    }
    return data[each].valueFound;
  });
};

const isANumber = (val) => /\d+/.test(val);

const excuteSingleInstruction = (instructionObj, data) => {
  const operators = instructionObj.logic.operator;
  if (allValueFound(operators, data)) {
    const operation = instructionObj.logic.operation;
    const operantsValue = operators.map((each) =>
      isANumber(each) ? +each : +data[each].value
    );
    const value = operations[operation](...operantsValue);
    instructionObj.value = value < 0 ? 65536 + value : value;
    instructionObj.valueFound = true;
  }
};

const executeInstructions = (instructions) => {
  const objectKeys = Object.keys(instructions);
  while (objectKeys.some((key) => !(instructions[key].valueFound))) {
    objectKeys.forEach((key) => {
      const instruction = instructions[key];
      if (!(instruction.valueFound)) {
        excuteSingleInstruction(instruction, instructions);
      }
    });
  }
  console.log(instructions.a);
};
const parsedInstruction = parseInput(data);

console.log(parsedInstruction.b);
parsedInstruction.b.logic.operator = ["16076"];
console.log(parsedInstruction.b);

executeInstructions(parsedInstruction);
