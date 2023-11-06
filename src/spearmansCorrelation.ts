import pearsonCorrelation from "./pearsonCorrelation";
import { mean } from "./utils";

// get the rankings of an array based on the values
const getRankings = (arr: number[]) => {
  // first we sort the array from highest to lowest
  const sorted = [...arr].sort((a, b) => b - a);
  // then we map the original array to the sorted array with the rankings starting from 1
  return arr.map((x) => sorted.indexOf(x) + 1);
};

const spearmansCorrelation = (x: number[], y: number[]) => {
  const rankX = getRankings(x);
  const rankY = getRankings(y);
  return pearsonCorrelation(rankX, rankY);
};

export default spearmansCorrelation;
