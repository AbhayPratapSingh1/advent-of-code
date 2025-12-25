const sortOnVals = (data) =>
  data.toSorted((a, b) => {
    if (a.val === b.val) {
      return a.w - b.w;
    }
    return a.val - b.val;
  });

const sumWeight = (vals) => vals.reduce((a, b) => a + b.vals, 0);

const knapsackAlgo = (W, val, wt, n) => {
  if (n === 0 || W === 0) {
    return 0;
  }

  let pick = 0;

  if (wt.at(-1) >= W) {
    pick = val.at(-1) +
      knapsackAlgo(
        W - wt.at(-1),
        val.slice(0, n - 1),
        wt.slice(0, n - 1),
        n - 1,
      );
  }
  console.log(n, { pick });

  const notPick = knapsackAlgo(
    W - wt.at(-1),
    val.slice(0),
    wt.slice(0),
    n - 1,
  );

  return Math.max(notPick, pick);
};

const knapsack = (data, total) => {
  const wt = data.map((each) => each.w);
  const val = data.map((each) => each.val);
  return knapsackAlgo(total, val, wt, wt.length);
};

const data = [
  { item: "A", w: 2, val: 10, isTaken: false },
  { item: "B", w: 5, val: 20, isTaken: false },
  { item: "C", w: 3, val: 15, isTaken: false },
  { item: "D", w: 7, val: 25, isTaken: false },
  { item: "E", w: 6, val: 22, isTaken: false },
];
console.log(data);

const total = 15;

console.log("\n\n\n\n", knapsack(data, total));
