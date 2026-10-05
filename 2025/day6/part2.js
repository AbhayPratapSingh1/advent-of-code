const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.INPUT);

const parsedData = (rawData) => {
    const data = rawData.split("\n");
    const numbers = data.slice(0, data.length - 1);
    const sets = [];
    const operators = data.at(-1).split(/\s+/);

    let actualNumbers = [];
    for (let i = 0; i < numbers[0].length; i++) {
        let rawNum = [];
        for (let j = 0; j < numbers.length; j++) {
            rawNum.push(numbers[j][i]);
        }
        const num = Number(rawNum.join(""));

        if (rawNum.join("").trim() === "") {
            sets.push({
                values: actualNumbers,
                operator: operators[sets.length],
            });
            actualNumbers = [];
        } else {
            actualNumbers.push(num);
        }
    }
    sets.push({ values: actualNumbers, operator: operators[sets.length] });

    return sets;
};

const calculator = (values, operator) => {
    let total = operator === "*" ? 1 : 0;
    for (const value of values) {
        total = operator === "*" ? total * value : total + value;
    }
    return total;
};

const calculateAll = (equationsData) => {
    const data = equationsData.map(({values, operator}) => calculator(values, operator))
    return data;
}

const sum = (values) => values.reduce((a, b)=> a+ b, 0);


const equationsData = parsedData(rawData);
const calculatedValues = calculateAll(equationsData);
const finalValue = sum(calculatedValues);

console.log({ userData: equationsData, calculatedValues, finalValue });
