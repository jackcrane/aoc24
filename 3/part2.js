import chalk from "chalk";
import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const regex = new RegExp(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);
const matches = data.match(regex);

const mul = (a, b) => a * b;

let total = 0;
let enabled = true;
matches.forEach((currentV) => {
  if (currentV == "don't()") {
    enabled = false;
  } else if (currentV == "do()") {
    enabled = true;
  } else if (enabled) {
    const v = eval(currentV); // Maybe, maybe i am a bad guy
    total += v;
  }
});

console.log(total);
