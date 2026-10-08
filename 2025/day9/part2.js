// LET ME LOG THE LOGIC WHICH JUST COMES IN MY MIND,
// SINCE I AM GOING TO DO SOME WORK.
// DRAW THE BORDERS OF THE RECTANGLE -> TAKE ONE POINT AND MOVE IN ALL DIRECTION UNTIL IT FIND SOMETHING IF IT FIND ANY OTHER RECT THEN DRAW THAT LINE OTHERWISE LEAVE IT.
// FILL INSIDE IT USING THE SAME LOGIC TAKE ONE SIDE GO ON EACH AND DO FOR THE SAME AND FILL IT.
// DOING LAST TWO GIVE RED AND GREEN TYPE MAP
// AFTER THIS TAKE RED POINTS AND THEN GET AREA SORT IT WITH POINTS AND THEN DO FOLLOWING
// TAKE MAX RECTANGLE POINTS, FIND THE OTHER POINT, IF THEY ARE OF COLOR GREEN THEN GO ENTIRE SIDES AND IF BOTH SATISFY THEN WE CAN DECLARE THAT ONE AS THE LARGEST ONE.
// WHY FIRST POINT AND THEN SIDES? -> SO THAT IT WILL TAKE LESS ITERATIONS.
const SAMPLE = {
    "SAMPLE_1": "sample1.txt",
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
    for (const p1 of points) {
        for (const p2 of points) {
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

const inRange = (v, min, max) => v < max && v >= min;

const iterateBoundaryUntilHit = (
    map,
    pos,
    dx,
    dy,
    icon = "#",
) => {
    let [x, y] = pos;
    x += dx;
    y += dy;
    while (inRange(x, 0, map[0].length) && inRange(y, 0, map.length)) {
        if (map[y][x] === icon) {
            return true;
        }
        x += dx;
        y += dy;
    }
    return false;
};

const fillUntilHit = (
    map,
    pos,
    dx,
    dy,
    icon = "#",
    fillIcon = "X",
) => {
    let [x, y] = pos;
    x += dx;
    y += dy;
    while (map[y][x] === ".") {
        map[y][x] = fillIcon;
        x += dx;
        y += dy;
    }
    return false;
};

const drawBoundary = (map, positions) => {
    const newMap = map.map((e) => e.map((f) => f));
    for (const position of positions) {
        for (const [dx, dy] of [[0, 1], [0, -1], [-1, 0], [1, 0]]) {
            const isHit = iterateBoundaryUntilHit(newMap, position, dx, dy);
            if (isHit) {
                fillUntilHit(newMap, position, dx, dy);
            }
        }
    }
    return newMap;
};

const fillShape = (map) => {
    const newMap = map.map((e) => e.map((f) => f));
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] === "X") {
                for (const [dx, dy] of [[0, 1], [0, -1], [-1, 0], [1, 0]]) {
                    const isHit = iterateBoundaryUntilHit(
                        newMap,
                        [x, y],
                        dx,
                        dy,
                        "X",
                    );

                    if (isHit) {
                        fillUntilHit(newMap, [x, y], dx, dy, "X");
                    }
                }
            }
        }
    }
    return newMap;
};

const get = (map, [x, y]) => {
    return map[y][x];
};

const isValidFillableRectangle = (map, p1, p2) => {

    const p3 = [p1[0], p2[1]];
    const p4 = [p2[0], p1[1]];
    
    console.log(p3,p4)
    const validTiles = ["X", "#"]
    
    if (!validTiles.includes(get(map,p3)) ||!validTiles.includes(get(map,p4))){
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

const data = parseData(rawData);
const { largest, largestAreaPoint, areaAndPoints } = getMaxArea(data);
const sortedAreaAndPoints = areaAndPoints.toSorted((a, b) => b.area - a.area);

const maxX = getMaxIndexValue(data, 0);
const maxY = getMaxIndexValue(data, 1);

const map = matrix(data, maxX, maxY);
const borderedMap = drawBoundary(map, data);
const filledMap = fillShape(borderedMap, data);

console.log("\n\n");
draw(map);
console.log("\n\n");
draw(borderedMap);
console.log("\n\n");

draw(filledMap);
console.log("\n\n");

filledMap[5][11] = "{";
filledMap[2][1] = "}";

filledMap[3][11] = "[";
filledMap[2][7] = "]";

// [ 11, 5 ] [ 1, 2 ]
// [ 11, 3 ] [ 7, 2 ]

// draw(filledMap);
console.log("\n\n");




console.log(largest, largestAreaPoint);
// console.log(sortedAreaAndPoints);


console.log(getFillableRectangle(filledMap, sortedAreaAndPoints))
