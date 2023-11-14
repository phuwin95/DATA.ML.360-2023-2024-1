import { MoviePrediction } from "./types";

type DisagreementCalculationFunction = (
  num: number,
  nums: number[]
) => number | null;
// TODO
/**
 * aggregation function that returns the prediction based on the minimum rating. If a user hasn't rated a movie, simply omit it.
 * @param predictions array of movie predictions
 * @param defaultValue default value to return if there are no predictions. Default is 6
 * @param disagreementCalculationFunction function to calculate the disagreement between the predictions. Default is null
 */
export const minimum = (
  predictions: MoviePrediction[][],
  defaultValue = 6,
  disagreementCalculationFunction = null as unknown as DisagreementCalculationFunction
) => {
  const aggregated = predictions.reduce(
    (acc, moviePredictionArray) => {
      // we loop through the array of movie rating predictions
      moviePredictionArray.forEach((moviePrediction) => {
        const { movieId, prediction } = moviePrediction;
        if (!acc[movieId]) {
          // if the movieId is not in the accumulator, we add it with the default value
          acc[movieId] = {
            movieId,
            prediction: defaultValue,
            fromUserLength: 0,
            predictions: [],
          };
        }
        const rating = Math.min(prediction, acc[movieId].prediction);
        acc[movieId] = {
          movieId,
          prediction: rating,
          fromUserLength: acc[movieId].fromUserLength + 1,
          predictions: [...acc[movieId].predictions, prediction],
        };
      });
      return acc;
    },
    {} as Record<
      string,
      MoviePrediction & {
        predictions: number[];
      }
    >
  );
  return Object.values(aggregated).map((x) => {
    let disagreement = null;
    if (disagreementCalculationFunction) {
      // if there are 3 users and the prediction array is [1,2],
      // the predictions will be [1,2,0] so we can calculate the disagreement correctly
      const ratings = Array(predictions.length)
        .fill(0)
        .map((_, i) => x.predictions[i] || _);
      disagreement = disagreementCalculationFunction(x.prediction, ratings);
    }
    return {
      ...aggregated[x.movieId],
      disagreement,
    };
  });
};
/**
 *
 * @param predictions array of movie predictions
 * @param defaultValue  default value to return if there are no predictions. Default is 0
 * @param disagreementCalculationFunction function to calculate the disagreement between the predictions. Default is null
 * @returns
 */
export const average = (
  predictions: MoviePrediction[][],
  defaultValue = 0,
  disagreementCalculationFunction = null as unknown as DisagreementCalculationFunction
) => {
  const aggregated = predictions.reduce(
    (acc, moviePredictionArray) => {
      // we loop through the array of movie rating predictions
      moviePredictionArray.forEach((moviePrediction) => {
        const { movieId, prediction } = moviePrediction;

        if (!acc[movieId]) {
          // if the movieId is not in the accumulator, we add it with the default value
          acc[movieId] = {
            movieId,
            prediction: defaultValue,
            fromUserLength: 0,
            predictions: [],
          };
        }

        const rating =
          (acc[movieId].prediction * acc[movieId].fromUserLength + prediction) /
          (acc[movieId].fromUserLength + 1); // we calculate the average rating

        acc[movieId] = {
          movieId,
          prediction: rating,
          fromUserLength: acc[movieId].fromUserLength + 1,
          predictions: [...acc[movieId].predictions, prediction],
        };
      });
      return acc;
    },
    {} as Record<
      string,
      MoviePrediction & {
        predictions: number[];
      }
    >
  );

  return Object.values(aggregated).map((x) => {
    let disagreement = null;
    if (disagreementCalculationFunction) {
      // if there are 3 users and the prediction array is [1,2],
      // the predictions will be [1,2,0] so we can calculate the disagreement correctly
      const ratings = Array(predictions.length)
        .fill(0)
        .map((_, i) => x.predictions[i] || 0);
      disagreement = disagreementCalculationFunction(x.prediction, ratings);
    }
    return {
      ...aggregated[x.movieId],
      disagreement,
    };
  });
};
