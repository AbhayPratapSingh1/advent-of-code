// Messy but legal inputs - the answers must not depend on how the text
// is laid out or whether a tile is repeated.
//   { name, input, expected: { largest: N } }
//   { name, input, point, expected: true | false }
export default [
    // ---------------- trailing newline ----------------
    {
        name: "no trailing newline: same rectangle",
        input: "1,1\n7,1",
        expected: { largest: 7 },
    },
    {
        name: "trailing newline: square still contains [2,2]",
        input: "0,0\n4,0\n4,4\n0,4\n",
        point: [2, 2],
        expected: true,
    },
    {
        name: "no trailing newline: square still contains [2,2]",
        input: "0,0\n4,0\n4,4\n0,4",
        point: [2, 2],
        expected: true,
    },

    // ---------------- blank line in the middle ----------------
    {
        name: "blank line: square still contains [2,2]",
        input: "0,0\n4,0\n\n4,4\n0,4",
        point: [2, 2],
        expected: true,
    },

    // ---------------- repeated tiles ----------------
    {
        name: "repeated tile: same rectangle",
        input: "0,0\n0,0\n4,4\n0,4",
        expected: { largest: 25 },
    },
    {
        name: "only one tile listed twice: it is on its own line",
        input: "3,3\n3,3",
        point: [3, 3],
        expected: true,
    },
    {
        name: "repeated tile: square still contains [2,2]",
        input: "0,0\n0,0\n4,0\n4,4\n0,4",
        point: [2, 2],
        expected: true,
    },

    // ---------------- awkward coordinates ----------------
    {
        name: "negative coordinates: measured the same way",
        input: "-2,-3\n5,-3",
        expected: { largest: 8 },
    },
    {
        name: "negative coordinates: contains the origin",
        input: "-4,-4\n4,-4\n4,4\n-4,4",
        point: [0, 0],
        expected: true,
    },
    {
        name: "zero sized rectangle: two copies of one tile",
        input: "5,5\n5,5",
        expected: { largest: 1 },
    },
];
