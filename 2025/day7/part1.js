const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.INPUT);

const parseData = (rawData) => {
    return rawData.split("\n").map((row) => row.split(""));
};

const initialPosition = (row) => row.findIndex((e) => e === "S");

const unique = (data) => {
    const uniqueData = [];

    for (const item of data) {
        if (!uniqueData.includes(item)) {
            uniqueData.push(item);
        }
    }

    return uniqueData;
};
const dropRays = (data, row, rays=[], deflected = 0) => {
    if (row === data.length) {
        return {rays, deflected};
    }
    let totalDeflected = deflected;
    const newRays = [];

    for (const rayIndex of rays) {
        if (data[row][rayIndex] === "^") {
            totalDeflected += 1;
            newRays.push(rayIndex - 1, rayIndex + 1);
        } else {
            newRays.push(rayIndex);
        }
    }

    return dropRays(data, row + 1, unique(newRays), totalDeflected);
};

const parsedData = parseData(rawData);
const initialPos = initialPosition(parsedData[0]);
const finalRays = dropRays(parsedData, 1, [initialPos]);
console.log(initialPos, finalRays);
