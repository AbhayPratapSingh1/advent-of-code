import { fuelRequiredOnMass } from "./src/moduleMassFuelRequirement.js";

const readData = (file) => {
  return Deno.readTextFileSync(file);
};

const readMassFromFile = () => {
  const modulesMasses = readData("./data/input1.txt");

  return modulesMasses.split("\n").map((each) => +each);
};

export const totalMassRequiredFuel = () => {
  const data = readMassFromFile();

  return data.map((each) => fuelRequiredOnMass(each))
    .reduce((sum, value) => sum + value);
};
