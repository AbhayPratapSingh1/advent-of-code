const data = Deno.readTextFileSync("./input.txt");

// const data = "turn on 0,0 through 999,999";
// const data = "toggle 0,0 through 999,0";
// const data = "turn off 499,499 through 500,500";

const parseInstruction = (unparsedString) => {
  const splittedInstructions = unparsedString.split("\n");
  const instructionIteratorMatches = splittedInstructions.map(
    (each) => [...each.matchAll(/(.*) (\d+),(\d+) through (\d+),(\d+)/g)][0],
  );

  return instructionIteratorMatches.map((each) => ({
    action: each[1],
    from: { x: +each[2], y: +each[3] },
    to: { x: +each[4], y: +each[5] },
  }));
};

const instructions = parseInstruction(data);

const lights = Array.from(
  { length: 1000 },
  () => Array.from({ length: 1000 }, () => 0),
);

const executeToggle = (lights, from, to) => {
  for (let row = from.y; row <= to.y; row++) {
    for (let col = from.x; col <= to.x; col++) {
      // lights[row][col] = lights[row][col] ? false : true;
      lights[row][col] += 2;
    }
  }
};

const executeTurnOn = (lights, from, to) => {
  for (let row = from.y; row <= to.y; row++) {
    for (let col = from.x; col <= to.x; col++) {
      // lights[row][col] = true;
      lights[row][col] += 1;
    }
  }
};

const executeTurnOff = (lights, from, to) => {
  for (let row = from.y; row <= to.y; row++) {
    for (let col = from.x; col <= to.x; col++) {
      // lights[row][col] = false;
      lights[row][col] = lights[row][col] === 0 ? 0 : lights[row][col] - 1;
    }
  }
};

const instructionActions = {
  toggle: executeToggle,
  "turn on": executeTurnOn,
  "turn off": executeTurnOff,
};

const executeInstructions = (lights, instructions) => {
  for (const instruction of instructions) {
    instructionActions[instruction.action](
      lights,
      instruction.from,
      instruction.to,
    );
  }
};

const countTurnedOn = (lights) => {
  let totalBrigtness = 0;
  for (let row = 0; row < lights.length; row++) {
    for (let col = 0; col < lights[row].length; col++) {
      totalBrigtness += lights[row][col];
    }
  }
  console.log("count :", totalBrigtness);
};

executeInstructions(lights, instructions);
countTurnedOn(lights);
