import { MoviePrediction } from "./types";

// utilize the mean of absolute differences
export const calculateDisagreement = (
  prediction: MoviePrediction,
  predictionSets: MoviePrediction[][]
) => {
  const { prediction: rating } = prediction;
  let sum = 0;
  predictionSets.forEach((predictionSet) => {
    const found = predictionSet.find((x) => x.movieId === prediction.movieId);
    const currentRating = found?.prediction ?? 0; // if not found, use 0
    sum += Math.abs(rating - currentRating);
  });
  return sum / predictionSets.length;
};
