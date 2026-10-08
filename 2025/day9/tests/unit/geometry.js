// Pure geometry helpers: sqr, sqrt, delta, getDistance, areaOfRect,
// sqrDistanceBetweenPoint, isOnLine, isOnAnyLine.
// Each case: { name, method, args: [...], expected }
export default [
    // ---------------- sqr / sqrt ----------------
    { name: "sqr: negative input", method: "sqr", args: [-3], expected: 9 },
    { name: "sqr: zero", method: "sqr", args: [0], expected: 0 },
    { name: "sqr: fraction", method: "sqr", args: [2.5], expected: 6.25 },
    { name: "sqrt: perfect square", method: "sqrt", args: [16], expected: 4 },
    { name: "sqrt: zero", method: "sqrt", args: [0], expected: 0 },

    // ---------------- delta ----------------
    { name: "delta: a < b", method: "delta", args: [3, 10], expected: 7 },
    { name: "delta: equal values", method: "delta", args: [5, 5], expected: 0 },
    { name: "delta: negatives", method: "delta", args: [-2, 2], expected: 4 },

    // ---------------- getDistance (returns width/height incl. +1) ----------------
    {
        name: "getDistance: normal pair",
        method: "getDistance",
        args: [[0, 0], [2, 3]],
        expected: [3, 4],
    },
    {
        name: "getDistance: same point -> 1 x 1",
        method: "getDistance",
        args: [[5, 5], [5, 5]],
        expected: [1, 1],
    },
    {
        name: "getDistance: reversed order is still positive",
        method: "getDistance",
        args: [[3, 7], [0, 0]],
        expected: [4, 8],
    },

    // ---------------- areaOfRect ----------------
    { name: "areaOfRect: 3 x 4", method: "areaOfRect", args: [3, 4], expected: 12 },
    { name: "areaOfRect: 1 x 1", method: "areaOfRect", args: [1, 1], expected: 1 },
    { name: "areaOfRect: zero width", method: "areaOfRect", args: [0, 5], expected: 0 },
    { name: "areaOfRect: negative width", method: "areaOfRect", args: [-2, 3], expected: -6 },

    // ---------------- sqrDistanceBetweenPoint ----------------
    {
        name: "sqrDistanceBetweenPoint: 3-4-5 triangle",
        method: "sqrDistanceBetweenPoint",
        args: [[0, 0], [3, 4]],
        expected: 25,
    },
    {
        name: "sqrDistanceBetweenPoint: same point",
        method: "sqrDistanceBetweenPoint",
        args: [[7, 7], [7, 7]],
        expected: 0,
    },

    // ---------------- isOnLine ----------------
    {
        name: "isOnLine: middle of a horizontal segment",
        method: "isOnLine",
        args: [[3, 3], { p1: [1, 3], p2: [5, 3] }],
        expected: true,
    },
    {
        name: "isOnLine: exact endpoint counts as on the line",
        method: "isOnLine",
        args: [[5, 3], { p1: [1, 3], p2: [5, 3] }],
        expected: true,
    },
    {
        name: "isOnLine: collinear but past the endpoint -> false",
        method: "isOnLine",
        args: [[6, 3], { p1: [1, 3], p2: [5, 3] }],
        expected: false,
    },
    {
        name: "isOnLine: vertical segment",
        method: "isOnLine",
        args: [[3, 4], { p1: [3, 1], p2: [3, 5] }],
        expected: true,
    },
    {
        name: "isOnLine: diagonal segment (distance sum still works)",
        method: "isOnLine",
        args: [[2, 2], { p1: [0, 0], p2: [4, 4] }],
        expected: true,
    },
    {
        name: "isOnLine: off the segment",
        method: "isOnLine",
        args: [[3, 4], { p1: [1, 3], p2: [5, 3] }],
        expected: false,
    },
    {
        name: "isOnLine: zero length segment only matches itself",
        method: "isOnLine",
        args: [[2, 2], { p1: [2, 2], p2: [2, 2] }],
        expected: true,
    },

    // ---------------- isOnAnyLine ----------------
    {
        name: "isOnAnyLine: hit on the second line",
        method: "isOnAnyLine",
        args: [
            [3, 4],
            [
                { p1: [1, 3], p2: [5, 3] },
                { p1: [3, 1], p2: [3, 5] },
            ],
        ],
        expected: true,
    },
    {
        name: "isOnAnyLine: misses every line",
        method: "isOnAnyLine",
        args: [
            [9, 9],
            [
                { p1: [1, 3], p2: [5, 3] },
                { p1: [3, 1], p2: [3, 5] },
            ],
        ],
        expected: false,
    },
    {
        name: "isOnAnyLine: empty line list -> false",
        method: "isOnAnyLine",
        args: [[1, 1], []],
        expected: false,
    },
];
