// LET ME LOG THE LOGIC WHICH JUST COMES IN MY MIND,
// SINCE I AM GOING TO DO SOME WORK.
// DRAW THE BORDERS OF THE RECTANGLE -> TAKE ONE POINT AND MOVE IN ALL DIRECTION UNTIL IT FIND SOMETHING IF IT FIND ANY OTHER RECT THEN DRAW THAT LINE OTHERWISE LEAVE IT.
// FILL INSIDE IT USING THE SAME LOGIC TAKE ONE SIDE GO ON EACH AND DO FOR THE SAME AND FILL IT.
// DOING LAST TWO GIVE RED AND GREEN TYPE MAP
// AFTER THIS TAKE RED POINTS AND THEN GET AREA SORT IT WITH POINTS AND THEN DO FOLLOWING
// TAKE MAX RECTANGLE POINTS, FIND THE OTHER POINT, IF THEY ARE OF COLOR GREEN THEN GO ENTIRE SIDES AND IF BOTH SATISFY THEN WE CAN DECLARE THAT ONE AS THE LARGEST ONE.
// WHY FIRST POINT AND THEN SIDES? -> SO THAT IT WILL TAKE LESS ITERATIONS.

// UPDATE IN THE APPROACH -> USE THE LINE IN PLACE OF MAP; EFFICIENT AND MEMORY PROBLEM

// UPDATE IN THE APPROACH -> CHECK IF IN THE LINE THEN USE IT OTHER WISE CHECK ALL LINES ON BOTH AXIS CALCUATE THE TOTAL CHANGE ANGEL OF EACH POINT

// So lets do a think using the recursion lets find all the closed shapes with direction, and then store it somewhere.
// while checking we will check all border points of the rectangle in those closed shapes.
const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "SAMPLE_2": "sample2.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.SAMPLE_1);

const parseData = (rawData) => {
    return rawData.split("\n").map((row) =>
        row.split(",").map((each) => Number(each))
    );
};

const areaOfRect = (width, height) => {
    return width * height;
};

const delta = (a, b) => Math.abs(a - b);

const getDistance = (p1, p2) => {
    const dx = delta(p1[0], p2[0]) + 1;
    const dy = delta(p1[1], p2[1]) + 1;
    return [dx, dy];
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

const getMaxIndexValue = (data, index) => {
    return data.reduce((a, b) => b[index] > a ? b[index] : a, 0);
};

const maxX = getMaxIndexValue(positions, 0);
const maxY = getMaxIndexValue(positions, 1);
const inRange = (v, min, max) => v < max && v >= min;

const positions = parseData(rawData);


const getHitPoint = (
    pos,
    positions,
    dx,
    dy,
) => {
    let [x, y] = pos;
    x += dx;
    y += dy;
    while (positions.some(([x2, y2]) => x === x2 && y === y2)) {
        x += dx;
        y += dy;
    }

    return [x, y];
};

const iterateBoundaryUntilHit = (
    pos,
    positions,
    dx,
    dy,
) => {
    let [x, y] = pos;
    x += dx;
    y += dy;
    while (inRange(x, 0, maxX) && inRange(y, 0, maxY)) {
        if (positions.some(([x2, y2]) => x === x2 && y === y2)) {
            return true;
        }
        x += dx;
        y += dy;
    }
    return false;
};

const getClosedShape = (lines) => {
    const points = getPointsBetweenLinePairs(lines);
    const initialPoint = points[0];
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

    // return getClosedShape(lines);
    return lines;
};

const get = (map, [x, y]) => {
    return map[y][x];
};

const draw = (map) => {
    console.log(map.map((e) => e.join("")).join("\n"));
};

const sqr = (x) => Math.pow(x, 2);
const sqrDistanceBetweenPoint = (p1, p2) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return sqr(x2 - x1) + sqr(y2 - y1);
};

const isOnLine = (point, line) => {
    const p1 = line.p1;
    const p2 = line.p2;
    return (sqrDistanceBetweenPoint(point, p1) +
            sqrDistanceBetweenPoint(point, p2) ===
        sqrDistanceBetweenPoint(p1, p2));
};

const isOnAnyLine = (point, lines) => {
    return lines.some((line) => isOnLine(point, line));
};

const recursiveSearch = (point, shapes) => {
    return false;
};

const isInsideAnyClosedShape = (point, points) => {
};

const isEnclosedInAnyAxis = (point, lines, shapes) => {
    if (isOnAnyLine(point, lines)) {
        return true;
    }

    const rotationDelta = 0;
    return isInsideAnyClosedShape(point, shapes);
    const linesOnX = lines.filter((line) =>
        line.p1[0] === point[0] || line.p2[0] === point[0]
    );

    const linesOnY = lines.filter((line) =>
        line.p1[1] === point[1] || line.p2[1] === point[1]
    );

    let rotationDeltaX = 0;
    for (const line of linesOnX) {
        console.log({ line });
        if (line.p1[0] !== line.p2[0]) {
            rotationDeltaX += line.delta;
        }
    }
    if (Math.abs(rotationDeltaX) % 4 === 0) {
        return true;
    }

    let rotationDeltaY = 0;
    for (const line of linesOnY) {
        if (line.p1[0] !== line.p2[0]) {
            rotationDeltaY += line.delta;
        }
    }
    return Math.abs(rotationDeltaY) % 4 === 0;
};

const getLargestRectangleBox = (
    distSortedPairs,
    lines,
) => {
    for (const pointSet of distSortedPairs) {
        const { p1, p2, area } = pointSet;
        const p3 = [p1[0], p2[1]];
        const p4 = [p2[0], p1[1]];

        if (
            isEnclosedInAnyAxis(p3, lines) &&
            isEnclosedInAnyAxis(p4, lines)
        ) {
            return { p1, p2, area };
        }
    }
};

const getPointsBetweenLinePairs = (linePoints) => {
    const points = [];
    for (const { p1, p2 } of linePoints) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const minX = x1 < x2 ? x1 : x2;
        const maxX = x1 < x2 ? x2 : x1;

        const minY = y1 < y2 ? y1 : y2;
        const maxY = y1 < y2 ? y2 : y1;

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                points.push([x, y]);
            }
        }
    }
    return points;
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
const equalPoint = (p1, p2) => {
    return p1[0] === p2[0] && p1[1] === p2[1];
};

const CACHE = {};

const something = (point, used, allPoints) => {
    // console.log("IN : ", point);
    const shapes = [];

    const withPoint = allPoints.filter((e) =>
        equalPoint(e.p1, point) || equalPoint(e.p2, point)
    );
    // console.log({ point, withP: withPoint });
    // prompt();

    const newUsed = [...used, point];
    for (const line of withPoint) {
        const p2 = equalPoint(line.p1, point) ? line.p2 : line.p1;

        if (used.some((p) => equalPoint(p, p2))) {
            // console.log("FOUND returning: ", p2);
            // shapes.push([p2]);
            shapes.push([]);
        } else {
            // if (!CACHE[p2.toString()]){
            CACHE[p2.toString()] = something(p2, newUsed, allPoints);
            // }
            const closedShapesPart = CACHE[p2.toString()];

            const shapesPartWithStart = closedShapesPart.map((
                e,
            ) => [point, ...e]);
            // console.log(closedShapesPart.length, " : ", { closedShapesPart });
            // console.log("Adding ")
            shapes.push(...shapesPartWithStart);
        }
    }
    console.log("out : ", shapes.length);
    return shapes[0];
};

const getClosedShapes = (lines) => {
    const p1 = lines[0].p1;
    const shapes = something(p1, [], lines);
    return shapes;
};

const { largest, largestAreaPoint, areaAndPoints } = getMaxArea(positions);
const sortedAreaAndPoints = areaAndPoints.toSorted((a, b) => b.area - a.area);

const linePairs = getPointsPair(positions);

const closedShapes = getClosedShapes(linePairs);
// const pointsBetweenLinePairs = getPointsBetweenLinePairs(linePairs);

const unique = (arr) => {
    const a = [];
    for (const item of arr) {
        // console.log({item})
        if (a.some((e) => e.toString() === item.toString())) continue;
        a.push(item);
    }
    return a;
};

closedShapes.sort((a, b) => a.length - b.length);
// console.log(closedShapes.length);
// console.log(unique(closedShapes).length);
const uniques = unique(closedShapes);
console.log(uniques.map((e) => e.toString()).len);
// console.log({ pointsBetweenLinePairs, linePairs, positions });
// const map = matrix(positions, maxX, maxY);

// const fill = (map, points) => {
//     for (const { x, y } of points) {
//         map[y][x] = "X";
//     }
// };

// fill(map, pointsBetweenLinePairs);

// draw(map);

const finalPoints = getLargestRectangleBox(
    sortedAreaAndPoints,
    linePairs,
);

// console.log({ finalPoints });
// 122760

// LOW
// 507072

// HIGH
// 4591195600
// 4590472620
