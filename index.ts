import { average, minimum } from "./src/aggregations";
import { calculateDisagreement } from "./src/calculateDisagreement";
import getMoviePredictionsForUser from "./src/getMoviePredictionsForUser";
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

const userPredictionArray = [movies1, movies2, movies3];

const predictionByMinimum = minimum(userPredictionArray);
// filter out movies that have less than 2 users
const filteredPredictionByMinimum = predictionByMinimum.filter(
  (x) => x.fromUserLength >= 2
);
// sort by user length then by prediction
filteredPredictionByMinimum.sort(
  (a, b) => b.fromUserLength - a.fromUserLength || b.prediction - a.prediction
);
console.log("Using minimum method:");
const withDisagreementMinimum = filteredPredictionByMinimum.map((x) => {
  const disagreement = calculateDisagreement(x, userPredictionArray);
  return {
    ...x,
    disagreement,
  };
});
// console.log(filteredPredictionByMinimum.slice(0, 10));
// sort by lowest disagreement first - meaning the most relevant first
console.log(
  withDisagreementMinimum.sort((a, b) => a.disagreement - b.disagreement)
);

// Using average method -------------------------------------------------
const predictionByAverage = average(userPredictionArray);

// filter out movies that have less than 2 users
const filteredPredictionByAverage = predictionByAverage.filter(
  (x) => x.fromUserLength >= 2
);
// sort by user length then by prediction
filteredPredictionByAverage.sort(
  (a, b) => b.fromUserLength - a.fromUserLength || b.prediction - a.prediction
);
console.log("\nUsing average method:");

const withDisagreementAverage = filteredPredictionByAverage.map((x) => {
  const disagreement = calculateDisagreement(x, userPredictionArray);
  return {
    ...x,
    disagreement,
  };
});
// console.log(filteredPredictionByAverage.slice(0, 10));
// sort by lowest disagreement first - meaning the most relevant first
console.log(
  withDisagreementAverage.sort((a, b) => a.disagreement - b.disagreement)
);
