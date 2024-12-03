import chalk from "chalk";
import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const regex = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);
const matches = data.match(regex);

const mul = (a, b) => a * b;

let total = 0;
matches.forEach((currentV) => {
  const v = eval(currentV); // Maybe, maybe i am a bad guy
  total += v;
});

console.log(total);
