import { assert, assertEquals } from "@std/assert";
import { fuelRequiredOnMass } from "../src/moduleMassFuelRequirement.js";


Deno.test("adding test case 12", () => {
  assertEquals(fuelRequiredOnMass(12), 2);
});

Deno.test("adding test case 14", () => {
  assertEquals(fuelRequiredOnMass(14), 2);
});

Deno.test("adding test case 1969", () => {
  assertEquals(fuelRequiredOnMass(1969), 654);
});

Deno.test("adding test case 100756", () => {
  assertEquals(fuelRequiredOnMass(100756), 33583);
});
