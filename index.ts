import { readCsv, mapUsers } from "./src/utils";
import { Movie, Rating } from "./src/types";
import findSimilarUsers from "./src/findSimilarUsers";
import getMoviePredictions from "./src/getMoviePredictions";
import {
  atomicEngine,
  groupEngine,
  positionAbsenteeismEngine,
} from "./src/whyNot";

const INTERSECTION_THRESHOLD = 0.1;
const AMOUNT_OF_MOVIES = 10;
const SIMILAR_USER_PERCENTAGE = 0.3;
const PEER_COUNT = 20;
const USER_ID = "2";
const ratings = readCsv<Rating>("ratings.csv");
const movies = readCsv<Movie>("movies.csv");
const userMap = mapUsers(ratings);
const mainUser = userMap[USER_ID];

const similarUsers = findSimilarUsers(
  USER_ID,
  userMap,
  INTERSECTION_THRESHOLD,
  PEER_COUNT
);
const predictions = getMoviePredictions(
  mainUser,
  similarUsers,
  AMOUNT_OF_MOVIES,
  SIMILAR_USER_PERCENTAGE
);
const NUM_PI = SIMILAR_USER_PERCENTAGE * similarUsers.length;
console.log(
  `Recommended predictions from ${similarUsers.length} users for user ${USER_ID}, with at least ${NUM_PI} users rated the movies:`
);
predictions.forEach((prediction) => {
  const { movieId, prediction: score, fromUserLength } = prediction;
  const movie = movies.find((movie) => movie.movieId === movieId);
  if (!movie) return;
  console.log(
    `* Movie(${movie.movieId}): ${movie.title} - Score: ${score} - From: ${fromUserLength} users`
  );
});
console.log("------------------------");
console.log(
  "To simplify the why-not engine, we only use similar peers to make explanations.".toUpperCase()
);
console.log("------------------------");

// we simplify the why-not engine by using the data input from the similar peers.
console.log("Atomic WhyNot Engine: :");
console.log(
  `- ${atomicEngine("999999", similarUsers, predictions, movies, NUM_PI)}`
);
console.log(
  `- ${atomicEngine("4878", similarUsers, predictions, movies, NUM_PI)}`
);
console.log(
  `- ${atomicEngine("1", similarUsers, predictions, movies, NUM_PI)}`
);
console.log(
  `- ${atomicEngine("2", similarUsers, predictions, movies, NUM_PI)}`
);
console.log(
  `- ${atomicEngine("4", similarUsers, predictions, movies, NUM_PI)}`
);
// From observations, we can briefly see that comedies and musicals aren't popular among the similar peers.
console.log("------------------------");
console.log("------------------------");
// comedies
console.log("Group WhyNot Engine:");
console.log(
  `- Comedies: ${groupEngine(
    ["69", "65", "88", "102", "104", "1", "20", "21"],
    similarUsers,
    predictions,
    NUM_PI
  )}`
);

// musical
console.log(
  `- Musical: ${groupEngine(
    ["477", "549", "829", "918", "912", "869", "56757"],
    similarUsers,
    predictions,
    NUM_PI
  )}`
);

console.log("------------------------");
console.log("------------------------");
// comedies
console.log("Position absenteeism WhyNot Engine:");
console.log(
  `- ${positionAbsenteeismEngine(
    "858",
    similarUsers,
    predictions,
    movies,
    2,
    NUM_PI
  )}`
);

console.log(
  `- ${positionAbsenteeismEngine(
    "1136",
    similarUsers,
    predictions,
    movies,
    5,
    NUM_PI
  )}`
);
