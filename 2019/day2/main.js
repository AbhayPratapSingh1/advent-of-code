const mememoryAfterExectution = (noun, verb) => {
  const data =
    "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,2,9,19,23,2,13,23,27,1,6,27,31,2,6,31,35,2,13,35,39,1,39,10,43,2,43,13,47,1,9,47,51,1,51,13,55,1,55,13,59,2,59,13,63,1,63,6,67,2,6,67,71,1,5,71,75,2,6,75,79,1,5,79,83,2,83,6,87,1,5,87,91,1,6,91,95,2,95,6,99,1,5,99,103,1,6,103,107,1,107,2,111,1,111,5,0,99,2,14,0,0";

  const memory = data.split(",").map((each) => +each);

  const instructions = {
    1: (a, b) => a + b,
    2: (a, b) => a * b,
  };

  const executeInstruction = (memory, instruction, a, b, storePos) => {
    const val = instructions[instruction](a, b);
    memory[storePos] = val;
  };

  memory[1] = noun;
  memory[2] = verb;
  let i = 0;

  while (memory[i] !== 99) {
    executeInstruction(
      memory,
      memory[i],
      memory[memory[i + 1]],
      memory[memory[i + 2]],
      memory[i + 3],
    );
    i += 4;
  }
  return memory[0];
};

const findVal = (val) => {
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      const lastMem = mememoryAfterExectution(noun, verb);
      if (lastMem === val) {
        return [noun, verb];
      }
    }
  }
  return "non";
};

const [noun, verb] = findVal(19690720);
console.log((noun * 100) + verb);
