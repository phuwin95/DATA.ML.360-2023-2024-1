import findSimilarUsers from "./findSimilarUsers";
import getMoviePredictions from "./getMoviePredictions";
import { UserMap } from "./types";

const getMoviePredictionsForUser = ({
  userId,
  intersectionThreshold,
  similarUserPercentage,
  amountOfSimilarUsers = 20,
  amountOfMovies = 30,
  userMap,
}: {
  userMap: Record<string, UserMap>;
  userId: number;
  intersectionThreshold: number;
  similarUserPercentage: number;
  amountOfSimilarUsers?: number;
  amountOfMovies?: number;
}) => {
  const similarUsers = findSimilarUsers(
    userId.toString(),
    userMap,
    intersectionThreshold,
    amountOfSimilarUsers
  );
  const predictions = getMoviePredictions(
    userMap[userId],
    similarUsers,
    amountOfMovies,
    similarUserPercentage
  );
  return predictions;
};

export default getMoviePredictionsForUser;
