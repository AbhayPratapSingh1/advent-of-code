const writeData = (data) => {
  Deno.writeTextFileSync("./t.txt", data);
};

while (true) {
  const data = prompt(">> ");
  writeData(data);
}
