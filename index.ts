import { average, minimum } from "./src/aggregations";
import findSimilarUsers from "./src/findSimilarUsers";
import getMoviePredictions from "./src/getMoviePredictions";
import getMoviePredictionsForUser from "./src/getMoviePredictionsForUser";
import spearmansCorrelation from "./src/spearmansCorrelation";
import { Rating } from "./src/types";
import { mapUsers, readCsv } from "./src/utils";

const ratings = readCsv<Rating>("ratings.csv");

const userMap = mapUsers(ratings);

const AMOUNT_OF_MOVIES = 30; // increase this to get more movie predictions

const movies1 = getMoviePredictionsForUser({
  userMap,
  userId: 1,
  intersectionThreshold: 0.1,
  similarUserPercentage: 0.4,
  amountOfMovies: AMOUNT_OF_MOVIES,
});
const movies2 = getMoviePredictionsForUser({
  userMap,
  userId: 543,
  intersectionThreshold: 0.1,
  similarUserPercentage: 0.3,
  amountOfMovies: AMOUNT_OF_MOVIES,
});
const movies3 = getMoviePredictionsForUser({
  userMap,
  userId: 32,
  intersectionThreshold: 0.1,
  similarUserPercentage: 0.2,
  amountOfMovies: AMOUNT_OF_MOVIES,
});

const predictionByMinimum = minimum([movies1, movies2, movies3]);
// filter out movies that have less than 2 users
const filteredPredictionByMinimum = predictionByMinimum.filter(
  (x) => x.usersLength >= 2
);
// sort by user length then by prediction
filteredPredictionByMinimum.sort(
  (a, b) => b.usersLength - a.usersLength || b.prediction - a.prediction
);
console.log(filteredPredictionByMinimum.slice(0, 10));

// average([movies1, movies2, movies3]);

// console.log(group["1"]);
// console.log(group["2"]);
// console.log(group["3"]);
