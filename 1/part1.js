import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const lines = data.split("\n");
const cells = lines.map((e) => e.split("   "));

const firstColumn = cells.map((e) => e[0]).sort();
const secondColumn = cells.map((e) => e[1]).sort();

const differences = cells.map((_, i) => {
  return Math.abs(firstColumn[i] - secondColumn[i]);
});

const sum = differences.reduce((total, c) => total + c, 0);

console.log(sum);
