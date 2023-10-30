import { Link, Movie, Rating, Tag } from "./src/types";
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
