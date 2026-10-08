// Part 1: the largest rectangle spanned by two red tiles of the input.
// area = (|dx| + 1) * (|dy| + 1)
//   { name, file, expected: { largest: N } }
export default [
    { name: "sample1: largest rectangle", file: "sample1.txt", expected: { largest: 50 } },
    { name: "sample2: largest rectangle", file: "sample2.txt", expected: { largest: 231 } },
    { name: "sample3: largest rectangle", file: "sample3.txt", expected: { largest: 231 } },
    { name: "sample4: largest rectangle", file: "sample4.txt", expected: { largest: 64 } },
    { name: "sample5: largest rectangle", file: "sample5.txt", expected: { largest: 9 } },
    { name: "sample6: largest rectangle", file: "sample6.txt", expected: { largest: 144 } },
    { name: "sample7: largest rectangle", file: "sample7.txt", expected: { largest: 99 } },
    { name: "sample8: largest rectangle", file: "sample8.txt", expected: { largest: 42 } },
    { name: "sample9: largest rectangle", file: "sample9.txt", expected: { largest: 63 } },

    { name: "unit-square: largest rectangle", file: "tests/inputs/unit-square.txt", expected: { largest: 4 } },
    { name: "cross: largest rectangle", file: "tests/inputs/cross.txt", expected: { largest: 9 } },
    { name: "segment: largest rectangle", file: "tests/inputs/segment.txt", expected: { largest: 5 } },
    { name: "collinear: largest rectangle", file: "tests/inputs/collinear.txt", expected: { largest: 7 } },
    { name: "u-shape: largest rectangle", file: "tests/inputs/u-shape.txt", expected: { largest: 49 } },
    { name: "u-slot: largest rectangle", file: "tests/inputs/u-slot.txt", expected: { largest: 49 } },
    { name: "collinear-top: largest rectangle", file: "tests/inputs/collinear-top.txt", expected: { largest: 15 } },
    { name: "collinear-left: largest rectangle", file: "tests/inputs/collinear-left.txt", expected: { largest: 15 } },
];
