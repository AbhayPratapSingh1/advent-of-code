const rawData = Deno.readTextFileSync("input2.txt");

const parseInput = (data) => {
  const eachRecord = data.split("\n");

  const places = [];
  for (const place of eachRecord) {
    const [bothPlace, distanceString] = place.split(" = ");
    const distance = +distanceString;
    const [p1, p2] = bothPlace.split(" to ");
    const placesDi = { p1, p2, distance };
    places.push(placesDi);
  }
  return places;
};

const uniquePlace = (data) => {
  const unique = [];
  for (let index = 0; index < data.length; index++) {
    const { p1, p2 } = data[index];
    if (!unique.includes(p1)) {
      unique.push(p1);
    }

    if (!unique.includes(p2)) {
      unique.push(p2);
    }
  }
  return unique;
};

const permutations = (values) => {
  if (values.length === 0) {
    return [values];
  }
  const perms = [];
  for (let index = 0; index < values.length; index++) {
    const current = values[index];
    const leftItems = values.filter((each) => each !== current);
    const leftPerms = permutations(leftItems);

    for (const pairs of leftPerms) {
      perms.push([current, ...pairs]);
    }
  }
  return perms;
};

const calculateDistance = (places, distancePlaces) => {
  let distance = 0;
  for (let index = 0; index < places.length - 1; index++) {
    const currentPlaces = [places[index], places[index + 1]];
    const placesWithDistance = distancePlaces.find((each) =>
      currentPlaces.includes(each.p1) && currentPlaces.includes(each.p2)
    );
    distance += placesWithDistance.distance;
  }
  return distance;
};

const data = parseInput(rawData);
const possibleCombos = permutations(uniquePlace(data));

const allDistance = possibleCombos.map((each) => calculateDistance(each, data));

console.log(Math.max(...allDistance));
