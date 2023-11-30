import { Movie, UserMap } from "./types";
import { mean } from "./utils";

type WhyNotResult = {
  /**
   * The amount of similar peers that have rated the movie
   */
  peerCount: number;
  /**
   * The average rating of the similar peers to the movie
   */
  score: number;
};

export const whyNotAtomic = (
  movieId: string,
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[]
): WhyNotResult => {
  const { peerCount, sum } = similarUsers.reduce(
    (acc, { user }) => {
      // find the rating of the user for the movie
      const rating = Number(
        user.ratings.find((rating) => rating.movieId === movieId)?.rating
      );

      // if the rating is not a number, we ignore it
      if (isNaN(rating)) return acc;

      // return the sum and the amount of peers that have rated the movie
      return {
        peerCount: acc.peerCount + 1,
        sum: acc.sum + rating,
      };
    },
    // initial value of the accumulator
    {
      sum: 0,
      peerCount: 0,
    }
  );
  // calculate the score
  const score = peerCount > 0 ? sum / peerCount : 0;
  return {
    peerCount,
    score,
  };
};

/**
 * why not engine for checking why a movie is not in the top-k movies
 * @param movieId id of the movie
 * @param similarUsers array of similar users
 * @param predictions array of predictions
 * @param movies list of all movies
 * @param numPi threshold for counting top-k mvoies
 * @returns the reason why the movie is not suggested in the top-k movies
 */
export const atomicEngine = (
  movieId: string,
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[],
  predictions: {
    movieId: string;
    prediction: number;
    fromUserLength: number;
  }[],
  movies: Movie[],
  numPi: number = 10
) => {
  const movie = movies.find((movie) => movie.movieId === movieId);
  // CASE when movie is not found
  if (!movie) return `Movie ${movieId} not found`;

  // we get the title of the movie for loggin purposes
  const { title } = movie;

  // CASE when movie is already in top 10
  if (predictions.find((prediction) => prediction.movieId === movieId))
    return `Movie ${title} is already in top 10`;

  // getting the result from the whyNotAtomic function
  const { peerCount, score } = whyNotAtomic(movieId, similarUsers);

  if (peerCount === 0) return `No similar peers have rated this movie ${title}`;
  if (peerCount < numPi)
    return `Only ${peerCount} similar peers have rated ${title} (less than the required ${numPi})`;

  const lowestPrediction = predictions.reduce((acc, curr) => {
    return curr.prediction < acc ? curr.prediction : acc;
  }, 100);

  if (lowestPrediction > score)
    return `Similar peers have rated movie ${title} too low (${score.toPrecision(
      3
    )}) to be in top 10, lowest prediction is ${lowestPrediction.toPrecision(
      3
    )}`;
};


/**
 * 
 * @param movieIds id of the movies that are part of the group
 * @param similarUsers array of similar users
 * @param predictions array of predictions
 * @param numPi threshold for counting top-k mvoies
 * @returns the reason why the movies of the genre are not suggested
 */
export const groupEngine = (
  movieIds: string[],
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[],
  predictions: {
    movieId: string;
    prediction: number;
    fromUserLength: number;
  }[],
  numPi: number = 10
) => {
  const result = movieIds.reduce(
    (acc, curr) => {
      const { peerCount, score } = whyNotAtomic(curr, similarUsers);
      acc.peerCounts.push(peerCount);
      acc.scores.push(score);
      return acc;
    },
    {
      peerCounts: [] as number[],
      scores: [] as number[],
    }
  );
  const peerCount = mean(result.peerCounts);
  const score = mean(result.scores);
  if (peerCount === 0) return `No similar peers have rated the movies`;
  if (peerCount < numPi)
    return `Not enough similar peers (${peerCount.toPrecision(
      3
    )}) have rated the movies (less than the required ${numPi})`;

  const lowestPrediction = predictions.reduce((acc, curr) => {
    return curr.prediction < acc ? curr.prediction : acc;
  }, 100);

  if (lowestPrediction > score)
    return `Similar peers have rated the movies too low (${score.toPrecision(
      3
    )}) to be in top 10, lowest prediction is ${lowestPrediction.toPrecision(
      3
    )}`;
};

/**
 * 
 * @param movieId id of the movie
 * @param similarUsers array of similar users
 * @param predictions array of predictions
 * @param movies array of movie objects
 * @param rank position of the movie in the top-k movies
 * @param numPi threshold for counting top-k mvoies
 * @returns the reason why the movie is not higher or lower in the top-k movies
 */
export const positionAbsenteeismEngine = (
  movieId: string,
  similarUsers: {
    user: UserMap;
    correlation: number;
    mainUserRatings: number[];
    otherUserRatings: number[];
  }[],
  predictions: {
    movieId: string;
    prediction: number;
    fromUserLength: number;
  }[],
  movies: Movie[],
  rank: number,
  numPi: number = 10
) => {
  const movie = movies.find((movie) => movie.movieId === movieId);
  // CASE when movie is not found
  if (!movie) return `Movie ${movieId} not found`;

  // we get the title of the movie for loggin purposes
  const { title } = movie;

  // find the location of the movie in the predictions
  const index = predictions.findIndex(
    (prediction) => prediction.movieId === movieId
  );

  if (index <= rank && index >= 0)
    return `Movie ${title} at ${index + 1} is already in top ${rank + 1}`;

  // getting the result from the whyNotAtomic function
  const { peerCount, score } = whyNotAtomic(movieId, similarUsers);

  if (peerCount === 0) return `No similar peers have rated this movie ${title}`;
  if (peerCount < numPi)
    return `Only ${peerCount} similar peers have rated ${title} (less than the required ${numPi})`;

  const rankPrediction = predictions[rank].prediction;

  if (rankPrediction > score)
    return `Similar peers have rated the movie ${title} too low (${score.toPrecision(
      3
    )}) to be in top ${rank + 1}, the rating at top ${
      rank + 1
    } is ${rankPrediction.toPrecision(3)}`;
};
