import { readCsv, mapUsers } from "./src/utils";
import { Rating, MoviePrediction } from "./src/types";
import { minimum, average } from "./src/aggregations";
import { sortByRating, sortByDisagreement } from "./src/utils";

const ratings = readCsv<Rating>("ratings.csv");
const userMap = mapUsers(ratings);
