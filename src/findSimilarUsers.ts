import pearsonCorrelation from "./pearsonCorrelation";
import { UserMap } from "./types";

/**
 *
 * @param id id of the user
 * @param userMap user map with formatted data
 * @param intersectionThreshold defines the percentage of intersection between two users. Default 0
 * @param amount amount of similar users to return. Default to 10
 * @returns
 */
const findSimilarUsers = (
  id: string,
  userMap: Record<string, UserMap>,
  intersectionThreshold = 0,
  amount = 10
) => {
  const main = userMap[id];
  const usersWithSimilarties = [] as {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[];

  // define the threshold count
  const intersectionThresholdCount = main.movies.length * intersectionThreshold;

  Object.keys(userMap).forEach((key) => {
    if (key === id) return; // skip the same user
    const { movies, ratings } = userMap[key];

    // find the intersection of movies
    const intersection = main.movies.filter((x) => movies.includes(x));

    // skip if no intersection
    if (
      intersection.length === 0 ||
      intersection.length <= intersectionThresholdCount
    )
      return;

    // get the ratings for the intersection for the main user
    const mainUserRatings = intersection.map(
      (movieId) =>
        main.ratings.find((x) => x.movieId === movieId)?.rating as number
    );

    // get the ratings for the intersection for the other user
    const otherUserRatings = intersection.map(
      (movieId) => ratings.find((x) => x.movieId === movieId)?.rating as number
    );

    // find the pearson correlation
    const correlation = pearsonCorrelation(mainUserRatings, otherUserRatings);

    // skip if correlation is NaN or less than or equal to 0
    if (isNaN(correlation) || correlation <= 0) return;

    usersWithSimilarties.push({
      user: userMap[key],
      correlation,
      mainUserRatings,
      otherUserRatings,
    });
  });

  // sort the users by correlation
  usersWithSimilarties.sort((a, b) => b.correlation - a.correlation);
  const results = usersWithSimilarties.slice(0, amount);
  return results;
};

export default findSimilarUsers;
