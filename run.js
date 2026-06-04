const name = Deno.args[0];

const dat = Deno.readTextFileSync(name);

console.log("Hello from the run script");

console.log(dat);
