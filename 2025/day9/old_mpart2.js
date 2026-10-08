const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "SAMPLE_2": "sample2.txt",
    "SAMPLE_4": "sample4.txt",
    "SAMPLE_5": "sample5.txt",
    "SAMPLE_6": "sample6.txt",
    "SAMPLE_7": "sample7.txt",
    "INPUT": "input.txt",
};

const CACHE = {};

// the point cache is keyed by point only, so every run starts clean
const clearPointCache = () => {
    for (const key in CACHE) delete CACHE[key];
};

const parseData = (rawData) => {
    return rawData.split("\n").map((row) =>
        row.split(",").map((each) => Number(each))
    );
};

const getPointMap = (positions) => {
    const pointSet = {};
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const p1 = positions[i];
            const p2 = positions[j];

            if (p1[0] === p2[0] || p1[1] === p2[1]) {
                if (!pointSet[p1.toString()]) pointSet[p1.toString()] = [];
                if (!pointSet[p2.toString()]) pointSet[p2.toString()] = [];

                pointSet[p1].push(p2.toString());
                pointSet[p2].push(p1.toString());
            }
        }
    }
    return pointSet;
};

const sqrDistanceBetweenPoint = (p1, p2) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return sqr(x2 - x1) + sqr(y2 - y1);
};
const sqrt = (x) => (x ** (1 / 2));

const isOnLine = (point, line) => {
    const p1 = line.p1;
    const p2 = line.p2;

    return (Math.abs(
        sqrt(sqrDistanceBetweenPoint(point, p1)) +
            sqrt(sqrDistanceBetweenPoint(point, p2)) -
            sqrt(sqrDistanceBetweenPoint(p1, p2)),
    )) < 0.0001;
};

const isOnAnyLine = (point, lines) => {
    return lines.some((line) => isOnLine(point, line));
};

const troversUntilFound = (map, key, found = [], p = null) => {
    const shapes = [[]];
    for (const value of map[key]) {
        const v = found.find((v) => v === value);
        if (!v) {
            const newShapes = troversUntilFound(map, value, [...found, value]);
            const addedShapes = newShapes.map((e) => [...e]);
            shapes.push(...addedShapes);
        } else {
            shapes.push([v]);
        }
    }
    return shapes.map((e) => [key, ...e]);
};

const getClosedShapes = (map) => {
    const shapes = [];
    for (const key in map) {
        const shape = troversUntilFound(map, key, [key]);
        shapes.push(shape);
        break;
    }

    return shapes[0];
};

const getPointsPair = (positions) => {
    const lines = [];

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const p1 = [positions[i][0], positions[i][1]];
            const p2 = [positions[j][0], positions[j][1]];

            if (p1[0] === p2[0] || p1[1] === p2[1]) {
                lines.push({ p1, p2 });
            }
        }
    }

    return lines;
};
const sqr = (x) => Math.pow(x, 2);

const isInShape = (point, shapes, lines) => {
    if (isOnAnyLine(point, lines)) {
        return true;
    }
    for (const shape of shapes) {
        let tdx = 0;
        let tdy = 0;
        for (const p of shape) {
            const [x, y] = p.split(",").map((e) => Number(e));
            const dx = Math.sign(x - point[0]);
            const dy = Math.sign(y - point[1]);
            tdx += dx;
            tdy += dy;
        }
        if (tdx === 0 && tdy === 0) {
            return true;
        }
    }
    return false;
};

const getMaxIndexValue = (data, index) => {
    return data.reduce((a, b) => b[index] > a ? b[index] : a, 0);
};

const matrix = (points, maxX, maxY) => {
    let matrix = [];
    for (let i = 0; i <= maxY; i++) {
        const mt = [];
        for (let j = 0; j <= maxX; j++) {
            mt.push(".");
        }
        matrix.push(mt);
    }

    for (const [x, y] of points) {
        matrix[y][x] = "#";
    }
    return matrix;
};

const fill = (map, points, icon = "X") => {
    for (const [x, y] of points) {
        map[y][x] = icon;
    }
};

const draw = (map) => {
    console.log(map.map((e) => e.join("")).join("\n"));
};

const isAllHave2 = (map) => {
    for (const key in map) {
        if (map[key].length !== 2) {
            return false;
        }
    }
    return true;
};

const tr = (covered, map, parent) => {
    const key = covered.at(-1);
    const newCovered = [];
    for (const nextKey of map[key]) {
        if (!(covered.includes(nextKey))) {
            const newDirection = tr([...covered, nextKey], map, key);
            newCovered.push(...newDirection);
        }
    }

    let shapesToReturn = newCovered;
    const lastPointCovered = map[key].includes(covered[0]) ? covered[0] : null;

    if (newCovered.length === 0) {
        if (lastPointCovered === null) {
            const endPoints = map[key].filter((e) => e !== parent);
            shapesToReturn = endPoints.map((p) => {
                const startIndex = covered.findIndex((point) => point === p);
                return covered.slice(startIndex);
            });
        }
    }
    return shapesToReturn.length === 0 ? [covered] : shapesToReturn;
};

const getShapes = (linePoints, pointMap) => {
    const p1 = linePoints[0][0];
    return tr([p1], pointMap);
};

const check = (point, shape) => {
    let dx = 0;
    let dnx = 0;
    let dy = 0;
    let dny = 0;
    const newShape = [...shape, shape[0]];
    for (let i = 0; i < newShape.length - 1; i++) {
        const p1 = newShape[i].split(",").map((e) => Number(e));
        const p2 = newShape[i + 1].split(",").map((e) => Number(e));

        if (
            (p1[0] === p2[0] && point[0] === p2[0]) || (p1[1] === p2[1] &&
                point[1] === p2[1])
        ) { // if it in the same axis line count it as 1
            if (p1[0] === p2[0] && point[0] === p2[0]) {
                if (p1[1] < point[1]) {
                    dny += 1;
                } else {
                    dy += 1;
                }
            } else {
                if (p1[0] < point[0]) {
                    dnx += 1;
                } else {
                    dx += 1;
                }
            }

            continue;
        }

        if (
            // line is out of x,y range (non intersecting).
            ((p1[0] < point[0] && p2[0] < point[0]) ||
                (p1[0] > point[0] && p2[0] > point[0])) &&
            ((p1[1] < point[1] && p2[1] < point[1]) ||
                (p1[1] > point[1] && p2[1] > point[1]))
        ) {
            continue;
        }

        if (
            // x is out
            ((p1[0] < point[0] && p2[0] < point[0]) ||
                (p1[0] > point[0] && p2[0] > point[0]))
        ) {
            if (p1[0] < point[0]) {
                dnx += 1;
            } else {
                dx += 1;
            }
        } else if (
            // y is out
            ((p1[1] < point[1] && p2[1] < point[1]) ||
                (p1[1] > point[1] && p2[1] > point[1]))
        ) {
            if (p1[1] < point[1]) {
                dny += 1;
            } else {
                dy += 1;
            }
        } else { // both are out
            const x1 = p1[0] - point[0];
            const x2 = p2[0] - point[0];
            const y1 = p1[1] - point[1];
            const y2 = p2[1] - point[1];

            const xIntercept = (x1 * y2 - x2 * y1) / (y2 - y1);

            // y-axis intersection: x = 0
            const yIntercept = (x1 * y2 - x2 * y1) / (x1 - x2);

            if (xIntercept < 0) {
                dnx += 1;
            } else {
                dx += 1;
            }
            if (yIntercept < 0) {
                dny += 1;
            } else {
                dy += 1;
            }
        }
    }

    return dnx % 2 !== 0 && dx % 2 !== 0 && dny % 2 !== 0 && dy % 2 !== 0;
};

const isPointIn = (point, shapes, lines) => {
    if (!(CACHE[point.toString()])) {
        CACHE[point.toString()] = _isPointIn(point, shapes, lines);
    }
    return CACHE[point.toString()];
};

const _isPointIn = (point, shapes, lines) => {
    if (isOnAnyLine(point, lines)) {
        return true;
    }

    for (const shape of shapes) {
        if (check(point, shape)) {
            return true;
        }
    }
    return false;
};

const validateBorderPoints = (p1, p2, shapes, lines) => {
    const minX = p1[0] > p2[0] ? p2[0] : p1[0];
    const maxX = p1[0] > p2[0] ? p1[0] : p2[0];
    const minY = p1[1] > p2[1] ? p2[1] : p1[1];
    const maxY = p1[1] > p2[1] ? p1[1] : p2[1];

    if (maxY === minY || minX === maxX) {
        return false;
    }

    for (let x = minX; x <= maxX; x += maxX - minX) {
        for (let y = minY; y <= maxY; y++) {
            if (!isPointIn([x, y], shapes, lines)) {
                return false;
            }
        }
    }
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y += maxY - minY) {
            if (!isPointIn([x, y], shapes, lines)) {
                return false;
            }
        }
    }

    return true;
};

const getLargestRectangleBox = (
    distSortedPairs,
    shapes,
    lines,
) => {
    for (const pointSet of distSortedPairs) {
        const { p1, p2, area } = pointSet;

        const p3 = [p1[0], p2[1]];
        const p4 = [p2[0], p1[1]];

        if (
            isPointIn(p3, shapes, lines) && isPointIn(p4, shapes, lines)
        ) {
            const isValidBorderPoints = validateBorderPoints(
                p1,
                p2,
                shapes,
                lines,
            );
            if (isValidBorderPoints) {
                // return { p1, p2, area };
            }
        }
    }
};

const getMaxArea = (points) => {
    let largest = 0;
    let largestAreaPoint = 0;
    const areaAndPoints = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i];
            const p2 = points[j];
            const [dx, dy] = getDistance(p1, p2);
            const area = areaOfRect(dx, dy);
            areaAndPoints.push({ p1, p2, area });
            largest = largest > area ? largest : area;
            largestAreaPoint = largest > area ? largestAreaPoint : [p1, p2];
        }
    }
    return { largest, largestAreaPoint, areaAndPoints };
};

const getDistance = (p1, p2) => {
    const dx = delta(p1[0], p2[0]) + 1;
    const dy = delta(p1[1], p2[1]) + 1;
    return [dx, dy];
};

const delta = (a, b) => Math.abs(a - b);

const areaOfRect = (width, height) => {
    return width * height;
};

//////////////////////////////////////////////////////////////////////////
//  main - run the whole program for one input
//
//  input   the raw puzzle text (points, one "x,y" per line)
//  points  the points to ask about ("is this point inside the shape?")
//  box     also search for the largest rectangle fully inside the shape
//          (part 2 - it walks every candidate rectangle, so leave it off
//          for big inputs)
//
//  returns everything that was worked out for that input:
//    { positions, maxX, maxY, lines, shapes, largest, largestAreaPoint,
//      areaAndPoints, box, points, inside }
//////////////////////////////////////////////////////////////////////////

const getContinuousLinePairs = (points) => {
    const pairs = [];
    for (let i = 0; i < points.length - 1; i++) {
        pairs.push([points[i], points[i + 1]]);
    }
    pairs.push([points.at(-1), points[0]]);
};

export const main = (input, points = [], { box = false } = {}) => {
    clearPointCache();

    const positions = parseData(input);

    const maxX = getMaxIndexValue(positions, 0);
    const maxY = getMaxIndexValue(positions, 1);

    
    const linePairs = getPointsPair(positions);
    const linePairsString = linePairs.map((
        e,
    ) => [e.p1.toString(), e.p2.toString()]);

    const pointMap = getPointMap(positions);

    const closedShapes = getShapes(linePairsString, pointMap);

    const { largest, largestAreaPoint, areaAndPoints } = getMaxArea(positions);
    const sortedAreaAndPoints = areaAndPoints.toSorted((a, b) =>
        b.area - a.area
    );

    const largestBox = box
        ? getLargestRectangleBox(sortedAreaAndPoints, closedShapes, linePairs)
        : undefined;

    const inside = points.map((point) =>
        isPointIn(point, closedShapes, linePairs)
    );

    return {
        positions,
        maxX,
        maxY,
        lines: linePairs,
        shapes: closedShapes,
        largest,
        largestAreaPoint,
        areaAndPoints,
        box: largestBox,
        points,
        inside,
    };
};

// run when this file is the entry point: deno run --allow-read mpart2.js
if (import.meta.main) {
    const file = SAMPLE.SAMPLE_7;
    const point = [7, 7];

    const run = main(Deno.readTextFileSync(file), [point]);

    console.log(
        `mpart2 · ${file} · point [${point}] · inside: ${run.inside[0]}`,
    );
}

// 2842212120
// 90961835
