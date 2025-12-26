const readData = () => {
  return Deno.readTextFileSync("./t.txt");
};

const writeData = () => {
  Deno.writeTextFileSync("./t.txt", "1");
};

const retIfNotNaN = (val) => {
  if (val === "NaN") {
    return undefined;
  }
  return +val;
};

let run = true;
let mode = "Move Forward ";
setInterval(() => {
  if (run) {
    const input = readData();
    mode = mode.slice(mode.length - 10);
    if (input[0] === "0") {
      mode = " L ";
    } else if (input[0] === "2") {
      mode = " R ";
    } else {
      mode = " M ";
    }
    if (input[0] === "3") {
      const delay = +(retIfNotNaN(input.slice(1)) || 5) * 1000;

      setTimeout(() => {
        run = true;
      }, delay);
      run = false;
    }
    console.log(mode);

    writeData();
  }
}, 1000);
