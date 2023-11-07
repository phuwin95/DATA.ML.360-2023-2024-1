import { readFileSync } from "fs";
import { parse } from "papaparse";

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
export const mean = (x: number[]) => {
  const n = x.length;
  const sum = x.reduce((acc, curr) => acc + curr, 0);
  return sum / n;
};

/**
 * find the sum of an array
 * @param array array of numbers
 * @returns the sum of the array
 */
export const sum = (array: number[]): number => {
  return array.reduce((acc, curr) => acc + curr, 0);
};