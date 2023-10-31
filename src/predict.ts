import { UserByMoviePrediction } from "./types";

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
