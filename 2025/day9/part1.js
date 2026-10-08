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


const getMaxArea = (points) => {
    let largest = 0;
    let largestAreaPoint = 0;
    for (const point of points){
        for (const point2 of points){
            const dx = Math.abs(point[0] - point2[0]) + 1
            const dy = Math.abs(point[1] - point2[1]) + 1;
            const currentArea = areaOfRect(dx, dy);
            largest = largest > currentArea ? largest : currentArea;
            largestAreaPoint =  largest > currentArea ? largestAreaPoint : [point, point2];
        }
    }
    return {largest, largestAreaPoint};
}

const data = parseData(rawData);
const {largest, largestAreaPoint} = getMaxArea(data)
console.log(largest, largestAreaPoint)