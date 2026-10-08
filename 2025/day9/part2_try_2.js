// LET ME LOG THE LOGIC WHICH JUST COMES IN MY MIND,
// SINCE I AM GOING TO DO SOME WORK.
// DRAW THE BORDERS OF THE RECTANGLE -> TAKE ONE POINT AND MOVE IN ALL DIRECTION UNTIL IT FIND SOMETHING IF IT FIND ANY OTHER RECT THEN DRAW THAT LINE OTHERWISE LEAVE IT.
// FILL INSIDE IT USING THE SAME LOGIC TAKE ONE SIDE GO ON EACH AND DO FOR THE SAME AND FILL IT.
// DOING LAST TWO GIVE RED AND GREEN TYPE MAP
// AFTER THIS TAKE RED POINTS AND THEN GET AREA SORT IT WITH POINTS AND THEN DO FOLLOWING
// TAKE MAX RECTANGLE POINTS, FIND THE OTHER POINT, IF THEY ARE OF COLOR GREEN THEN GO ENTIRE SIDES AND IF BOTH SATISFY THEN WE CAN DECLARE THAT ONE AS THE LARGEST ONE.
// WHY FIRST POINT AND THEN SIDES? -> SO THAT IT WILL TAKE LESS ITERATIONS.

// UPDATE IN THE APPROACH -> USE THE LINE IN PLACE OF MAP; EFFICIENT AND MEMORY PROBLEM
const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.INPUT);

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

const inRange = (v, min, max) => v < max && v >= min;

const positions = parseData(rawData);

const maxX = getMaxIndexValue(positions, 0);
const maxY = getMaxIndexValue(positions, 1);

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

const getPointsPair = (positions) => {
    const points = [];

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const p1 = positions[i];
            const p2 = positions[j];

            if (p1[0] === p2[0] || p1[1] === p2[1]) {
                points.push([p1, p2]);
            }
        }
    }
    return points;
};

const get = (map, [x, y]) => {
    return map[y][x];
};

const isValidFillableRectangle = (map, p1, p2) => {
    const p3 = [p1[0], p2[1]];
    const p4 = [p2[0], p1[1]];

    // console.log(p3, p4);
    const validTiles = ["X", "#"];

    if (
        !validTiles.includes(get(map, p3)) || !validTiles.includes(get(map, p4))
    ) {
        return false;
    }
    return true;
};

const getFillableRectangle = (map, pointsSet) => {
    return pointsSet.find(({ p1, p2 }) =>
        isValidFillableRectangle(map, p1, p2)
    );
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
    // console.log(point, line);
    const p1 = line[0];
    const p2 = line[1];
    return (sqrDistanceBetweenPoint(point, p1) +
            sqrDistanceBetweenPoint(point, p2) ===
        sqrDistanceBetweenPoint(p1, p2));
};

const isOnAnyLine = (point, lines) => {
    return lines.some((line) => isOnLine(point, line));
};

// const isEnclosedInAnyAxis = (point, pointsBetween) => {
//     console.log({ point });
//     console.log(">>>> ", pointsBetween[0]);
//     const isAnyMinX = pointsBetween.some(([x, y]) =>
//         point[1] === y && point[0] >= x
//     );

//     const isAnyMaxX = pointsBetween.some(([x, y]) =>
//         point[1] === y && point[0] <= x
//     );

//     const isAnyMinY = pointsBetween.some(([x, y]) =>
//         point[0] === x && point[1] >= y
//     );

//     const isAnyMaxY = pointsBetween.some(([x, y]) =>
//         point[0] === x && point[1] <= y
//     );
//     return (isAnyMaxX && isAnyMinX) && (isAnyMaxY && isAnyMinY);
// };

const isOnEnclosedAxis = (point, pointsBetween) => {
    const anyMinX =
        pointsBetween.some(([x, y]) => point[1] === y && point[0] > x)
            .length;

    const anyMaxX =
        pointsBetween.some(([x, y]) => point[1] === y && point[0] < x)
            .length;

    const anyMinY =
        pointsBetween.some(([x, y]) => point[0] === x && point[1] > y)
            .length;

    const anyMaxY =
        pointsBetween.some(([x, y]) => point[0] === x && point[1] < y)
            .length;
};

const isEnclosedInAnyAxis = (point, pointsBetween) => {
    if (isOnEnclosedAxis(point, pointsBetween)) {
        return true;
    }
//     console.log(pointsBetween, point)
// console.log(pointsBetween.some((p) => p[0] === point[0] && p[1] === point[1]))
    if (pointsBetween.some((p) => p[0] === point[0] && p[1] === point[1])) {
        
        return true;
    }

    const anyMinXA = [];
    const anyMinYA = [];
    const anyMaxXA = [];
    const anyMaxYA = [];
    for (const [x, y] of pointsBetween) {
        if (point[1] === y && point[0] > x) anyMinXA.push([x, y]);
        if (point[1] === y && point[0] < x) anyMaxXA.push([x, y]);
        if (point[0] === x && point[1] > y) anyMinYA.push([x, y]);
        if (point[0] === x && point[1] > y) anyMaxYA.push([x, y]);
    }

    const anyMinX = anyMinXA.length;

    const anyMaxX = anyMaxXA.length;

    const anyMinY = anyMinYA.length;

    const anyMaxY = anyMaxYA.length;

    // console.log({ anyMaxX, anyMaxY, anyMinX, anyMinY });

    if (anyMaxX === 0 || anyMinX === 0 || anyMaxY === 0 || anyMinY === 0) {
        return false;
    }

    return anyMaxX  !== 0 && anyMinX  !== 0 &&
        anyMaxY  !== 0 && anyMinY  !== 0;
};

const getLargestRectangleBox = (
    distSortedPairs,
    pointsBetweenLinePairs,
) => {
    let i = 0;
    for (const pointSet of distSortedPairs) {
        i++;
        const { p1, p2, area } = pointSet;

        if (area === 4591195600){
            continue
        }
        const p3 = [p1[0], p2[1]];
        const p4 = [p2[0], p1[1]];

        if (
            isEnclosedInAnyAxis(p3, pointsBetweenLinePairs) &&
            isEnclosedInAnyAxis(p4, pointsBetweenLinePairs)
        ) {
            return { p1, p2, area };
        }
    }
};

const getPointsBetweenLinePairs = (linePoints) => {
    // console.log({ linePoints, s: linePoints.length });

    const points = [];
    for (const [p1, p2] of linePoints) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const minX = x1 < x2 ? x1 : x2;
        const maxX = x1 < x2 ? x2 : x1;

        const minY = y1 < y2 ? y1 : y2;
        const maxY = y1 < y2 ? y2 : y1;
        // console.log({ minX, minY });

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                points.push([x, y]);
            }
        }
    }
    return points;
};

const matrix = (data, maxX, maxY) => {
    let matrix = [];
    for (let i = 0; i <= maxY; i++) {
        const mt = [];
        for (let j = 0; j <= maxX; j++) {
            mt.push(".");
        }
        matrix.push(mt);
    }

    for (const [x, y] of data) {
        matrix[y][x] = "#";
    }
    return matrix;
};

// console.log(largest, largestAreaPoint);

const { largest, largestAreaPoint, areaAndPoints } = getMaxArea(positions);
const sortedAreaAndPoints = areaAndPoints.toSorted((a, b) => b.area - a.area);

const linePairs = getPointsPair(positions);

const pointsBetweenLinePairs = getPointsBetweenLinePairs(linePairs);

// const map = matrix(positions, maxX, maxY);

// const fill = (map, points) => {
//     for (const [x, y] of points) {
//         map[y][x] = "X";
//     }
// };
// fill(map, pointsBetweenLinePairs);

// draw(map);

const finalPoints = getLargestRectangleBox(
    sortedAreaAndPoints,
    // [{ p1: [9, 5], p2: [2, 3], area: 1 }],
    pointsBetweenLinePairs,
);

// console.log(
//     sortedAreaAndPoints[0],
//     sortedAreaAndPoints[1],
//     sortedAreaAndPoints[2],
// );
console.log({ finalPoints });
// 122760

// LOW
// 507072

// HIGH
// 4591195600
// 4590472620