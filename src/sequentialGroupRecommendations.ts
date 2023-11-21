import getMoviePredictionsForUser from "./getMoviePredictionsForUser";
import { UserMap, MoviePrediction, Rating } from "./types";

const generateSequentialGroupRecommendations = (
  userMap: Record<string, UserMap>,
  groupOfUsers: number[],
  rounds: number
) => {
  const AMOUNT_OF_MOVIES = 30;

  const userPredictionArrays: MoviePrediction[][][] = [];

  for (let round = 1; round <= rounds; round++) {
    const predictionsForRound: MoviePrediction[][] = [];

    for (const userId of groupOfUsers) {
      const movies = getMoviePredictionsForUser({
        userMap,
        userId,
        intersectionThreshold: 0.1,
        similarUserPercentage: 0.4 - (round - 1) * 0.1,
        amountOfMovies: AMOUNT_OF_MOVIES,
      });

      predictionsForRound.push(movies);
    }

    userPredictionArrays.push(predictionsForRound);
  }

  return userPredictionArrays;
};

export { generateSequentialGroupRecommendations };
