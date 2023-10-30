import { readFileSync } from "fs";
import { parse } from "papaparse";

export const readCsv = (path: string) => {
  const file = readFileSync(path, "utf8");
  const { data } = parse(file, { header: true });
  return data;
};
