import { predict } from "./predict";
import { UserByMoviePrediction, UserMap } from "./types";
const getMoviePredictions = (
  user: UserMap,
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[],
  amount = 10
) => {
  // find a set of movies that the main user has not rated, and similar users have watched
  const moviesNotRatedByMainUser = ["3", "4", "5"];

  // map moviesNotRatedByMainUser to have userSetbyMovies
  // {
  //   correlation: number;
  //   userId: string;
  //   rating: number;
  //   mean: number;
  // }
  const userSetObject = {
    "3": [] as UserByMoviePrediction[],
    "4": [] as UserByMoviePrediction[],
  } as Record<string, UserByMoviePrediction[]>;

  const moviesWithPrediction = [];
  Object.keys(userSetObject).forEach((movieId) => {
    const prediction = predict(user.mean, userSetObject[movieId]);
    moviesWithPrediction.push({
      movieId,
      prediction,
    });
  });

  // sort moviesWithPrediction
  // return the amount
};

export default getMoviePredictions;
