import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const lines = data.split("\n");
const cells = lines.map((e) => e.split("   "));

const firstColumn = cells.map((e) => e[0]);
const secondColumn = cells.map((e) => e[1]);

const occurances = firstColumn.map((v) => {
  const matches = secondColumn.filter((q) => q === v);
  return matches.length;
});

let solution = 0;
firstColumn.forEach((e, i) => {
  solution += e * occurances[i];
});

console.log(solution);
