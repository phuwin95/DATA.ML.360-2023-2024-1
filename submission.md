# Recommender system Assignment 4
| Name | Student ID |
| --- | --- |
| Phu Nguyen | 150160764 |
| Thishan Thanushka Jayawardena | 150927237 |

## Assignment 4
The assignment can be found in github repository branch [`assigment-4`](https://github.com/phuwin95/DATA.ML.360-2023-2024-1/tree/assignment-4): [https://github.com/phuwin95/DATA.ML.360-2023-2024-1/tree/assignment-4](https://github.com/phuwin95/DATA.ML.360-2023-2024-1/tree/assignment-4)

Updated documentation of the implementation can also be found in the github pages: [https://phuwin95.github.io/DATA.ML.360-2023-2024-1/](https://phuwin95.github.io/DATA.ML.360-2023-2024-1/)

We designed the why-not engines for Atomic, Group and position absenteeism with the consideration that only the top 20 similar users are used for calculating the why-not explanations.

The idea is to aggregate the number of similar users that have rated the movie(s) in question, then count the average rating of the movie(s) that the similar user have rated. Then we:

-  either compare the amount of similar peers that have rated the movies to the aggregated peer count 
-  or compare the average rating of the movie(s) with the lowest prediction of the top-k movies or the movie at the position in the top-k movies.

Depending on the type of why-not engine, we return the appropriate message depending on the results of the comparison.

The README.md file in the repository at the corresponding branch contains detailed instructions to run the code. Otherwise, the instructions are also provided below:

### Run with docker
#### Build
`docker build -t recommender-system-assignment .`

#### Run
`docker run recommender-system-assignment`


### Run with nodejs
Use at least node version 18.

#### Install
`npm run install`

#### Run
`npm run program`

