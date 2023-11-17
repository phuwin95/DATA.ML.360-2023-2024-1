import { average, minimum } from "./src/aggregations";
import { meanAbsoluteDifference } from "./src/meanAbsoluteDifference";
import getMoviePredictionsForUser from "./src/getMoviePredictionsForUser";
import { Rating } from "./src/types";
import {
  mapUsers,
  readCsv,
  sortByDisagreement,
  sortByRating,
} from "./src/utils";

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

const userPredictionArray = [movies1, movies2, movies3];

const predictionByMinimum = minimum(
  userPredictionArray,
  6,
  meanAbsoluteDifference
);

console.log("Using minimum method, and sort by ratings:");
console.log(sortByRating(predictionByMinimum));
console.log("\nUsing minimum method, and sort by disagreement:");
console.log(sortByDisagreement(predictionByMinimum));
// Using average method -------------------------------------------------
const predictionByAverage = average(
  userPredictionArray,
  0,
  meanAbsoluteDifference
);

console.log("\nUsing average method, and sort by ratings:");
console.log(sortByRating(predictionByAverage));
console.log("\nUsing average method, and sort by disagreement:");
console.log(sortByDisagreement(predictionByAverage));
// sort by lowest disagreement first - meaning the most relevant first
