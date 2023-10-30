import { Link, Movie, Rating, Tag } from "./src/types";
import { readCsv } from "./src/utils";

const links = readCsv("./data/links.csv") as Link[];
const movies = readCsv("./data/movies.csv") as Movie[];
const ratings = readCsv("./data/ratings.csv") as Rating[];
const tags = readCsv("./data/tags.csv") as Tag[];

console.log("First 5 rows of each file:");
console.log(links.slice(0, 5));
console.log(movies.slice(0, 5));
console.log(ratings.slice(0, 5));
console.log(tags.slice(0, 5));

console.log(`We got ${ratings.length} from ratings.csv`);
