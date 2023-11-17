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

    |-- findSimilarUsers.ts     --> This file contains the method in which finding similar users to a give user has been handled.
    
    |-- getMoviePredictions.ts  --> This file contains the method in which for a given user, the prediction of movies are being generated.
    
    |-- pearsonCorrelation.ts   --> This file contains the method for calculating the pearson correlation.
    
    |-- predict.ts              --> This file contains the method for predicting the rating for a given movie.
    
    |-- utils.ts                --> This file contains the code base for utility methods such as reading data from CSV file and finding the mean of an array.
    
    |-- types.d.ts              --> This file contains the model classes for different object models used throughout the code.

    |-- meanAbsoluteDifference.ts --> This file contains the method for calculating the mean absolute difference between a number and an array of numbers.

    |-- aggregations.ts --> This file contains the method for aggregating using either minimum method or average me the data for a given user.

    
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

### Install
`npm run install`

### Run
`npm run program`

### Dev
`npm run start`


