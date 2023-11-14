import { MoviePrediction } from "./types";

// TODO
/**
 * aggregation function that returns the prediction based on the minimum rating. If a user hasn't rated a movie, simply omit it.
 * @param predictions array of movie predictions
 * @param defaultValue default value to return if there are no predictions. Default is 6
 */
export const minimum = (predictions: MoviePrediction[][], defaultValue = 6) => {
  const aggregated = predictions.reduce((acc, moviePredictionArray) => {
    // we loop through the array of movie rating predictions
    moviePredictionArray.forEach((moviePrediction) => {
      const { movieId, prediction } = moviePrediction;
      if (!acc[movieId]) {
        // if the movieId is not in the accumulator, we add it with the default value
        acc[movieId] = {
          movieId,
          prediction: defaultValue,
          fromUserLength: 0,
        };
      }
      const rating = Math.min(prediction, acc[movieId].prediction);
      acc[movieId] = {
        movieId,
        prediction: rating,
        fromUserLength: acc[movieId].fromUserLength + 1,
      };
    });
    return acc;
  }, {} as Record<string, MoviePrediction>);
  return Object.values(aggregated).map((x) => aggregated[x.movieId]);
};
// TODO
export const average = (predictions: MoviePrediction[][], defaultValue = 0) => {
  const aggregated = predictions.reduce((acc, moviePredictionArray) => {
    // we loop through the array of movie rating predictions
    moviePredictionArray.forEach((moviePrediction) => {
      const { movieId, prediction } = moviePrediction;

      if (!acc[movieId]) {
        // if the movieId is not in the accumulator, we add it with the default value
        acc[movieId] = {
          movieId,
          prediction: defaultValue,
          fromUserLength: 0,
        };
      }

      const rating =
        (acc[movieId].prediction * acc[movieId].fromUserLength + prediction) /
        (acc[movieId].fromUserLength + 1); // we calculate the average rating

      acc[movieId] = {
        movieId,
        prediction: rating,
        fromUserLength: acc[movieId].fromUserLength + 1,
      };
    });
    return acc;
  }, {} as Record<string, MoviePrediction>);

  return Object.values(aggregated).map((x) => aggregated[x.movieId]);
};
