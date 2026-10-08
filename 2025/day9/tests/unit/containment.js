// Point-in-shape primitives: check, isPointIn, isInShape,
// validateBorderPoints and getLargestRectangleBox.
//
// Case shapes supported by the runner:
//   { name, method, args: [...], expected }              -> METHODS[method](...args)
//   { name, file, point, expected, method? }             -> method defaults to isPointIn
//   { name, file, p1, p2, method: "validateBorderPoints", expected }
//   { name, file, method, build: (ctx) => [...args], expected }
// ctx = { file, positions, lines, linePairsString, pointMap, shapes }
export default [
    // ---------------- check: convex square, winding 1 ----------------
    {
        name: "check: inside a square",
        method: "check",
        args: [[2, 2], ["1,1", "1,3", "3,3", "3,1"]],
        expected: true,
    },
    {
        name: "check: outside (bottom-left of the square)",
        method: "check",
        args: [[0, 0], ["1,1", "1,3", "3,3", "3,1"]],
        expected: false,
    },
    {
        name: "check: outside (top-right of the square)",
        method: "check",
        args: [[4, 4], ["1,1", "1,3", "3,3", "3,1"]],
        expected: false,
    },
    {
        name: "check: on the left edge -> false (isOnAnyLine handles borders)",
        method: "check",
        args: [[1, 2], ["1,1", "1,3", "3,3", "3,1"]],
        expected: false,
    },
    {
        name: "check: on a corner -> false (isOnAnyLine handles corners)",
        method: "check",
        args: [[1, 1], ["1,1", "1,3", "3,3", "3,1"]],
        expected: false,
    },

    // ---------------- check: opposite winding ----------------
    {
        name: "check: inside the same square with reversed winding",
        method: "check",
        args: [[2, 2], ["1,1", "3,1", "3,3", "1,3"]],
        expected: true,
    },
    {
        name: "check: outside with reversed winding",
        method: "check",
        args: [[0, 0], ["1,1", "3,1", "3,3", "1,3"]],
        expected: false,
    },

    // ---------------- check: degenerate shapes ----------------
    {
        name: "check: single point shape on the point itself -> false",
        method: "check",
        args: [[5, 5], ["5,5"]],
        expected: false,
    },
    {
        name: "check: single point shape, point above -> false",
        method: "check",
        args: [[5, 6], ["5,5"]],
        expected: false,
    },
    {
        name: "check: single point shape, point diagonally away -> false",
        method: "check",
        args: [[6, 6], ["5,5"]],
        expected: false,
    },
    {
        name: "check: two point (line) shape, point on it -> false",
        method: "check",
        args: [[1, 3], ["1,1", "1,5"]],
        expected: false,
    },
    {
        name: "check: two point (line) shape, point past the end -> false",
        method: "check",
        args: [[1, 6], ["1,1", "1,5"]],
        expected: false,
    },

    // ---------------- isPointIn / isInShape on files ----------------
    {
        name: "sample5: centre of the 2x2 square is inside",
        file: "sample5.txt",
        point: [2, 2],
        expected: true,
    },
    {
        name: "sample5: corner is on a line -> inside",
        file: "sample5.txt",
        point: [1, 1],
        expected: true,
    },
    {
        name: "sample5: point outside the square",
        file: "sample5.txt",
        point: [0, 0],
        expected: false,
    },
    {
        name: "sample7: far outside point",
        file: "sample7.txt",
        point: [13, 13],
        expected: false,
    },
    {
        name: "sample7: corner (2,2) is on a line",
        file: "sample7.txt",
        point: [2, 2],
        expected: true,
    },
    {
        name: "sample7: isInShape (old sign-sum heuristic) outside point",
        file: "sample7.txt",
        point: [13, 13],
        method: "isInShape",
        expected: false,
    },
    {
        name: "sample7: isInShape treats a border point as inside",
        file: "sample7.txt",
        point: [2, 2],
        method: "isInShape",
        expected: true,
    },

    // ---------------- validateBorderPoints ----------------
    {
        name: "unit-square: whole border of the square is inside",
        file: "tests/inputs/unit-square.txt",
        method: "validateBorderPoints",
        p1: [0, 0],
        p2: [1, 1],
        expected: true,
    },
    {
        name: "unit-square: degenerate rectangle (same point) -> false",
        file: "tests/inputs/unit-square.txt",
        method: "validateBorderPoints",
        p1: [0, 0],
        p2: [0, 0],
        expected: false,
    },
    {
        name: "unit-square: horizontal only rectangle -> false",
        file: "tests/inputs/unit-square.txt",
        method: "validateBorderPoints",
        p1: [0, 0],
        p2: [1, 0],
        expected: false,
    },
    {
        name: "sample7: border of the notch rectangle (6,5)-(8,10)",
        file: "sample7.txt",
        method: "validateBorderPoints",
        p1: [6, 5],
        p2: [8, 10],
        expected: true,
    },
    {
        name: "sample7: rectangle sticking out of the shape -> false",
        file: "sample7.txt",
        method: "validateBorderPoints",
        p1: [0, 0],
        p2: [5, 5],
        expected: false,
    },

];
