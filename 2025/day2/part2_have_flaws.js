// I AM UNABLE TO THINK ABOUT THE EDGE CASE EXAMPLE RIGHT NOW.
// THE EDGE CASE WHICH IT IS MISSING IS SOMETHING LIKE WE HAVE REPEATED MATCHED AND THEN WE GET INVALID ONE, CURRENTLY IT RESETS IT TO STARTING BUT IT SHOULD CHECK IN BETWEEN MATCHES TOO.
// 121121 -> this is the edge case which i missed

const SAMPLES = {
    SAMPLE_1: "sampleInput.txt",
    INPUT: "input.txt",
    CUSTOM_SAMPLE: "custSample.txt",
};

const rawData = Deno.readTextFileSync(SAMPLES.CUSTOM_SAMPLE);

const data = rawData.split(",").map((range) => {
    const [min, max] = range.split("-");
    const data = [];
    for (let i = Number(min); i <= Number(max); i++) {
        data.push(i);
    }
    return data;
}).flat();

const dbg = (value, isPrompt = false) => {
    console.log({ value });
    if (isPrompt) {
        prompt("");
    }
    return value;
};

const repeatPattern = (pattern, times) => {
    const pat = [];
    for (let i = 0; i < times; i++) {
        pat.push(...pattern);
    }
    return pat;
};

const isInvalidId = (id) => {
    let repTimes = 0;
    const subPattern = [];
    let idx = 0;

    for (const char of id) {
        // dbg({ idx, char, subPattern, repTimes });
        if (subPattern[idx] === char) {
            idx++;
        } else {
            if (repTimes !== 0 && subPattern[0] === char) {
                subPattern.push(...repeatPattern(subPattern, repTimes));
                subPattern.push(...subPattern.slice(0, idx));
                repTimes = 0;
                idx = 1;
            } else {
                subPattern.push(...repeatPattern(subPattern, repTimes));
                subPattern.push(...subPattern.slice(0, idx));
                subPattern.push(char);
                repTimes = 0;
                idx = 0;
            }
        }

        if (idx === subPattern.length) {
            repTimes += 1;
            idx = 0;
        }
    }

    return repTimes > 0 && idx === 0;
};

const getInvalidIds = (ids) => {
    return ids.filter((each) => {
        return isInvalidId(String(each));
    });
};

const sum = (data) => data.reduce((a, b) => a + b, 0);

// console.log("data: data", data);
const invalidIds = getInvalidIds(data);
console.log({invalidIds})
Deno.writeTextFileSync("./temp.txt", invalidIds);


console.log("Sum : ", sum(invalidIds));
