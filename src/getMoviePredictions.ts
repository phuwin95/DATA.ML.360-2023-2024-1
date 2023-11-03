import { predict } from "./predict";
import { UserByMoviePrediction, UserMap } from "./types";
/**
 *
 * @param user the main user
 * @param similarUsers set of similar users with the user information, correlation, and ratings
 * @param amount amount of movies to return
 * @param amountOfSimilarUsersPercentage for setting a threshold for the amount of similar users that have rated the movie, default is 0.3. For example, if the threshold is 0.3, and there are 10 similar users, then the movie must have been rated by at least 3 similar users to be included in the predictions
 * @returns
 */
const getMoviePredictions = (
  user: UserMap,
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[],
  amount = 10,
  amountOfSimilarUsersPercentage = 0.3
) => {
  // find a set of movies that the main user has not rated, and similar users have watched
  const moviesRatedByMainUser = user.movies;

  // use set to avoid duplicates
  const moviesNotRatedByMainUser = new Set<string>();

  // for each similar user
  similarUsers.forEach((similarUser) => {
    const moviesRatedBySimilarUser = similarUser.user.movies;
    // for each movie that the similar user has rated
    moviesRatedBySimilarUser.forEach((movieId) => {
      // if the main user has not rated the movie
      if (!moviesRatedByMainUser.includes(movieId)) {
        // add the movie to the set of movies that the main user has not rated
        moviesNotRatedByMainUser.add(movieId);
      }
    });
  });

  // convert set to array
  const moviesNotRatedByMainUserArray = [...moviesNotRatedByMainUser];

  // populate an object with the movies as keys and empty arrays as values
  // this will become { "{movieId}": [], "{movieId}": [], ... }
  const userSetObject = moviesNotRatedByMainUserArray.reduce((acc, curr) => {
    acc[curr] = [] as UserByMoviePrediction[];
    return acc;
  }, {} as Record<string, UserByMoviePrediction[]>);

  // then we populate the object with the similar users' ratings of the movies
  moviesNotRatedByMainUserArray.forEach((movieId) => {
    similarUsers.forEach((similarUser) => {
      // if the similar user has not rated the movie, skip
      if (!similarUser.user.movies.includes(movieId)) return;
      // add the similar user rating of the movie to the set of ratings for the movie
      userSetObject[movieId].push({
        correlation: similarUser.correlation,
        userId: similarUser.user.userId,
        rating: similarUser.user.ratings.find((x) => x.movieId === movieId)
          ?.rating as number,
        mean: similarUser.user.mean,
      });
    });
  });

  // then we predict the rating for each movie
  const moviesWithPrediction = [] as {
    movieId: string;
    /**
     * The predicted rating
     */
    prediction: number;
    /**
     * The amount of similar users that have rated the movie. For logging purposes
     */
    fromUserLength: number;
  }[];

  // calculate the threshold. If we don't gather less ratings then the thresholds, we don't include the movie in the predictions
  const threshold = amountOfSimilarUsersPercentage * similarUsers.length;

  Object.keys(userSetObject).forEach((movieId) => {
    if (userSetObject[movieId].length < threshold) return; // if the movie has less ratings than the threshold, skip
    const prediction = predict(user.mean, userSetObject[movieId]); // predict the rating
    moviesWithPrediction.push({
      movieId,
      fromUserLength: userSetObject[movieId].length,
      prediction,
    });
  });

  moviesWithPrediction.sort((a, b) => b.prediction - a.prediction); // sort the movies by the predicted rating from highest to lowest

  return moviesWithPrediction.slice(0, amount); // trim the array to the amount of movies we want to return
};

export default getMoviePredictions;
