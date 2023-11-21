import { readCsv, mapUsers } from "./src/utils";
import { Rating, MoviePrediction } from "./src/types";
import { generateSequentialGroupRecommendations } from "./src/sequentialGroupRecommendations";
import { minimum, average } from "./src/aggregations";
import { sortByRating, sortByDisagreement } from "./src/utils";

const ratings = readCsv<Rating>("ratings.csv");
const userMap = mapUsers(ratings);
const groupOfUsers = [1, 543, 32];
const rounds = 3;

const predictions = generateSequentialGroupRecommendations(userMap, groupOfUsers, rounds);

const displayRecommendations = (
  predictions: MoviePrediction[][][],
  method: (
    predictions: MoviePrediction[][],
    defaultValue: number
  ) => {
    disagreement: number | null;
    movieId: string;
    prediction: number;
    fromUserLength: number;
    predictions: number[];
  }[],
  defaultValue: number,
  topN: number = 10
) => {
  predictions.forEach((roundPredictions, roundIndex) => {
    const roundFlattenedPredictions = roundPredictions.flat();
    const recommendations = method([roundFlattenedPredictions], defaultValue);

    console.log(`Round ${roundIndex + 1} - Using ${method.name}, and sort by ratings:`);
    console.log(sortByRating(recommendations.slice(0, topN)));

    console.log(`\nRound ${roundIndex + 1} - Using ${method.name}, and sort by disagreement:`);
    console.log(sortByDisagreement(recommendations.slice(0, topN)));
  });
};


// Display recommendations using the minimum method
displayRecommendations(predictions, minimum, 6, 10);

// Display recommendations using the average method
displayRecommendations(predictions, average, 0, 10);