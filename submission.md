# Recommender system Assignment 3
| Name | Student ID |
| --- | --- |
| Phu Nguyen | 150160764 |
| Thishan Thanushka Jayawardena | 150927237 |

## Assignment 3
An essay and a presentation of the sequential recommender system are provided in the other pdf files.
A markdown version of this submission file can also be found in [https://github.com/phuwin95/DATA.ML.360-2023-2024-1/blob/assignment-3/submission.md](https://github.com/phuwin95/DATA.ML.360-2023-2024-1/blob/assignment-3/submission.md)
We designed a function for the sequential recommender system. The function takes as input the user predictions and returns the best movie to recommend to the user. The function is called `sequentialRecommendation`. 

### `sequentialRecommendation(userPredictions, rounds, currentRound = 0)`
The recursive function takes as input the user predictions and returns the best movie to recommend to the users in sequences. The function is described in the following sections.
```js
sequentialRecommendation(movies = [], userPredictions, rounds, currentRound = 0, movie = null) {
  if (currentRound == 0) {
    // first iteration
    userPredictions = userPredictions;
    weights = [1,1,1];
    // findBestMovieWithWeight we apply average aggregation for each movie, and we multiply the movie rating by the according weight
    movie = findBestMovieWithWeight(userPredictions, weights); 
    // we add the movie to the movies array
    movies.push(movie); 
    if (currentRound < rounds) {
      // we remove the movie from the userPredictions
      userPredictions = removeMovie(userPredictions, movie);
      // we calculate the mean absolute difference between the movie and the userPredictions
      madMovie = meanAbsoluteDifference(movie, userPredictions);
      // we calculate the weight of a user for the next iteration based on the mean absolute difference between the movie and the userPredictions
      weights = [weight(movie, userPredictions[0], madMovie), weight(movie, userPredictions[1], madMovie), weight(movie, userPredictions[2], madMovie)];
      // we call the function recursively
      sequentialRecommendation(movies, userPredictions, rounds, currentRound + 1, movie);
    }
  }
  // in the end we return the movies array
  return movies;
}
```


### Inside the recursive function design
Example:
| Item/User | R1 | R2 | R3 | Average |
|----|-----|-----|-----|-----|
|X1| 1 | 0.3 | 0.2 | 0.5 |
|X2| 0.8 | 0.8 | 0 | 0.53 |
|X3| 0.5 | 0.7 | 0.6 | 0.6 | 
|X4| 0.3 | 0.2 | 0.8 | 0.43 |
|X5| 0.1 | 0.1 | 0.1 | 0.1 |
```js
// first iteration
userPredictions = [R1,R2,R3];
weights = [1,1,1];
// findBestMovieWithWeight we apply average aggregation for each movie, and we multiply the movie rating by the according weight
movie1 = findBestMovieWithWeight(userPredictions, weights); // X3 0.6
movies = [movie1];
// madMovie1 = 0.06
weight1R1 = weight(movie1, R1, madMovie1); // absoluteDiff 0.1   -----> 1.67
weight1R2 = weight(movie1, R2, madMovie1); // absoluteDiff 0.1 -----> 1.67
weight1R3 = weight(movie1, R3, madMovie1); // absoluteDiff 0   -----> 1
// weight of a user for the next iteration is the rate between the diff and the madDiff
// if diff is 0, then the weight is 1
weights = [weight1R1, weight1R2, weight1R3];
// we remove the movie from the userPredictions
userPredictions = removeMovie(userPredictions, movie1);
movie2 = findBestMovieWithWeight(userPredictions, weights) // X2 0.53
madMovie2 = meanAbsoluteDifference(movie2, userPredictions); // 0.27 
weight2R1 = weight(movie2, R1, madMovie2); // absoluteDiff 0.27 -----> 0.77
weight2R2 = weight(movie2, R2, madMovie2); // absoluteDiff 0.27 -----> 0.77
weight2R3 = weight(movie2, R3, madMovie2); // absoluteDiff 0.53 -----> 1.51
```

### `findBestMovieWithWeight()`
We apply average aggregation for each movie, and we multiply the movie rating by the according weight
```js
findBestMovieWithWeight(userPredictions, weight) {
  // first we apply the weight to each user prediction
  // then we find the average of each movie
  // then we return the best movie
}
```

### `removeMovie()`
We remove the movie from the userPredictions
```js
removeMovie(userPredictions, movie) {
  // we remove the movie from the userPredictions
}
```

### `meanAbsoluteDifference(movie, userPredictions)`
We calculate the mean absolute difference between the movie and the userPredictions
```js
meanAbsoluteDifference(movie, userPredictions) {
  // we calculate the sum of the absolute differences between the movies and the userPredictions
  // we divide by the number of userPredictions
}
```

### `weight(movie, userPrediction, madMovie)`
We calculate the weight of a user for the next iteration based on the mean absolute difference between the movie and the userPredictions. If the difference is 0, then the weight is 1, otherwise we return the rate
```js
weight(movie, userPrediction, madMovie) {
  // we calculate the absolute difference between the movie and the userPrediction
  // we divide by the madMovie
  // if the diff is 0, then the weight is 1, otherwise we return the rate
}
```