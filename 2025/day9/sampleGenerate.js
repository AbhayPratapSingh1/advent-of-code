const rawData = Deno.readTextFileSync("./sample-gen-input.txt");

const data = rawData.split("\n").map((e) => e.split(""));
const points = [];
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] === "X") {
            points.push([x, y]);
        }
    }
}

const finalData = points.map(e => e.join(",")).join("\n");
Deno.writeTextFileSync("./out.txt",finalData,)