export const turnRover = ({ x, y, direction }, side) => {
  const directions = [..."NESW"];
  const index = directions.indexOf(direction);
  const sides = { 1: 1, 0: 3 };

  const newDirection = directions[(index + sides[side]) % 4];
  return { x, y, direction: newDirection };
};

export const moveRover = ({ x, y, direction }) => {
  const commands = {
    N: () => ({ x, y: y + 1, direction }),
    E: () => ({ x: x + 1, y, direction }),
    S: () => ({ x, y: y - 1, direction }),
    W: () => ({ x: x - 1, y, direction }),
  };

  return commands[direction]();
};

export const executeInstruction = (position, instruction) => {
  const newPos = { ...position };
  console.log(newPos, "ins rover ke ander", instruction);
  const currentPosition = turnRover(newPos, instruction);
  const retu = moveRover(currentPosition);
  console.log("RTEUT:", retu);

  return retu;
};
