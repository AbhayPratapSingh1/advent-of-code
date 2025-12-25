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

const isNewPath = ({ p1, p2 }, node, founded) => {
  return (p1 === node && (!founded.includes(p2))) ||
    (p2 === node && (!founded.includes(p1)));
};

const smallestPossible = (placesWithDistance, allPlaces) => {
  const placeDistance = [];
  const usedPlaces = [];

  const smallest = placesWithDistance.reduce((closest, current) =>
    closest.distance > current.distance ? current : closest
  );
  const { p1: node1, p2: node2 } = smallest;
  placeDistance.push(smallest.distance);
  usedPlaces.push(node1, node2);

  let currentNode = node2;

  while (usedPlaces.length !== allPlaces.length) {
    const smallest = placesWithDistance
      .filter((each) => isNewPath(each, currentNode, usedPlaces))
      .reduce((closest, current) =>
        closest.distance > current.distance ? current : closest
      );
    const { p1: node1, p2: node2 } = smallest;
    placeDistance.push(smallest.distance);

    if (node1 === currentNode) {
      usedPlaces.push(node2);
      currentNode = node2;
    } else {
      usedPlaces.push(node1);
      currentNode = node1;
    }
  }

  const finalRelation = placesWithDistance.find((each) =>
    (each.p1 === currentNode && each.p2 === node1) ||
    (each.p2 === currentNode && each.p1 === node1)
  );
  placeDistance.push(finalRelation.distance);

  return placeDistance;
};

const placeWithDistance = parseInput(rawData);

const allPlaces = uniquePlace(placeWithDistance);

const smallestDistance = smallestPossible(placeWithDistance, allPlaces);
console.log(smallestDistance);

const max = Math.max(...smallestDistance);
smallestDistance.splice(smallestDistance.indexOf(max), 1);
console.log(smallestDistance.reduce((a, b) => a + b));
