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

|-- src The files contain methods for

    |-- findSimilarUsers.ts     --> ...finding similar users to a give user has been handled.
    
    |-- getMoviePredictions.ts  --> ...a given user, the prediction of movies are being generated.
    
    |-- pearsonCorrelation.ts   --> ...for calculating the pearson correlation.

    |-- spearmansCorrelation.ts   --> ...for calculating the spearmans correlation.
    
    |-- predict.ts              --> ...for predicting the rating for a given movie.
    
    |-- utils.ts                --> ...for utility methods such as reading data from CSV file and finding the mean of an array.
    
    |-- types.d.ts              --> ...for different object models used throughout the code.
    
|-- compose.yaml ---> docker compose file for running the assignment with docker-compose

|-- Dockerfile --> define the docker image that can be used to run the assignment
```

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


