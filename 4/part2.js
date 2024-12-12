import chalk from "chalk";
import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const cells = data
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const clonedCells = JSON.parse(JSON.stringify(cells));

const logMatch = (selectedCells, colorFn) => {
  return;
  for (let selectedCell of selectedCells) {
    clonedCells[selectedCell[0]][selectedCell[1]] = colorFn
      .white(clonedCells[selectedCell[0]][selectedCell[1]])
      .toString();
  }

  console.log();
  console.log(clonedCells.map((row) => row.join("")).join("\n"));
  console.log();
};

let count = 0;
const search = (row, col) => {
  if (!cells[row][col]) return false;
  if (cells[row][col] !== "A") return false;

  const forward = (() => {
    if (cells[row][col] !== "A") return false;

    if (cells[row + 1]?.[col - 1] !== "M") return false;
    if (cells[row - 1]?.[col - 1] !== "M") return false;
    if (cells[row + 1]?.[col + 1] !== "S") return false;
    if (cells[row - 1]?.[col + 1] !== "S") return false;

    logMatch(
      [
        [row, col],
        [row + 1, col - 1],
        [row - 1, col - 1],
        [row + 1, col + 1],
        [row - 1, col + 1],
      ],
      chalk.bgBlue
    );

    return true;
  })();

  const backward = (() => {
    if (cells[row][col] !== "A") return false;

    if (cells[row + 1]?.[col - 1] !== "S") return false;
    if (cells[row - 1]?.[col - 1] !== "S") return false;
    if (cells[row + 1]?.[col + 1] !== "M") return false;
    if (cells[row - 1]?.[col + 1] !== "M") return false;

    logMatch(
      [
        [row, col],
        [row + 1, col - 1],
        [row - 1, col - 1],
        [row + 1, col + 1],
        [row - 1, col + 1],
      ],
      chalk.bgGreen
    );

    return true;
  })();

  const upsideDownForward = (() => {
    if (cells[row][col] !== "A") return false;

    if (cells[row + 1]?.[col - 1] !== "M") return false;
    if (cells[row - 1]?.[col - 1] !== "S") return false;
    if (cells[row + 1]?.[col + 1] !== "M") return false;
    if (cells[row - 1]?.[col + 1] !== "S") return false;

    logMatch(
      [
        [row, col],
        [row + 1, col - 1],
        [row - 1, col - 1],
        [row + 1, col + 1],
        [row - 1, col + 1],
      ],
      chalk.bgRed
    );

    return true;
  })();

  const upsideDownBackward = (() => {
    if (cells[row][col] !== "A") return false;

    if (cells[row + 1]?.[col - 1] !== "S") return false;
    if (cells[row - 1]?.[col - 1] !== "M") return false;
    if (cells[row + 1]?.[col + 1] !== "S") return false;
    if (cells[row - 1]?.[col + 1] !== "M") return false;

    logMatch(
      [
        [row, col],
        [row + 1, col - 1],
        [row - 1, col - 1],
        [row + 1, col + 1],
        [row - 1, col + 1],
      ],
      chalk.bgYellow
    );

    return true;
  })();

  return forward || backward || upsideDownForward || upsideDownBackward;
};

// console.log([cells[0][0], cells[1][0], cells[2][0], cells[3][0]].join(""));

let sum = 0;
for (let row = 0; row < cells.length; row++) {
  for (let col = 0; col < cells[row].length; col++) {
    // console.log(chalk.bgWhite.black([row, col]));
    const present = search(row, col);
    if (present) sum++;
  }
}

console.log(sum);
/*

console.log(
      [
        [row, col],
        " ",
        cells[row][col],
        cells[row - 1][col],
        cells[row - 2][col],
        cells[row - 3][col],
      ].join("")
    );



*/
