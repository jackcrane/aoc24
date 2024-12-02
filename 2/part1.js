import chalk from "chalk";
import fs from "fs";
const data = fs.readFileSync("./data.txt", "utf8");

const reports = data.split("\n");
const levels = reports.map((e) => e.split(" ").map((f) => parseInt(f)));

/*
1. Iterate through each report and calculate the difference between levels[n] and levels[n+1]
2. Determine if the overall trend is positive or negative (difference between first and last)
3. Ensure that the levels have a difference of 1 to 3 inclusive
4. Ensure that the direction of the difference is the same as the overall trend
*/

const result = levels.filter((report, i) => {
  const overallTrend = -(report[0] - report[report.length - 1]);
  const overallTrendPositive = overallTrend > 0;
  for (let i = 1; i < report.length; i++) {
    const level = report[i];
    const previousLevel = report[i - 1];
    const trend = -(previousLevel - level);
    const trendPositive = trend > 0;
    const absTrend = Math.abs(trend);

    if (absTrend < 1 || absTrend > 3) {
      // console.log(chalk.redBright(`Trend outside bounds (${trend})`));
      return null;
    }

    if (trendPositive !== overallTrendPositive) {
      // console.log(chalk.redBright("Trend mismatch"));
      return null;
    }
  }
  return report;
});

console.log(result.length);
