const output = [];

const mememoryAfterExectution = () => {
  // const data = "3,3,1108,-1,8,3,4,3,99";
  // const data = "3,9,7,9,10,9,4,9,99,-1,8";
  // const data = "3,9,8,9,10,9,4,9,99,-1,8";
  // const data = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1";
  // const data = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9";
  // const data = "3,3,1108,-1,8,3,4,3,99";
  // const data =
  //   "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
  const data =
    "3,225,1,225,6,6,1100,1,238,225,104,0,1101,65,73,225,1101,37,7,225,1101,42,58,225,1102,62,44,224,101,-2728,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1,69,126,224,101,-92,224,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1102,41,84,225,1001,22,92,224,101,-150,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,80,65,225,1101,32,13,224,101,-45,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,1101,21,18,225,1102,5,51,225,2,17,14,224,1001,224,-2701,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,101,68,95,224,101,-148,224,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,12,22,225,102,58,173,224,1001,224,-696,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,1002,121,62,224,1001,224,-1302,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,359,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,374,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,389,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,404,101,1,223,223,7,226,677,224,1002,223,2,223,1005,224,419,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,434,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,449,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,464,101,1,223,223,1107,226,226,224,102,2,223,223,1006,224,479,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,494,101,1,223,223,108,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,524,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,539,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,569,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,584,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,599,1001,223,1,223,1008,677,677,224,1002,223,2,223,1005,224,614,101,1,223,223,1107,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,1108,677,226,224,1002,223,2,223,1005,224,644,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,659,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,674,101,1,223,223,4,223,99,226";
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
        mem[ele] = +prompt(">");
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

mememoryAfterExectution();
console.log(output.join(""));
