# DATA.ML.360-2023-2024-1
This is the repository for the course Recommender System's assignments. 
| Name | Student ID |
| --- | --- |
| Phu Nguyen | 150160764 |
| Thishan Thanushka Jayawardena | 150927237 |

## Documentation
Generated using ts-doc and hosted on GitHub Pages:
https://phuwin95.github.io/DATA.ML.360-2023-2024-1/ 

The code base provided is designed and developed according to the specifications for Assignment 1 of the course module Recommender Systems. The code structure is based on the programming language known as Typescript. The code has been meticulously designed and structured for easy access and modification.

The code structure is as follows:
```
|-- data -->  This folder contains the data files (CSV files with data).

|-- index.ts --> this file contains the main function for running the code. This file includes method calls for different methods structured throughout the code base.

|-- src

    |-- aggregations.ts  --> This file contains the method for aggregating using either minimum method or average me the data for a given user.

    |-- findSimilarUsers.ts  --> This file contains the method in which finding similar users to a give user has been handled.
    
    |-- getMoviePredictions.ts  --> This file contains the method in which for a given user, the prediction of movies are being generated.

    |-- getMoviePredictionsForUser.ts  --> This file contains the method in which for a given user, the prediction of movies are being generated.

    |-- meanAbsoluteDifference.ts  --> This file contains the method for calculating the mean absolute difference between a number and an array of numbers.
    
    |-- pearsonCorrelation.ts   --> This file contains the method for calculating the pearson correlation.
    
    |-- predict.ts  --> This file contains the method for predicting the rating for a given movie.

    |-- spearmansCorrelation.ts  --> This file contains the method for calculating the spearman's correlation.
    
    |-- utils.ts  --> This file contains the code base for utility methods such as reading data from CSV file and finding the mean of an array.
    
    |-- types.d.ts  --> This file contains the model classes for different object models used throughout the code.

    |-- whyNot.ts  --> This file contains the method for identifying and determining the reasons for the why not questions.
    
|-- compose.yaml

|-- Dockerfile
```
## Why Spearman Correlation was chosen?
Spearman correlation is a non-parametric measure of rank correlation that, due to its distinctive characteristics, is an excellent choice for collaborative filtering in recommender systems. Unlike Pearson correlation, Spearman correlation focuses on monotonic rather than linear connections between variables. This makes it especially robust in circumstances with outliers, scarce user-item interactions, or ordinal ratings. Users' preferences for items are frequently ordinal in the context of recommender systems, and Spearman correlation efficiently represents the relative ordering of these preferences. Furthermore, it is less susceptible to outliers and can yield significant similarity assessments even when data is sparse or linearity assumptions are violated. Spearman correlation supplements Pearson correlation and provides a useful tool for identifying user-item associations, ultimately helping to more accurate and comprehensive suggestions in collaborative filtering applications by taking rank order into account.


## Docker
Docker is recommended to run this project.

### Build
`docker build -t recommender-system-assignment .`

### Run
`docker run recommender-system-assignment`

### Dev
`docker-compose up`

## Local without Docker

Use at least node version 18.

### Install
`npm run install`

### Run
`npm run program`

### Dev
`npm run start`


## Assignment 3

We designed a function for the sequential recommender system. The function takes as input the user predictions and returns the best movie to recommend to the user. The function is called `sequentialRecommendation`. 

### `sequentialRecommendation(userPredictions, rounds, currentRound = 0)`
The recursive function takes as input the user predictions and returns the best movie to recommend to the user. The function is described in the following sections.
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

## Assignment 4

We designed the why-not engines for Atomic; Group; and Position absenteeism with the consideration that only the top 20 similar users are used for calculating the why-not explanations. The idea is to aggregate the number of similar users that have rated the movie(s) in question, then count the average rating of the movie(s) that the similar user have rated. Then we:
-  either compare the amount of similar peers that have rated the movie(s) to the aggregated peer count 
-  or compare the average rating of the movie(s) with the lowest prediction of the top-k movies or the movie at the position in the top-k movies.
Depending on the type of why-not engine, we return the appropriate message in correlation to the results of the comparison.

The README.md file in the repository at the corresponding branch contains detailed instructions to run the code. Otherwise, the instructions are also provided below: