const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
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

const isFresh = (id, ranges) => {
    return ranges.some(([min, max]) => min <= id && id <= max);
};

const getFreshCount = (ids, ranges) => {
    let freshCount = 0;
    for (const id of ids){
        if (isFresh(id, ranges)){
            freshCount++;
        }
    }
    return freshCount;
};

const itemsDetail = parseData(rawData);
console.log(getFreshCount(itemsDetail.ingredientIds, itemsDetail.range))