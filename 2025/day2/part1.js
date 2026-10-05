const SAMPLES = {
    SAMPLE_1: "sampleInput.txt",
    INPUT: "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLES.INPUT);

const data = rawData.split(",").map((range) => {
    const [min, max] = range.split("-");
    const data = [];
    for (let i = Number(min); i <= Number(max); i++) {
        data.push(i);
    }
    return data;
}).flat();

const isInvalidId = (id) =>
    id.length % 2 === 0 &&
    id.substring(0, id.length / 2) === id.substring(id.length / 2);

const getInvalidIds = (ids) => {
    return ids.filter((each) => {
        return isInvalidId(String(each));
    });
};

const sum = (data) => data.reduce((a, b) => a + b, 0);

console.log("Sum : ", sum(getInvalidIds(data)));
