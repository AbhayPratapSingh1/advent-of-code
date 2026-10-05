const SAMPLES = {
    SAMPLE_1: "sampleInput.txt",
    INPUT: "input.txt",
    CUSTOM_SAMPLE: "custSample.txt",
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

const factorise = (num) => {
    const factors = [];
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

const isInvalidId = (id) => {
    const len = id.length;
    const factors = factorise(len);
    let isInvalid = true;
    
    for (const factor of factors) {
        const subPattern = id.slice(0, factor);
        for (let i = 0; i < len/factor; i++) {
            if (subPattern !== id.slice(i * factor, (i + 1) * factor)) {
                isInvalid = false;      
                break;
            } 
        }
        
        if (isInvalid){
            return true;
        }
        isInvalid = true;
    }
    return false;

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
