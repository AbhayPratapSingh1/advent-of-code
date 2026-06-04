const inputs = {
  simple:
    `10 ORE => 10 A\n1 ORE => 1 B\n7 A, 1 B => 1 C\n7 A, 1 C => 1 D\n7 A, 1 D => 1 E\n7 A, 1 E => 1 FUEL`,
  simple2: `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`,
  large: `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`,
  large2: `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`,
  large3: `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`,
  final: Deno.readTextFileSync("./input.txt"),
};

const parseReactants = (reactantEquations) => {
  const reactants = {};
  for (const item of reactantEquations.split(",")) {
    const [count, reac] = item.trim().split(" ");
    reactants[reac] = +count;
  }
  return reactants;
};

const parse = (input) => {
  const items = input.split("\n").map((equation) => equation.split("=>"));
  const data = {};
  for (const [reactant, product] of items) {
    const [count, prod] = product.trim().split(" ");
    data[prod] = {
      count: +count,
      reactant: parseReactants(reactant),
    };
  }
  return data;
};

const createResourse = (item, curResource, formulas) => {
  const { count, reactant } = formulas[item];

  let ores = 0;
  for (const react in reactant) {
    const have = curResource[react] || 0;

    if (react === "ORE") {
      ores += reactant[react];
    } else {
      curResource[react] = have;
      while (curResource[react] < reactant[react]) {
        const [oreReq, count] = createResourse(react, curResource, formulas);
        curResource[react] += count;
        ores += oreReq;
      }
      curResource[react] -= reactant[react];
    }
  }

  return [ores, count];
};
const isAllExhausted = (resources) => {
  return Object.entries(resources).every(([res, count]) => count === 0);
};

const getFuelFromOre = (formulas, leftOre) => {
  const currentResources = {};
  let left = leftOre;
  let fuel = 0;
  let ores = 1;
  while (left > 0 && ores !== 0) {
    [ores] = createResourse("FUEL", currentResources, formulas);
    left -= ores;
    fuel++;
  }

  return left < 0 ? fuel - 1 : fuel;
};

const findRequired = (formulas, total) => {
  let left = total;
  const currentResources = {};
  let fuel = 0;
  let ores = 1;

  do {
    [ores] = createResourse("FUEL", currentResources, formulas);

    left -= ores;
    fuel++;
  } while (left > 0 && ores !== 0 && !(isAllExhausted(currentResources)));

  const used = total - left;

  const compeleteCreation = Math.floor(total / used) * fuel;
  const leftAfterConsumption = total % used;

  console.log({ compeleteCreation });
  const extraNotCompletedFuel = getFuelFromOre(formulas, leftAfterConsumption);
  console.log({ extraNotCompletedFuel });
  const totalFuel = extraNotCompletedFuel + compeleteCreation;

  return { totalFuel };
};

const totalOre = 1000000000000;

const requirements = parse(inputs.large3);

console.log(findRequired(requirements, totalOre));
