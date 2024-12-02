// Not proud of my solution but i dont really care its 1000 samples and its 1:34 am

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

const runReport = (report, isInRecursion = false) => {
  const overallTrend = -(report[0] - report[report.length - 1]);
  const overallTrendPositive = overallTrend > 0;
  // console.log(chalk.cyan("Running report for"));
  // console.log(report);
  for (let i = 1; i < report.length; i++) {
    const level = report[i];
    const previousLevel = report[i - 1];
    const trend = -(previousLevel - level);
    const trendPositive = trend > 0;
    const absTrend = Math.abs(trend);

    if (absTrend < 1 || absTrend > 3) {
      // Trend outside bounds
      // Try removing the item from the array and trying again. If successful, pass. Otherwise fail.

      // console.log("Report", report, "is unsafe for bounds");
      if (isInRecursion) return false;

      // Brute-force
      let passing = false;
      for (let j = 0; j < report.length; j++) {
        const newReport = [...report].toSpliced(j, 1);
        if (runReport(newReport, true)) passing = true;
      }
      // console.log(passing);
      if (passing) {
        console.log("Report", report, "Is passing due to fixed bounds");
        return report;
      } else {
        console.log("Report", report, "Is failing due to bounds");
        return null;
      }
    }

    if (trendPositive !== overallTrendPositive) {
      // Trend outside bounds

      // console.log("Report", report, "is unsafe for trend");
      if (isInRecursion) return false;

      // Brute-force
      let passing = false;
      for (let j = 0; j < report.length; j++) {
        const newReport = [...report].toSpliced(j, 1);
        if (runReport(newReport, true)) passing = true;
      }
      if (passing) {
        console.log("Report", report, "Is passing due to fixed trend");
        return report;
      } else {
        console.log("Report", report, "is failing due to trend");
        return null;
      }
    }
  }
  if (isInRecursion) return true;
  console.log("Report", report, "is safe");
  return report;
};

const result = levels.filter((report, i) => {
  return runReport(report);
});

console.log(result.length);
