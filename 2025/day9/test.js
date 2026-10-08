//////////////////////////////////////////////////////////////////////////
//  TESTS - end to end cases, run by deno's own bdd runner (describe/it)
//
//  run:  deno test --allow-read                    -> every case, grouped
//                                                    by suite
//        deno test --allow-read --filter problems  -> one suite only
//        deno test --allow-read --filter inside --filter edge  -> some suites
//
//  failing cases are listed by name at the end, with the expected and the
//  actual value; the name is also what you grep for in tests/*.js.
//
//  the program itself:  deno run --allow-read mpart2.js
//
//  A case is one input pushed through main():
//
//    { name, file, point: [x, y], expected: true | false }
//        -> is that point inside the shape built from the file?
//    { name, file, expected: { largest: 50 } }
//    { name, input: "1,1\n2,2", expected: { largest: 4 } }
//        -> compare the named fields of what main() worked out
//    { name, file, box: true, expected: { box: { ... } } }
//        -> same, plus the part 2 rectangle search (slow: leave it off
//           for big inputs)
//
//  `file` is read as is, `input` is used as the raw text instead.
//  Every case gets a fresh run of main(), so nothing leaks between cases.
//////////////////////////////////////////////////////////////////////////
import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { main } from "./mpart2.js";

import insideTests from "./tests/inside.js";
import part1Tests from "./tests/part1.js";
import edgeCaseTests from "./tests/edge-cases.js";
import problemTests from "./tests/problems.js";

const SUITES = [
    ["inside", insideTests],
    ["part1", part1Tests],
    ["edge-cases", edgeCaseTests],
    ["problems", problemTests],
];

// ---- feed one case through main() ----
const execute = (testCase) => {
    if (testCase.file === undefined && testCase.input === undefined) {
        throw new Error("a case needs `file` or `input`");
    }

    let input;
    if (testCase.input !== undefined) {
        input = testCase.input;
    } else {
        try {
            input = Deno.readTextFileSync(testCase.file);
        } catch {
            throw new Error(`input file not found: ${testCase.file}`);
        }
    }

    const points = testCase.point === undefined ? [] : [testCase.point];
    const run = main(input, points, { box: testCase.box === true });

    if (testCase.point !== undefined) return run.inside[0];

    if (typeof testCase.expected !== "object" || testCase.expected === null) {
        throw new Error(
            "a case without `point` needs an object `expected`, e.g. { largest: 50 }",
        );
    }

    return Object.fromEntries(
        Object.keys(testCase.expected).map((key) => [key, run[key]]),
    );
};

for (const [suiteName, testCases] of SUITES) {
    describe(suiteName, () => {
        for (const testCase of testCases) {
            it(testCase.name, () => {
                assertEquals(execute(testCase), testCase.expected);
            });
        }
    });
}
