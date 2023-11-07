import spearmanRankCorrelation from "./spearmanCorrelation";
import { UserMap } from "./types";

// Find similar users for a given user using the userMap
export const getSimilarUsers = (userMap: Record<string, UserMap>, userId: string, intersectionThreshold: number = 0.15) => {
  const mainUser = userMap[userId];

  // Extract the movie IDs and ratings of the main user
  const mainUserRatings = mainUser.ratings.map((rating) => Number(rating.rating));
  const mainUserMovies = mainUser.movies.map((movieId) => Number(movieId));

  const usersWithSimilarities = [];

  for (const user of Object.values(userMap)) {
    if (user.userId === userId) continue;

    // Extract the movie IDs and ratings of the current user
    const currentUserMovies = user.movies.map((movieId) => Number(movieId));

    // Calculate the intersection
    const intersection = mainUserMovies.filter((movieId) => currentUserMovies.includes(movieId));

    // Skip if intersection is too small
    const intersectionRatio = intersection.length / mainUserMovies.length;
    if (intersectionRatio < intersectionThreshold) continue;

    const currentUserRatings = intersection.map((movieId) => {
      const movieIndex = user.movies.indexOf(movieId.toString());
      if (movieIndex !== -1) {
        return user.ratings[movieIndex].rating;
      }
    });

    const correlation = spearmanRankCorrelation(mainUserRatings, currentUserRatings);

    // Skip if correlation is too low
    if (correlation <= 0) continue;

    usersWithSimilarities.push({
      user: user.userId,
      correlation,
      mainUserRatings,
      currentUserRatings,
    });
  }

  // Sort the users by correlation in descending order
  usersWithSimilarities.sort((a, b) => b.correlation - a.correlation);

  return usersWithSimilarities;
};
