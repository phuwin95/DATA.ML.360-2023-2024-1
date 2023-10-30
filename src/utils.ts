import { readFileSync } from "fs";
import { parse } from "papaparse";
import { UserByMoviePrediction } from "./types";

/**
 *
 * @param path path to the csv file
 * @returns the data from the csv file
 */
export const readCsv = <T>(path: string, dir = "./data/"): T[] => {
  const file = readFileSync(`${dir}${path}`, "utf8");
  const { data } = parse(file, { header: true });
  return data as T[];
};

/**
 * finding mean of an array
 * @param x array of numbers
 * @returns the mean of the array
 */
const mean = (x: number[]) => {
  const n = x.length;
  const sum = x.reduce((acc, curr) => acc + curr, 0);
  return sum / n;
};

/**
 * get the pearson correlation between two arrays
 * @param x array of numbers
 * @param y array of number
 * @returns the pearson correlation between x and y
 */
export const pearsonCorrelation = (x: number[], y: number[]) => {
  const n = x.length;
  const meanX = mean(x);
  const meanY = mean(y);
  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominatorX += (x[i] - meanX) ** 2;
    denominatorY += (y[i] - meanY) ** 2;
  }
  return numerator / (Math.sqrt(denominatorX) * Math.sqrt(denominatorY));
};

/**
 * Returns the predicted rating for a movie
 * @param a array of numbers
 * @param userSet array of users
 */
export const predict = (meanA: number, userSet: UserByMoviePrediction[]) => {
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < userSet.length; i++) {
    const { correlation, rating, mean } = userSet[i];
    numerator += correlation * (rating - mean);
    denominator += correlation;
  }
  return meanA + numerator / denominator;
};
