import findSimilarUsers from "./src/findSimilarUsers";
import { Link, Movie, Rating, Tag, UserMap } from "./src/types";
import { readCsv } from "./src/utils";

const links = readCsv<Link>("links.csv");
const movies = readCsv<Movie>("movies.csv");
const ratings = readCsv<Rating>("ratings.csv");
const tags = readCsv<Tag>("tags.csv");

console.log("First 5 rows of each file:");
console.log(links.slice(0, 5));
console.log(movies.slice(0, 5));
console.log(ratings.slice(0, 5));
console.log(tags.slice(0, 5));

console.log(`We got ${ratings.length} from ratings.csv`);

const userMap = ratings.reduce((acc, curr) => {
  const { userId, movieId, rating } = curr;
  if (!acc[userId]) {
    acc[userId] = {
      userId,
      movies: [],
      ratings: [],
    };
  }
  acc[userId].movies.push(movieId);
  acc[userId].ratings.push({
    movieId,
    rating: Number(rating), // convert to number
  });
  return acc;
}, {} as Record<string, UserMap>);

// change this to a corresponding user
const USER_ID = "5";
// change this to a corresponding threshold. This threshold is the percentage of movies that the two users have in common
const INTERSECTION_THRESHOLD = 0.15;

const similarUsers = findSimilarUsers(USER_ID, userMap, INTERSECTION_THRESHOLD);
console.log(`Similar users to user ${USER_ID}:`);
similarUsers.forEach((x) => {
  console.log(`${x.user.userId} has a correlation of ${x.correlation}`);
  console.log(`Mains ratings: [${x.mainUserRatings.join(", ")}]`);
  console.log(`Other ratings: [${x.otherUserRatings.join(", ")}]`);
  console.log("--------------------");
});
