import { readFileSync } from "fs";
import { parse } from "papaparse";
import { Rating, UserMap } from "./types";

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

export const mapUsers = (ratings: Rating[]) => {
  return ratings.reduce((acc, curr) => {
    const { userId, movieId, rating } = curr;
    if (!acc[userId]) {
      acc[userId] = {
        mean: mean(
          ratings
            .filter((x) => x.userId === userId)
            .map((x) => Number(x.rating))
        ),
        userId,
        movies: [],
        ratings: [],
      };
    }
    acc[userId].movies.push(movieId);
    acc[userId].ratings.push({
      movieId,
      rating: Number(rating),
    });
    return acc;
  }, {} as Record<string, UserMap>);
};
