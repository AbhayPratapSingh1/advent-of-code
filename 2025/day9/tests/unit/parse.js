// parseData / getMaxIndexValue edge cases.
// Each case: { name, method, args: [...], expected }
export default [
    // ---------------- parseData ----------------
    {
        name: "parseData: two rows",
        method: "parseData",
        args: ["1,2\n3,4"],
        expected: [[1, 2], [3, 4]],
    },
    {
        name: "parseData: single row",
        method: "parseData",
        args: ["5,6"],
        expected: [[5, 6]],
    },
    {
        name: "parseData: negative coordinates",
        method: "parseData",
        args: ["-3,10\n4,-1"],
        expected: [[-3, 10], [4, -1]],
    },
    {
        name: "parseData: extra column is kept (3 values in one row)",
        method: "parseData",
        args: ["1,2,3"],
        expected: [[1, 2, 3]],
    },
    {
        name: "parseData: spaces around numbers are trimmed by Number()",
        method: "parseData",
        args: ["1, 2"],
        expected: [[1, 2]],
    },
    {
        name: "parseData: non numeric values become NaN",
        method: "parseData",
        args: ["a,b"],
        expected: [[NaN, NaN]],
    },

    // ---------------- getMaxIndexValue ----------------
    {
        name: "getMaxIndexValue: max x",
        method: "getMaxIndexValue",
        args: [[[1, 5], [9, 2]], 0],
        expected: 9,
    },
    {
        name: "getMaxIndexValue: max y",
        method: "getMaxIndexValue",
        args: [[[1, 5], [9, 2]], 1],
        expected: 5,
    },
    {
        name: "getMaxIndexValue: empty data -> 0 (reduce seed)",
        method: "getMaxIndexValue",
        args: [[], 0],
        expected: 0,
    },
    {
        name: "getMaxIndexValue: single point",
        method: "getMaxIndexValue",
        args: [[[3, 3]], 1],
        expected: 3,
    },
];
