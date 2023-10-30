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
