// getMaxArea: rectangle area for every unique pair of points.
// Each case: { name, method, args: [...], expected }
// `post` (optional) lets a case assert on part of the returned object.
export default [
    {
        name: "getMaxArea: empty point list",
        method: "getMaxArea",
        args: [[]],
        expected: { largest: 0, largestAreaPoint: 0, areaAndPoints: [] },
    },
    {
        name: "getMaxArea: single point -> no pairs",
        method: "getMaxArea",
        args: [[[1, 1]]],
        expected: { largest: 0, largestAreaPoint: 0, areaAndPoints: [] },
    },
    {
        name: "getMaxArea: two points (3 x 4 = 12)",
        method: "getMaxArea",
        args: [[[0, 0], [2, 3]]],
        expected: {
            largest: 12,
            largestAreaPoint: [[0, 0], [2, 3]],
            areaAndPoints: [{ p1: [0, 0], p2: [2, 3], area: 12 }],
        },
    },
    {
        name: "getMaxArea: duplicate points -> 1 x 1 = 1",
        method: "getMaxArea",
        args: [[[1, 1], [1, 1]]],
        expected: {
            largest: 1,
            largestAreaPoint: [[1, 1], [1, 1]],
            areaAndPoints: [{ p1: [1, 1], p2: [1, 1], area: 1 }],
        },
    },
    {
        name: "getMaxArea: three points -> 3 pairs, largest wins",
        method: "getMaxArea",
        args: [[[0, 0], [0, 2], [3, 0]]],
        expected: {
            largest: 12,
            largestAreaPoint: [[0, 2], [3, 0]],
            areaAndPoints: [
                { p1: [0, 0], p2: [0, 2], area: 3 },
                { p1: [0, 0], p2: [3, 0], area: 4 },
                { p1: [0, 2], p2: [3, 0], area: 12 },
            ],
        },
    },
    {
        name: "getMaxArea: tie keeps the earlier pair (strict >)",
        method: "getMaxArea",
        args: [[[0, 0], [2, 0], [0, 2]]],
        expected: {
            largest: 9,
            largestAreaPoint: [[2, 0], [0, 2]],
            areaAndPoints: [
                { p1: [0, 0], p2: [2, 0], area: 3 },
                { p1: [0, 0], p2: [0, 2], area: 3 },
                { p1: [2, 0], p2: [0, 2], area: 9 },
            ],
        },
    },
    {
        name: "getMaxArea: pair count is n*(n-1)/2",
        method: "getMaxArea",
        args: [[[0, 0], [0, 2], [3, 0], [3, 2]]],
        expected: 6,
        post: (args, result) => result.areaAndPoints.length,
    },
];
