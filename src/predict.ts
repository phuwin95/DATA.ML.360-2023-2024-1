import { UserByMoviePrediction } from "./types";

/**
 * Returns the predicted rating for a movie
 * @param ratingMean mean of the user's ratings
 * @param userSet array of users that is used to predict the rating
 */
export const predict = (
  ratingMean: number,
  userSet: UserByMoviePrediction[]
) => {
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < userSet.length; i++) {
    const { correlation, rating, mean } = userSet[i];
    numerator += correlation * (rating - mean);
    denominator += correlation;
  }
  return ratingMean + numerator / denominator;
};
