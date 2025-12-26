const rawData = Deno.readTextFileSync("./input1.txt");

const parseInput = (rawData) => {
  const conversions = [];
  const reactants = [];
  const [conversionsString, formula] = rawData.split("\n\n");
  const matches = [...conversionsString.matchAll(/(.*) => (.*)/g)];
  for (const match of matches) {
    const obj = { reactant: match[1], product: match[2] };

    conversions.push(obj);
    reactants.push(match[1]);
  }

  return [conversions, formula];
};

const createUsingOneReplace = (formula, from, to) => {
  const prevs = [];
  const newFormula = [];
  let index = 0;
  while (index < formula.length) {
    const fromIndex = index;
    if (formula[index] === from[0] && formula.slice(index).startsWith(from)) {
      const fromLength = from.length;
      newFormula.push(
        [...prevs, to, ...(formula.slice(index + fromLength))].join(""),
      );
      index += fromLength - 1;
    }
    index++;

    prevs.push(formula.slice(fromIndex, index));
  }

  return newFormula;
};

const newFormulas = (formula, conversion) => {
  const formulas = [];
  for (const { reactant, product } of conversion) {
    formulas.push(...createUsingOneReplace(formula, reactant, product));
  }
  return formulas;
};

const findUnique = (data) => {
  const unique = [];
  for (let index = 0; index < data.length; index++) {
    const singleEntry = data[index];
    if (!unique.includes(singleEntry)) {
      unique.push(singleEntry);
    }
  }
  return unique;
};

const [conversions, formula] = parseInput(rawData);

const converted = newFormulas(formula, conversions);

const unique = findUnique(converted);
console.log(conversions);
console.log(formula);

console.log(converted.length);
console.log(unique.length);
