const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.INPUT);

const parseData = (rawData) => {
    const rows = rawData.split("\n");
    const operatorRows = rows.at(-1);
    const splitPoints = [];
    for (let idx = 1; idx < operatorRows.length - 1; idx++) {
        if (operatorRows[idx + 1] !== " ") {
            splitPoints.push(idx);
        }
    }
    const equationsPart = Array.from(
        { length: splitPoints.length + 1 },
        () => [],
    );

    let lastPoint = -1;
    for (let i = 0; i < splitPoints.length; i++) {
        const splitPoint = splitPoints[i];

        for (const row of rows) {
            const part = row.slice(lastPoint + 1, splitPoint);
            equationsPart[i].push(part);
        }
        lastPoint = splitPoint;
    }
    for (const row of rows) {
        const part = row.slice(lastPoint + 1);
        equationsPart[splitPoints.length ].push(part);
    }
    return equationsPart;
};

const calculate = (operator, values) => {
    let total = operator === "*" ? 1 : 0;
    console.log({ values });
    const unParsedNumber = Array.from({ length: values.length }, () => []);
    for (let j = 0; j < values[0].length; j++) {
        for (let i = 0; i < values.length; i++) {
            unParsedNumber[j].push(values[i][j]);
        }
    }
    const numbers = unParsedNumber.map((each) => Number(each.join("")));
    for (const number of numbers) {
        total = operator.trim() === "*" ? total * number : total + number;
    }
    return total;
};

const calculateEquation = (equation) => {
    const values = equation.slice(0, equation.length - 1);

    const operator = equation.at(-1).trim();
    // console.log({ values, operator });
    return calculate(operator, values);
};

const calculateItems = (equations) => {
    const results = [];
    for (const equation of equations) {
        const result = calculateEquation(equation);
        results.push(result);
    }

    return results;
};

const equations = parseData(rawData);

console.log(equations);

const result = calculateItems(equations);
console.log(result);
console.log(result.reduce((a, b) => a + b, 0));
