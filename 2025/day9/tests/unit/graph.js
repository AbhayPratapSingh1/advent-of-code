// Point/line graph builders and shape helpers:
// getPointsPair, getPointMap, troversUntilFound, getClosedShapes,
// getShapes, isAllHave2, matrix, fill.
// Each case: { name, method, args: [...], expected }
// `post` (optional) lets a case assert on a mutated value.
export default [
    // ---------------- getPointsPair ----------------
    {
        name: "getPointsPair: no points",
        method: "getPointsPair",
        args: [[]],
        expected: [],
    },
    {
        name: "getPointsPair: single point -> no pair",
        method: "getPointsPair",
        args: [[[1, 1]]],
        expected: [],
    },
    {
        name: "getPointsPair: diagonal pair shares no axis",
        method: "getPointsPair",
        args: [[[1, 1], [2, 2]]],
        expected: [],
    },
    {
        name: "getPointsPair: vertical pair",
        method: "getPointsPair",
        args: [[[1, 1], [1, 5]]],
        expected: [{ p1: [1, 1], p2: [1, 5] }],
    },
    {
        name: "getPointsPair: horizontal + vertical pair, diagonal skipped",
        method: "getPointsPair",
        args: [[[1, 1], [4, 1], [1, 4]]],
        expected: [
            { p1: [1, 1], p2: [4, 1] },
            { p1: [1, 1], p2: [1, 4] },
        ],
    },

    // ---------------- getPointMap ----------------
    {
        name: "getPointMap: no points -> empty map",
        method: "getPointMap",
        args: [[]],
        expected: {},
    },
    {
        name: "getPointMap: diagonal points are not connected",
        method: "getPointMap",
        args: [[[1, 1], [2, 2]]],
        expected: {},
    },
    {
        name: "getPointMap: vertical pair links both ways",
        method: "getPointMap",
        args: [[[1, 1], [1, 5]]],
        expected: { "1,1": ["1,5"], "1,5": ["1,1"] },
    },
    {
        name: "getPointMap: three collinear points -> everyone links to everyone",
        method: "getPointMap",
        args: [[[1, 1], [1, 2], [1, 3]]],
        expected: {
            "1,1": ["1,2", "1,3"],
            "1,2": ["1,1", "1,3"],
            "1,3": ["1,1", "1,2"],
        },
    },


    // ---------------- troversUntilFound / getClosedShapes / getShapes ----------------
    {
        name: "troversUntilFound: two node cycle",
        method: "troversUntilFound",
        args: [{ "a": ["b"], "b": ["a"] }, "a", ["a"]],
        expected: [["a"], ["a", "b"], ["a", "b", "a"]],
    },
    {
        name: "getClosedShapes: empty map -> undefined",
        method: "getClosedShapes",
        args: [{}],
        expected: undefined,
    },
    {
        name: "getClosedShapes: only the first key is walked",
        method: "getClosedShapes",
        args: [{ "a": ["b"], "b": ["a"] }],
        expected: [["a"], ["a", "b"], ["a", "b", "a"]],
    },
    {
        name: "getShapes: single vertical segment",
        method: "getShapes",
        args: [
            [["1,1", "1,5"]],
            { "1,1": ["1,5"], "1,5": ["1,1"] },
        ],
        expected: [["1,1", "1,5"]],
    },
    {
        name: "getShapes: square cycle is walked in both directions",
        method: "getShapes",
        args: [
            [["1,1", "1,3"]],
            {
                "1,1": ["1,3", "3,1"],
                "1,3": ["1,1", "3,3"],
                "3,1": ["1,1", "3,3"],
                "3,3": ["1,3", "3,1"],
            },
        ],
        expected: [
            ["1,1", "1,3", "3,3", "3,1"],
            ["1,1", "3,1", "3,3", "1,3"],
        ],
    },

    // ---------------- isAllHave2 ----------------
    { name: "isAllHave2: empty map -> true", method: "isAllHave2", args: [{}], expected: true },
    {
        name: "isAllHave2: all keys have 2 neighbours",
        method: "isAllHave2",
        args: [{ "a": [1, 2], "b": [3, 4] }],
        expected: true,
    },
    {
        name: "isAllHave2: a key with 1 neighbour breaks it",
        method: "isAllHave2",
        args: [{ "a": [1, 2], "b": [3] }],
        expected: false,
    },
    {
        name: "isAllHave2: a key with 3 neighbours breaks it",
        method: "isAllHave2",
        args: [{ "a": [1, 2, 3] }],
        expected: false,
    },

    // ---------------- matrix / fill ----------------
    {
        name: "matrix: single cell grid with the point marked",
        method: "matrix",
        args: [[[0, 0]], 0, 0],
        expected: [["#"]],
    },
    {
        name: "matrix: 3x3 grid, point at (1,1) (row = y, cell = x)",
        method: "matrix",
        args: [[[1, 1]], 2, 2],
        expected: [
            [".", ".", "."],
            [".", "#", "."],
            [".", ".", "."],
        ],
    },
    {
        name: "matrix: no points -> all dots",
        method: "matrix",
        args: [[], 1, 1],
        expected: [
            [".", "."],
            [".", "."],
        ],
    },
    {
        name: "fill: mutates the grid with the given icon and returns undefined",
        method: "fill",
        args: [
            [
                [".", "."],
                [".", "."],
            ],
            [[1, 0]],
            "X",
        ],
        expected: [
            [".", "X"],
            [".", "."],
        ],
        post: (args) => args[0],
    },
    {
        name: "fill: default icon is X",
        method: "fill",
        args: [
            [["."]],
            [[0, 0]],
        ],
        expected: [["X"]],
        post: (args) => args[0],
    },
];
