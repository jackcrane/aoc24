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
  if (cells[row][col] !== "X") return false;

  const up = (() => {
    if (!cells[row - 3]) return false;

    if (cells[row - 1][col] !== "M") return false;
    if (cells[row - 2][col] !== "A") return false;
    if (cells[row - 3][col] !== "S") return false;

    console.log("Matched [ up  ]", row, col);
    count++;
    logMatch(
      [
        [row - 3, col],
        [row - 2, col],
        [row - 1, col],
        [row, col],
      ],
      chalk.bgBlue
    );

    return true;
  })();
  console.log(up);

  const down = (() => {
    if (!cells[row + 3]) return false;

    if (cells[row + 1][col] !== "M") return false;
    if (cells[row + 2][col] !== "A") return false;
    if (cells[row + 3][col] !== "S") return false;

    console.log("Matched [ down ]", row, col);
    count++;
    logMatch(
      [
        [row + 3, col],
        [row + 2, col],
        [row + 1, col],
        [row, col],
      ],
      chalk.bgGreen
    );

    return true;
  })();

  const left = (() => {
    if (!cells[row][col - 3]) return false;

    if (cells[row][col - 1] !== "M") return false;
    if (cells[row][col - 2] !== "A") return false;
    if (cells[row][col - 3] !== "S") return false;

    console.log("Matched [ left ]", row, col);
    count++;
    logMatch(
      [
        [row, col - 3],
        [row, col - 2],
        [row, col - 1],
        [row, col],
      ],
      chalk.bgRed
    );

    return true;
  })();

  const right = (() => {
    if (!cells[row][col + 3]) return false;

    if (cells[row][col + 1] !== "M") return false;
    if (cells[row][col + 2] !== "A") return false;
    if (cells[row][col + 3] !== "S") return false;

    console.log("Matched [ right ]", row, col);
    count++;
    logMatch(
      [
        [row, col + 3],
        [row, col + 2],
        [row, col + 1],
        [row, col],
      ],
      chalk.bgYellow
    );

    return true;
  })();

  const upLeft = (() => {
    if (!cells[row - 3] || !cells[row - 3][col - 3]) return false;

    if (cells[row - 1][col - 1] !== "M") return false;
    if (cells[row - 2][col - 2] !== "A") return false;
    if (cells[row - 3][col - 3] !== "S") return false;

    console.log("Matched [ upLeft ]", row, col);
    count++;
    logMatch(
      [
        [row - 3, col - 3],
        [row - 2, col - 2],
        [row - 1, col - 1],
        [row, col],
      ],
      chalk.bgMagenta
    );

    return true;
  })();

  const downLeft = (() => {
    if (!cells[row + 3] || !cells[row + 3][col - 3]) return false;

    if (cells[row + 1][col - 1] !== "M") return false;
    if (cells[row + 2][col - 2] !== "A") return false;
    if (cells[row + 3][col - 3] !== "S") return false;

    console.log("Matched [ downLeft ]", row, col);
    count++;
    logMatch(
      [
        [row + 3, col - 3],
        [row + 2, col - 2],
        [row + 1, col - 1],
        [row, col],
      ],
      chalk.bgCyan
    );

    return true;
  })();

  const upRight = (() => {
    if (!cells[row - 3] || !cells[row - 3][col + 3]) return false;

    if (cells[row - 1][col + 1] !== "M") return false;
    if (cells[row - 2][col + 2] !== "A") return false;
    if (cells[row - 3][col + 3] !== "S") return false;

    console.log("Matched [ upRight ]", row, col);
    count++;
    logMatch(
      [
        [row - 3, col + 3],
        [row - 2, col + 2],
        [row - 1, col + 1],
        [row, col],
      ],
      chalk.bgWhite
    );

    return true;
  })();

  const downRight = (() => {
    if (!cells[row + 3] || !cells[row + 3][col + 3]) return false;

    if (cells[row + 1][col + 1] !== "M") return false;
    if (cells[row + 2][col + 2] !== "A") return false;
    if (cells[row + 3][col + 3] !== "S") return false;

    console.log("Matched [ downRight ]", row, col);
    count++;
    logMatch(
      [
        [row + 3, col + 3],
        [row + 2, col + 2],
        [row + 1, col + 1],
        [row, col],
      ],
      chalk.bgGray
    );

    return true;
  })();

  console.log(up);

  return (
    up || down || left || right || upLeft || downLeft || upRight || downRight
  );
};

// console.log([cells[0][0], cells[1][0], cells[2][0], cells[3][0]].join(""));

for (let row = 0; row < cells.length; row++) {
  for (let col = 0; col < cells[row].length; col++) {
    // console.log(chalk.bgWhite.black([row, col]));
    const present = search(row, col);
  }
}

console.log(count);
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
