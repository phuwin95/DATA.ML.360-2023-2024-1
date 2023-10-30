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
  rating: string;
  timestamp: string;
}

export interface Tag {
  userId: string;
  movieId: string;
  tag: string;
  timestamp: string;
}
