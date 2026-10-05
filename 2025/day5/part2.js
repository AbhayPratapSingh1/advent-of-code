const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
    "CUSTOM_SAMPLE_1" : "custom_sample_1.txt"
};

const rawData = Deno.readTextFileSync(SAMPLE.INPUT);

const parseData = (rawData) => {
    const [rawRange, rawIngredientId] = rawData.split("\n\n");
    const range = rawRange.split("\n").map((row) =>
        row.split("-").map((num) => Number(num))
    );
    const ingredientIds = rawIngredientId.split("\n").map((each) =>
        Number(each)
    );
    return { range, ingredientIds };
};

const isBetween = (id, range) => {
    const [min, max] = range;
    return min <= id && id <= max;
};

const isOverLapping = (range1, range2) => {
    const [min, max ] = range1;
    console.log(range1, range);
    
    return isBetween(min, range2) || isBetween(max, range2)  || (range2[0] < range1[0] && range2[0] > range1[1]) || (range1[0] < range2[0] && range1[1] > range2[0]);
}

const mergeRange = (range1, range2) => {
    const min = range1[0] > range2[0] ? range2[0] : range1[0];
    const max = range1[1] > range2[1] ? range1[1] : range2[1];
    return [min, max];
};

const getFreshCandidateRanges = (ranges) => {
    const freshStandardRange = [];
    let mergeCount = 0;

    for (const range of ranges) {
        const rangeIndex = freshStandardRange.findIndex((addedRange) =>
            isOverLapping(addedRange, range)
        );
        
        if (rangeIndex !== -1) {
            mergeCount++;
            const newRange = mergeRange(range, freshStandardRange[rangeIndex]);
            freshStandardRange[rangeIndex] = newRange;
        } else {
            freshStandardRange.push(range);
        }
    }
    
    return mergeCount === 0? freshStandardRange : getFreshCandidateRanges(freshStandardRange);
};
const calculateRangeItems = (ranges) => {
    let total = 0;
    for (const range of  ranges){
        total += range[1] - range[0] + 1;
    }
    return total;
}

const { range } = parseData(rawData);
const freshCandidateRange = getFreshCandidateRanges(range);


const freshIngredientCount = calculateRangeItems(freshCandidateRange);

console.log({freshIngredientCount})