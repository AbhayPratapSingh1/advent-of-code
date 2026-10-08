const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
    "SAMPLE_2": "sample2.txt",
    "SAMPLE_4": "sample4.txt",
    "SAMPLE_5": "sample5.txt",
    "SAMPLE_6": "sample6.txt",
    "SAMPLE_7": "sample7.txt",
    "INPUT": "input.txt",
};

const rawData = Deno.readTextFileSync(SAMPLE.SAMPLE_7);

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

const closed = [];

const sqrDistanceBetweenPoint = (p1, p2) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return sqr(x2 - x1) + sqr(y2 - y1);
};
const sqrt = (x) => (x ** (1 / 2));

const isOnLine = (point, line) => {
    const p1 = line.p1;
    const p2 = line.p2;
    // console.log("ST", p1, p2, point);
    // console.log({ point, p1 }, sqrDistanceBetweenPoint(point, p1));
    // console.log({ point, p2 }, sqrDistanceBetweenPoint(point, p2));
    // console.log({ p1, p2 }, sqrDistanceBetweenPoint(p1, p2));
    // console.log(sqrt(sqrDistanceBetweenPoint(point, p1)) +
    //         sqrt(sqrDistanceBetweenPoint(point, p2)) ,sqrt(sqrDistanceBetweenPoint(p1, p2)), );
    // console.log("EBD\n\n");

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

    // return getClosedShape(lines);
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
        // console.log(tdx, tdy);
        if (tdx === 0 && tdy === 0) {
            return true;
        }
    }
    return false;
};

const getMaxIndexValue = (data, index) => {
    return data.reduce((a, b) => b[index] > a ? b[index] : a, 0);
};

// console.log(isOnAnyLine(point, linePairs));
// console.log(linePairs)

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

const positions = parseData(rawData);

const maxX = getMaxIndexValue(positions, 0);
const maxY = getMaxIndexValue(positions, 1);
console.log({ maxX, maxY });

const linePairs = getPointsPair(positions);

const pointMap = getPointMap(positions);
console.log({pointMap})
// const shapes = getClosedShapes(pointMap);
const point = [3,6];
// console.log(shapes);

// const map = matrix(positions, maxX, maxY);

// console.log(map.length, map[0].length)
// fill(map, positions);
// draw(map);
// const pos = [];

// for (let i = 0; i <= maxX; i++) {
//     for (let j = 0; j <= maxY; j++) {
//         if (isInShape([i, j], shapes, linePairs)){
//             console.log( { i, j }, isInShape([i, j], shapes,linePairs));
//             pos.push([i, j]);
//         }
//     }
// }

// fill(map, pos, "#");
// fill(map, positions);
// console.log("\n\n")
// draw(map);
console.log(  isInShape(point, shapes, linePairs));
// console.log({ pointMap });
// console.log({ shapes }, shapes.length);
