import { readCsv, mapUsers } from "./src/utils";
import { Movie, Rating, UserMap } from "./src/types";
import findSimilarUsers from "./src/findSimilarUsers";
import getMoviePredictionsForUser from "./src/getMoviePredictionsForUser";
import getMoviePredictions from "./src/getMoviePredictions";
import { atomicEngine, groupEngine, whyNotAtomic } from "./src/whyNot";

const INTERSECTION_THRESHOLD = 0.1;
const AMOUNT_OF_MOVIES = 10;
const SIMILAR_USER_PERCENTAGE = 0.3;
const PEER_COUNT = 20;
const ratings = readCsv<Rating>("ratings.csv");
const movies = readCsv<Movie>("movies.csv");
const userMap = mapUsers(ratings);
const mainUser = userMap["2"];

const similarUsers = findSimilarUsers(
  "2",
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

// we simplify the why-not engine by using the data input from the similar peers.
console.log("Atomic WhyNot Engine: (based on similar peers):");
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
console.log("------");
console.log("------");
console.log("------");
// comedies
console.log("Group WhyNot Engine: (based on similar peers):");
console.log(
  `- Comedies: ${groupEngine(
    ["69", "65", "88", "102", "104", "1", "20", "21"],
    similarUsers,
    predictions,
    movies,
    NUM_PI
  )}`
);

// musical
console.log(
  `- Musical: ${groupEngine(
    ["477", "549", "829", "918", "912", "869", "56757"],
    similarUsers,
    predictions,
    movies,
    NUM_PI
  )}`
);
