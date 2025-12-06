// const data =
//   "3,8,1001,8,10,8,105,1,0,0,21,42,59,76,85,106,187,268,349,430,99999,3,9,102,3,9,9,1001,9,2,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,102,3,9,9,101,3,9,9,1002,9,2,9,4,9,99,3,9,102,3,9,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,101,3,9,9,1002,9,2,9,1001,9,4,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99";
const data =
  "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
const MEMORY = data.split(",").map(Number);

const mememoryAfterExectution = (computerData) => {
  const { memory, inputBuffer, output } = computerData;

  const logicalDecision = {
    5: { toJump: (p1) => p1 !== 0 },
    6: { toJump: (p1) => p1 === 0 },
  };

  const logialStorings = {
    7: { toStore: (p1, p2) => p1 < p2 },
    8: { toStore: (p1, p2) => p1 === p2 },
  };

  const arithmatic = {
    1: { jump: 4, func: (a, b) => a + b },
    2: { jump: 4, func: (a, b) => a * b },
  };

  const IO = {
    3: {
      jump: 2,
      func: (mem, ele) => {
        mem[ele] = inputBuffer[computerData.inputIdx++];
      },
    },
    4: {
      jump: 2,
      func: (mem, ele) => {
        output.push(mem[ele]);
      },
    },
  };

  const accessMode = {
    0: (mem, ele) => mem[ele],
    1: (mem, ele) => ele,
  };

  const parseInput = (memory, i) => {
    const instructionString = memory[i].toString().padStart(5, "0");

    const [p3Mode, p2Mode, p1Mode, ...rest] = instructionString.split("");
    const code = +(instructionString.slice(3));

    return [code, p1Mode, p2Mode, p3Mode];
  };

  const executeLogicalOp = (memory, i) => {
    const [code, p1Mode, p2Mode, p3Mode] = parseInput(memory, i);

    const elementAddress = accessMode[p1Mode](memory, i + 1);
    const element = memory[elementAddress];

    const newJumpAddress = accessMode[p2Mode](memory, i + 2);
    const newJump = memory[newJumpAddress];

    return logicalDecision[code].toJump(element) ? newJump : i + 3;
  };
  const executeLogicalStoringOp = (memory, i) => {
    const [code, p1Mode, p2Mode, p3Mode] = parseInput(memory, i);

    const p1Add = accessMode[p1Mode](memory, i + 1);
    const p2Add = accessMode[p2Mode](memory, i + 2);
    const p3Add = accessMode[p3Mode](memory, i + 3);

    const p1 = memory[p1Add];
    const p2 = memory[p2Add];

    const toStore = logialStorings[code].toStore(p1, p2) ? 1 : 0;

    memory[p3Add] = toStore;
    return i + 4;
  };

  const executeArithmaticOp = (memory, i) => {
    const [code, p1Mode, p2Mode, p3Mode] = parseInput(memory, i);

    const p1Add = accessMode[p1Mode](memory, i + 1);
    const p2Add = accessMode[p2Mode](memory, i + 2);
    const p3Add = accessMode[p3Mode](memory, i + 3);

    const p1 = memory[p1Add];
    const p2 = memory[p2Add];

    const val = arithmatic[code].func(p1, p2);

    memory[p3Add] = val;

    return i + arithmatic[code].jump;
  };

  const executeIOoperation = (memory, i) => {
    const [code, p1Mode, p2Mode, p3Mode] = parseInput(memory, i);

    const p1Add = accessMode[p1Mode](memory, i + 1);

    IO[code].func(memory, p1Add);

    return i + IO[code].jump;
  };
  const instructions = {
    1: executeArithmaticOp,
    2: executeArithmaticOp,
    3: executeIOoperation,
    4: executeIOoperation,
    5: executeLogicalOp,
    6: executeLogicalOp,
    7: executeLogicalStoringOp,
    8: executeLogicalStoringOp,
  };

  const executeInstruction = (memory, i) => {
    const code = memory[i] % 100;
    return instructions[code](memory, i);
  };

  const isWaitForInput = () => {
    const memory = computerData.memory;
    const isMemoryInstrction = memory[computerData.ptr] % 10 === 3;
    const isNoInputLeft = computerData.inputIdx === inputBuffer.length;
    return isMemoryInstrction && isNoInputLeft;
  };
  while (memory[computerData.ptr] !== 99) {
    if (isWaitForInput(computerData)) {
      return;
    }

    computerData.ptr = executeInstruction(memory, computerData.ptr);
  }
};

const uniquePairs = (items) => {
  const possibleItems = [...items];
  const combinations = [];

  if (items.length === 0) {
    return [possibleItems];
  }

  for (let index = 0; index < items.length; index++) {
    const first = items[index];
    const unused = possibleItems.filter((each) => each !== items[index]);
    const newPossible = uniquePairs(unused);

    for (let newPosIdx = 0; newPosIdx < newPossible.length; newPosIdx++) {
      combinations.push([first, ...(newPossible[newPosIdx])]);
    }
  }
  return combinations;
};

const createAmplifiers = (memory, inputs) => {
  const amplifiers = [];
  for (let index = 0; index < inputs.length; index++) {
    const ampObj = {
      ptr: 0,
      inputBuffer: [inputs[index]],
      inputIdx: 0,
      output: [],
      memory: [...memory],
    };
    amplifiers.push(ampObj);
  }
  return amplifiers;
};

const getThresholdThrewMemory = (memory, offsets) => {
  const amplifiers = createAmplifiers(memory, offsets);

  amplifiers[0].inputBuffer.push(0);

  let runningRound = 0;

  while (amplifiers[4].memory[amplifiers[4].ptr] !== 99) {
    const effectiveIndex = runningRound % amplifiers.length;
    const amplifier = amplifiers[effectiveIndex];

    mememoryAfterExectution(amplifier);

    const next = amplifiers[(effectiveIndex + 1) % amplifiers.length];
    const valToStore = amplifier.output.at(-1);

    next.inputBuffer.push(valToStore);
    runningRound++;
  }
  console.log(amplifiers.map((each) => each.output));

  return amplifiers;
};

const uniqueCommands = uniquePairs([5, 6, 7, 8, 9]);

const findOffsets = () => {
  let max = { val: 0, by: "" };
  for (let pairId = 0; pairId < uniqueCommands.length; pairId++) {
    const amplifiers = getThresholdThrewMemory(MEMORY, uniqueCommands[pairId]);
    if (amplifiers.at(-1).output.at(-1) > max.val) {
      max = {
        val: amplifiers.at(-1).output.at(-1),
        by: uniqueCommands[pairId],
      };
    }
  }
  console.log(max);
};

findOffsets();
