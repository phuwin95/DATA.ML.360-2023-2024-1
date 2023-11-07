import pearsonCorrelation from "./pearsonCorrelation";

/**
 * return the rankings of an array, where values are ranked from highest to lowest
 * @param arr array of numbers
 * @returns the rankings of the array
 */
const getRankings = (arr: number[]) => {
  // first we sort the array from highest to lowest
  const sorted = [...arr].sort((a, b) => b - a);
  // then we map the original array to the sorted array with the rankings starting from 1
  return arr.map((x) => sorted.indexOf(x) + 1);
};

/**
 * get the spearmansCorrelation correlation between two arrays
 * @param x array of numbers
 * @param y array of number
 * @returns the pearson correlation between the rankings of x and y
 */
const spearmansCorrelation = (x: number[], y: number[]) => {
  const rankX = getRankings(x);
  const rankY = getRankings(y);
  return pearsonCorrelation(rankX, rankY);
};

export default spearmansCorrelation;
