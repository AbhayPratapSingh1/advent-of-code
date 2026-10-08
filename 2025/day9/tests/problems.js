// Correct answers the program does not produce yet.
// Every case is one input pushed through main(), so they are expected to
// fail until the underlying logic is fixed.
//
// The perimeter of a shape is the input points joined in file order and
// closed back to the first point - only consecutive points are connected.
// A tile on the perimeter counts as inside; an opening in the perimeter
// (a bay or a notch) is outside.
export default [
    // ---------------- sample7: the notch x=6..8 / y=5..10 is open ----------
    { name: "sample7: notch [7,6]", file: "sample7.txt", point: [7, 6], expected: false },
    { name: "sample7: notch [7,7]", file: "sample7.txt", point: [7, 7], expected: false },
    { name: "sample7: notch [7,8]", file: "sample7.txt", point: [7, 8], expected: false },
    { name: "sample7: notch [7,9]", file: "sample7.txt", point: [7, 9], expected: false },
    { name: "sample7: notch mouth [7,10]", file: "sample7.txt", point: [7, 10], expected: false },

    // ---------------- u-shape: the bay x=2..4 / y=0..4 is open at the top ---
    { name: "u-shape: bay [3,1]", file: "tests/inputs/u-shape.txt", point: [3, 1], expected: false },
    { name: "u-shape: bay [3,2]", file: "tests/inputs/u-shape.txt", point: [3, 2], expected: false },
    { name: "u-shape: bay [3,3]", file: "tests/inputs/u-shape.txt", point: [3, 3], expected: false },
    { name: "u-shape: bay mouth [3,0]", file: "tests/inputs/u-shape.txt", point: [3, 0], expected: false },

    // ---------------- u-slot: the slot x=2..4 / y=2..6 is open at the bottom -
    { name: "u-slot: inside the slot [3,4]", file: "tests/inputs/u-slot.txt", point: [3, 4], expected: false },
    { name: "u-slot: slot mouth [3,6]", file: "tests/inputs/u-slot.txt", point: [3, 6], expected: false },

    // ---------------- an empty line turns the rest of the file into junk ----
    {
        name: "blank line: the rectangle is still 25",
        input: "0,0\n4,0\n\n4,4\n0,4",
        expected: { largest: 25 },
    },

    // ---------------- a file that ends with a newline ----------------------
    {
        name: "trailing newline: the rectangle is still 7",
        input: "1,1\n7,1\n",
        expected: { largest: 7 },
    },

    // ---------------- part 2: the rectangle fully inside the shape ---------
    {
        name: "unit-square: the only rectangle it can span",
        file: "tests/inputs/unit-square.txt",
        box: true,
        expected: {
            box: { p1: [0, 0], p2: [1, 1], area: 4 },
        },
    },
];
