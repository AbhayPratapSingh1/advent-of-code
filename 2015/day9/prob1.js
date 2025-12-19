const data = Deno.readTextFileSync("input1.txt");

const parseInput = (data) => {
  const eachRecord = data.split("\n");

  const places = [];
  for (const place of eachRecord) {
    const [bothPlace, distanceString] = place.split(" = ");
    const distance = +distanceString;
    const [p1, p2] = bothPlace.split(" to ");
    const placesDi = { from: p1, to: p2, distance };
    places.push(placesDi);
  }
  return places;
};

console.log(parseInput(data));
