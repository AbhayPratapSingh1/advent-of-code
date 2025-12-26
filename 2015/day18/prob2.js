const rawData = Deno.readTextFileSync("./input2.txt");

const parseInput = (data) => data.split("\n").map((each) => each.split(""));

const data = parseInput(rawData);

const ifNeighbourOn = (col, row, data) => {
  if (col < 0 || col >= data[0].length) {
    return false;
  }
  if (row < 0 || row >= data.length) {
    return false;
  }
  return data[col][row] === "#";
};

const countNeighbour = (row, col, data) => {
  let totalOn = 0;
  for (let drow = row - 1; drow < row + 2; drow++) {
    for (let dcol = col - 1; dcol < col + 2; dcol++) {
      if (ifNeighbourOn(drow, dcol, data)) {
        totalOn++;
      }
    }
  }
  return totalOn - (data[row][col] === "#" ? 1 : 0);
};

const ACTIONS = {
  "#": (data, row, col, actualData) => {
    const neighbour = countNeighbour(row, col, actualData);
    if (neighbour !== 2 && neighbour !== 3) {
      data[row][col] = ".";
    }
  },
  ".": (data, row, col, actualData) => {
    const neighbour = countNeighbour(row, col, actualData);
    if (neighbour === 3) {
      data[row][col] = "#";
    }
  },
};

const turnOneCycle = (data) => {
  const actualData = data.map((each) => each.map((ev) => ev));
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      const status = data[row][col];

      ACTIONS[status](data, row, col, actualData);
    }
  }
};
data[0][0] = "#";
data[0][data[0].length - 1] = "#";
data[data.length - 1][0] = "#";
data[data.length - 1][data[0].length - 1] = "#";

for (let index = 0; index < 100; index++) {
  turnOneCycle(data);

  data[0][0] = "#";
  data[0][data[0].length - 1] = "#";
  data[data.length - 1][0] = "#";
  data[data.length - 1][data[0].length - 1] = "#";
}

console.log(data.map((each) => each.join("")).join("\n"));

const lightData = data.flat();
console.log(lightData.filter((each) => each === "#").length);
