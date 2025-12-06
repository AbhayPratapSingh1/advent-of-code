const output = [];

let inputBuffer;
let inputIndex = 0;

const mememoryAfterExectution = (input) => {
  const data =
    "3,8,1001,8,10,8,105,1,0,0,21,42,59,76,85,106,187,268,349,430,99999,3,9,102,3,9,9,1001,9,2,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,102,3,9,9,101,3,9,9,1002,9,2,9,4,9,99,3,9,102,3,9,9,1001,9,4,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,101,3,9,9,1002,9,2,9,1001,9,4,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99";
  // const data =
  //   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0";
  // const data = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
  // const data =
  // "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0";
  // const data = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
  const memory = data.split(",").map((each) => +each);

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
        mem[ele] = inputBuffer[inputIndex++];
      },
    },
    4: {
      jump: 2,
      func: (mem, ele) => {
        output.push(mem[ele]);
        // console.log(mem[ele]);
        inputBuffer.splice(inputIndex + 1, 0, mem[ele]);
      },
    },
  };

  const accessMode = {
    0: (mem, ele) => mem[ele],
    1: (mem, ele) => ele,
  };

  const executeLogicalOp = (memory, i) => {
    const [p3, p2Mode, p1Mode, ...codeArray] = memory[i].toString().padStart(
      5,
      "0",
    )
      .split("");
    const code = (+(codeArray.join(""))).toString();

    const checkingElement = accessMode[p1Mode](memory, memory[i + 1]);
    const newJump = accessMode[p2Mode](memory, memory[i + 2]);

    return logicalDecision[code].toJump(checkingElement) ? newJump : i + 3;
  };

  const executeLogicalStoringOp = (memory, i) => {
    const [p3Mode, p2Mode, p1Mode, ...codeArray] = memory[i].toString()
      .padStart(
        5,
        "0",
      )
      .split("");

    const code = (+(codeArray.join(""))).toString();

    const p1 = accessMode[p1Mode](memory, memory[i + 1]);
    const p2 = accessMode[p2Mode](memory, memory[i + 2]);
    const p3 = p3Mode === "1" ? i + 3 : memory[i + 3];

    const toStore = logialStorings[code].toStore(p1, p2) ? 1 : 0;

    memory[p3] = toStore;
    return i + 4;
  };

  const executeArithmaticOp = (memory, i) => {
    const inst = memory[i].toString().padStart(5, "0");

    const code = +inst.slice(3, 5);
    const aModeNum = inst[2];
    const bModeNum = inst[1];
    const cModeNum = inst[0];

    const a = accessMode[aModeNum](memory, memory[i + 1]);
    const b = accessMode[bModeNum](memory, memory[i + 2]);

    const val = arithmatic[code].func(a, b);

    const storingIndex = cModeNum === "1" ? index + 3 : memory[i + 3];
    memory[storingIndex] = val;

    return arithmatic[code].jump;
  };

  const executeIOoperation = (memory, i) => {
    const inst = memory[i].toString().padStart(5, "0");

    const code = +inst.slice(3, 5);

    const access = inst[2];

    const address = access === "1" ? i + 1 : memory[i + 1];

    IO[code].func(memory, address);

    return IO[code].jump;
  };

  const executeInstruction = (memory, i) => {
    const code = (memory[i] % 10).toString();

    if (Object.keys(arithmatic).includes(code)) {
      return i + executeArithmaticOp(memory, i);
    } else if (Object.keys(IO).includes(code)) {
      return i + executeIOoperation(memory, i);
    } else if (Object.keys(logicalDecision).includes(code)) {
      return executeLogicalOp(memory, i);
    } else if (Object.keys(logialStorings).includes(code)) {
      return executeLogicalStoringOp(memory, i);
    }

    return i;
  };

  let i = 0;
  while (memory[i] !== 99) {
    i = executeInstruction(memory, i);
  }
  return memory[0];
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

const uniqueCommands = uniquePairs([0, 1, 2, 3, 4]);

let max = { val: 0, by: [] };
for (let index = 0; index < uniqueCommands.length; index++) {
  inputIndex = 0;
  inputBuffer = [...uniqueCommands[index]];
  inputBuffer.splice(1, 0, 0);

  for (let index = 0; index < 5; index++) {
    mememoryAfterExectution(inputBuffer);
  }
  if (inputBuffer.at(-1) > max.val) {
    max = {
      val: inputBuffer.at(-1),
      by: uniqueCommands[index],
    };
  }
}

console.log("Max :", max);
