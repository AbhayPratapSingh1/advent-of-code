const rawData = Deno.readTextFileSync("./input.txt");

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

const createUsingOneReplace = (formula, offset, from, to) => {
  const prevs = [];
  let index = offset;

  while (index < formula.length) {
    const fromIndex = index;

    if (formula[index] === from[0] && formula.slice(index).startsWith(from)) {
      const fromLength = from.length;

      return {
        offset: index + fromLength,
        formula: [
          formula.slice(0, index),
          to,
          ...(formula.slice(index + fromLength)),
        ].join(
          "",
        ),
      };
    }
    index++;
    prevs.push(formula.slice(fromIndex, index));
  }
  return { offset: formula.length, formula };
};

const createFormulat = (created, conversion, formula, i = 0) => {
  if (formula === created) {
    return 0;
  }
  let minSteps = Infinity;

  for (let index = 0; index < conversion.length; index++) {
    if (i === 1) {
      console.log(index);
    }

    let offset = 0;

    while (offset !== created.length) {
      const { formula: newFormula, offset: newOffset } = createUsingOneReplace(
        created,
        offset,
        conversion[index].product,
        conversion[index].reactant,
      );

      offset = newOffset;

      if (newFormula !== created) {
        const step = createFormulat(newFormula, conversion, formula);
        if (step < minSteps) {
          minSteps = step;
        }
      }
    }
  }

  return minSteps + 1;
};

const [conversions, formula] = parseInput(rawData);

console.log(createFormulat(formula, conversions, "e", 1));
