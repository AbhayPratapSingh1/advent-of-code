const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.SAMPLE_1);

const parseData = (rawData) => {
    return rawData.split("\n").map((row) =>
        row.split(/\s+/).filter((each) => each)
    );
};

const calculate = (operator, values) => {
    let total = operator === "*" ? 1 : 0;
    for (const value of values) {
        total = operator === "*" ? total * value : total + value;
    }
    return total;
};

const calculateEquation = (equations, index) => {
    const equation = equations.map((each) => each[index]);
    const values = equation.slice(0, equation.length - 1).map((each) =>
        Number(each)
    );
    
    const operator = equation.at(-1);
    console.log({values,operator});
    return calculate(operator, values);
};

const calculateItems = (equations) => {
    const results = [];
    for (let i =0 ; i < equations[0].length; i++){
        const result = calculateEquation(equations, i);
        results.push(result)
    }
    return results
};

const equations = parseData(rawData);
const result = calculateItems(equations);

console.log(result);
console.log(result.reduce((a, b) => a + b, 0));
