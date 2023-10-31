export interface Link {
  movieId: string;
  imdbId: string;
  tmdbId: string;
}

export interface Movie {
  movieId: string;
  title: string;
  genres: string[];
}

export interface Rating {
  userId: string;
  movieId: string;
  rating: string | number;
  timestamp: string;
}

export interface Tag {
  userId: string;
  movieId: string;
  tag: string;
  timestamp: string;
}

export interface UserByMoviePrediction {
  /**
   * correlation between the user and the user we are trying to predict
   */
  correlation: number;
  /**
   * userId
   */
  userId: string;
  /**
   * rating of the movie by the user
   */
  rating: number;
  /**
   * value of the mean of the user's rating
   */
  mean: number;
}

export type UserMap = {
  userId: string;
  movies: string[];
  ratings: Partial<Rating>[];
};
