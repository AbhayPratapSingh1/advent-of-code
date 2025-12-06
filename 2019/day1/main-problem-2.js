import { fuelRequiredOnMass } from "./src/moduleMassFuelRequirement.js";

const readData = (file) => {
  return Deno.readTextFileSync(file);
};

const recursiveFuelWhile = (data) => {
  let totalFuel = 0;
  let fuel = fuelRequiredOnMass(data);
  while (fuel > 0) {
    totalFuel += fuel;
    fuel = fuelRequiredOnMass(fuel);
  }
  return totalFuel;
};

console.log(recursiveFuelWhile(100756) === 50346);
console.log(recursiveFuelWhile(1969) === 966);

const modules = readData("./data/input1.txt").split("\n").map((each) => +each);

console.log(modules);

const moduelesFuel = modules.map((each) => fuelRequiredOnMass(each));
console.log(moduelesFuel);

const moduelesFuelFuel = moduelesFuel.map((each) =>
  each + recursiveFuelWhile(each)
);
console.log(moduelesFuelFuel);

console.log(moduelesFuelFuel.reduce((sum, each) => sum + each, 0));
