// Is this point inside the shape described by this file?
// Every case feeds the whole file through main() and asks about one point:
//   { name, file, point, expected }
export default [
    // ---------------- sample1: irregular polygon ----------------
    { name: "sample1: point on the top edge", file: "sample1.txt", point: [9, 1], expected: true },
    { name: "sample1: left vertical edge", file: "sample1.txt", point: [2, 4], expected: true },
    { name: "sample1: inside the body", file: "sample1.txt", point: [10, 4], expected: true },
    { name: "sample1: outside to the left", file: "sample1.txt", point: [0, 0], expected: false },
    { name: "sample1: outside to the right", file: "sample1.txt", point: [12, 6], expected: false },
    { name: "sample1: below the shape", file: "sample1.txt", point: [5, 8], expected: false },

    // ---------------- sample2: three collinear top points ----------------
    { name: "sample2: on the long top edge", file: "sample2.txt", point: [19, 2], expected: true },
    { name: "sample2: middle of the top edge", file: "sample2.txt", point: [14, 2], expected: true },
    { name: "sample2: inside", file: "sample2.txt", point: [19, 6], expected: true },
    { name: "sample2: outside right", file: "sample2.txt", point: [30, 6], expected: false },
    { name: "sample2: outside above", file: "sample2.txt", point: [19, 0], expected: false },

    // ---------------- sample4: two squares joined at (4,4) ----------------
    { name: "sample4: inside the first square", file: "sample4.txt", point: [2, 2], expected: true },
    { name: "sample4: shared corner", file: "sample4.txt", point: [4, 4], expected: true },
    { name: "sample4: inside the second square", file: "sample4.txt", point: [6, 6], expected: true },
    { name: "sample4: outside left", file: "sample4.txt", point: [0, 2], expected: false },
    { name: "sample4: outside bottom-right", file: "sample4.txt", point: [0, 0], expected: false },

    // ---------------- sample5: smallest square (1,1)-(3,3) ----------------
    { name: "sample5: centre", file: "sample5.txt", point: [2, 2], expected: true },
    { name: "sample5: midpoint of the top edge", file: "sample5.txt", point: [2, 1], expected: true },
    { name: "sample5: corner (3,3)", file: "sample5.txt", point: [3, 3], expected: true },
    { name: "sample5: one step outside", file: "sample5.txt", point: [4, 4], expected: false },
    { name: "sample5: far outside", file: "sample5.txt", point: [10, 10], expected: false },

    // ---------------- sample6: many points, staggered ----------------
    { name: "sample6: on the top edge", file: "sample6.txt", point: [10, 1], expected: true },
    // (10,5) sits in the open middle of this shape: the current
    // implementation reports it as not enclosed - locked in on purpose.
    { name: "sample6: open middle (10,5)", file: "sample6.txt", point: [10, 5], expected: false },
    { name: "sample6: outside", file: "sample6.txt", point: [0, 0], expected: false },
    { name: "sample6: outside below", file: "sample6.txt", point: [10, 10], expected: false },

    // ---------------- sample7: the shape used by the main run ----------------
    { name: "sample7: corner (2,2)", file: "sample7.txt", point: [2, 2], expected: true },
    { name: "sample7: corner (12,10)", file: "sample7.txt", point: [12, 10], expected: true },
    { name: "sample7: top edge midpoint", file: "sample7.txt", point: [7, 2], expected: true },
    { name: "sample7: left edge midpoint", file: "sample7.txt", point: [2, 6], expected: true },
    { name: "sample7: outside above", file: "sample7.txt", point: [7, 0], expected: false },
    { name: "sample7: outside left", file: "sample7.txt", point: [0, 5], expected: false },
    { name: "sample7: outside bottom right", file: "sample7.txt", point: [13, 11], expected: false },

    // ---------------- sample8 ----------------
    { name: "sample8: inside", file: "sample8.txt", point: [4, 3], expected: true },
    { name: "sample8: on the notch edge", file: "sample8.txt", point: [5, 5], expected: true },
    { name: "sample8: outside", file: "sample8.txt", point: [0, 0], expected: false },

    // ---------------- sample9 ----------------
    { name: "sample9: inside", file: "sample9.txt", point: [4, 4], expected: true },
    { name: "sample9: on the vertical step", file: "sample9.txt", point: [6, 6], expected: true },
    { name: "sample9: outside", file: "sample9.txt", point: [11, 9], expected: false },

    // ---------------- tests/inputs/cross.txt: two crossing segments ----------------
    { name: "cross: the crossing point sits on two lines", file: "tests/inputs/cross.txt", point: [3, 3], expected: true },
    { name: "cross: endpoint of the horizontal segment", file: "tests/inputs/cross.txt", point: [1, 3], expected: true },
    { name: "cross: midpoint of the vertical segment", file: "tests/inputs/cross.txt", point: [3, 4], expected: true },
    { name: "cross: empty space between the arms", file: "tests/inputs/cross.txt", point: [4, 4], expected: false },
    { name: "cross: far outside", file: "tests/inputs/cross.txt", point: [9, 9], expected: false },

    // ---------------- tests/inputs/segment.txt: single vertical segment ----
    { name: "segment: point on the segment", file: "tests/inputs/segment.txt", point: [1, 3], expected: true },
    { name: "segment: both endpoints", file: "tests/inputs/segment.txt", point: [1, 5], expected: true },
    { name: "segment: past the end of the segment", file: "tests/inputs/segment.txt", point: [1, 6], expected: false },
    { name: "segment: beside the segment", file: "tests/inputs/segment.txt", point: [2, 3], expected: false },

    // ---------------- tests/inputs/collinear.txt: collinear points on a line --
    { name: "collinear: between two points on the line", file: "tests/inputs/collinear.txt", point: [4, 1], expected: true },
    { name: "collinear: exactly on a given point", file: "tests/inputs/collinear.txt", point: [5, 1], expected: true },
    { name: "collinear: past both ends", file: "tests/inputs/collinear.txt", point: [9, 1], expected: false },
    { name: "collinear: one row above the line", file: "tests/inputs/collinear.txt", point: [4, 2], expected: false },

    // ---------------- tests/inputs/unit-square.txt: 1x1 square ------------
    { name: "unit-square: corner (0,0)", file: "tests/inputs/unit-square.txt", point: [0, 0], expected: true },
    { name: "unit-square: corner (1,1)", file: "tests/inputs/unit-square.txt", point: [1, 1], expected: true },
    { name: "unit-square: midpoint of an edge", file: "tests/inputs/unit-square.txt", point: [0, 1], expected: true },
    { name: "unit-square: outside", file: "tests/inputs/unit-square.txt", point: [5, 5], expected: false },
    { name: "unit-square: outside negative", file: "tests/inputs/unit-square.txt", point: [-1, -1], expected: false },

    // ---------------- tests/inputs/u-shape.txt: bay open at the top --------
    { name: "u-shape: left arm", file: "tests/inputs/u-shape.txt", point: [1, 1], expected: true },
    { name: "u-shape: right arm", file: "tests/inputs/u-shape.txt", point: [5, 1], expected: true },
    { name: "u-shape: base under the bay", file: "tests/inputs/u-shape.txt", point: [3, 5], expected: true },
    { name: "u-shape: on the perimeter", file: "tests/inputs/u-shape.txt", point: [2, 2], expected: true },

    // ---------------- tests/inputs/u-slot.txt: slot open at the bottom ------
    { name: "u-slot: left arm", file: "tests/inputs/u-slot.txt", point: [1, 2], expected: true },
    { name: "u-slot: right arm", file: "tests/inputs/u-slot.txt", point: [5, 2], expected: true },
    { name: "u-slot: above the slot", file: "tests/inputs/u-slot.txt", point: [1, 4], expected: true },
    { name: "u-slot: on the slot ceiling", file: "tests/inputs/u-slot.txt", point: [3, 2], expected: true },

    // ---------------- tests/inputs/collinear-*.txt: extra point on an edge --
    { name: "collinear-top: centre", file: "tests/inputs/collinear-top.txt", point: [3, 2], expected: true },
    { name: "collinear-top: off the left edge", file: "tests/inputs/collinear-top.txt", point: [0, 2], expected: false },
    { name: "collinear-left: centre", file: "tests/inputs/collinear-left.txt", point: [3, 2], expected: true },
    { name: "collinear-left: next to the split edge", file: "tests/inputs/collinear-left.txt", point: [2, 2], expected: true },
    { name: "collinear-left: further along the row", file: "tests/inputs/collinear-left.txt", point: [4, 2], expected: true },
    { name: "collinear-left: off the right edge", file: "tests/inputs/collinear-left.txt", point: [6, 2], expected: false },
];
