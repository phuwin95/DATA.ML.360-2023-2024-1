import { sum } from "./utils";

// Calculate the Spearman's rank correlation coefficient between two users
const spearmanRankCorrelation = (user1Ratings: number[], user2Ratings: number[]) => {
    // Create a mapping of movie IDs to ranks for each user
    const user1Ranks = {};
    const user2Ranks = {};
  
    for (let i = 0; i < user1Ratings.length; i++) {
      const movieId = user1Ratings[i];
      const rating = user2Ratings[i];
  
      if (!user1Ranks[movieId]) {
        user1Ranks[movieId] = 0;
      }
  
      user1Ranks[movieId]++;
  
      if (!user2Ranks[movieId]) {
        user2Ranks[movieId] = 0;
      }
  
      user2Ranks[movieId]++;
    }
  
    // Calculate the rank differences
    const rankDifferences = [];
    for (const movieId in user1Ranks) {
      const user1Rank = user1Ranks[movieId];
      const user2Rank = user2Ranks[movieId];
  
      const rankDifference = user1Rank - user2Rank;
      rankDifferences.push(rankDifference ** 2);
    }
  
    // Calculate the number of rated movies
    const n = Object.keys(user1Ranks).length;
  
    // Calculate the Spearman's rank correlation coefficient
    const correlation = 1 - (6 * sum(rankDifferences) / (n ** 3 - n));
  
    return correlation;
  };

  export default spearmanRankCorrelation;