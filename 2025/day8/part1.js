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

const sqr = (x) => x * x;

const distanceBetween = (p1, p2) => {
    return (sqr(p1[0] - p2[0]) + sqr(p1[1] - p2[1]) + sqr(p1[2] - p2[2]));
};

const findDistances = (points) => {
    const distances = [];
    for (const point of points) {
        for (const point2 of points) {
            if (point !== point2) {
                const distance = distanceBetween(point, point2);
                distances.push({
                    p1: point.toString(),
                    p2: point2.toString(),
                    distance,
                });
            }
        }
    }

    return distances;
};

const getSmallest = (distances) => {
    return distances.reduce((s, b) => {
        return (s.distance > b.distance) ? b : s;
    });
};

const getAndRemoveSmallest = (distances) => {
    const { p1, p2 } = distances.pop();
    return { distances, p1, p2 };
};

const bucket = (distance, count = 10) => {
    let unparsedDistances = distance;
    const buckets = [];
    let c = 0;
    while (count !== c) {
        c++;
        console.log(unparsedDistances.length);
        const { p1, p2, distances: newDistance } = getAndRemoveSmallest(
            unparsedDistances,
        );
        unparsedDistances = newDistance;
        const p1Bucket = buckets.find((e) => e.includes(p1));
        const p2Bucket = buckets.find((e) => e.includes(p2));

        if (p1Bucket && p2Bucket) {
            if (p1Bucket !== p2Bucket) {
                p1Bucket.push(...p2Bucket);
                const p2Index = buckets.findIndex((e) => e === p2Bucket);
                buckets.splice(p2Index, 1);
            }
        } else if (p1Bucket) {
            p1Bucket.push(p2);
        } else if (p2Bucket) {
            p2Bucket.push(p1);
        } else {
            buckets.push([p1, p2]);
        }
    }
    return buckets;
};

const data = parseData(rawData);

const distances = findDistances(data);
const sortedDistances = distances.sort((a, b) => b.distance - a.distance)
    .filter((e, i) => i % 2);
const buckets = bucket(sortedDistances, 1000);

const sortedBuckets = buckets.map((e) => e.length).toSorted((a, b) => b - a);

const [a, b, c, ...rest] = sortedBuckets;

console.log({ buckets, sortedBuckets });
console.log({ a, b, c }, a * b * c);

// 62186
