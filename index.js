import {} from "dotenv/config";
import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const rwClient = client.readWrite;

const today = new Date();
const year = today.getFullYear() - 20;
let month = (today.getMonth() + 1).toString();
if (month.length < 2) {
  month = "0" + month;
}
let day = (today.getDate()).toString();
if (day.length < 2) {
  day = "0" + day;
}

const tweet = () => {
    fetch(
  `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&primary_release_date.gte=${year}-${month}-${day}&primary_release_date.lte=${year}-${month}-${day}&vote_count.gte=200`
)
  .then((res) => res.json())
  .then((json) => {
      json.results.forEach(async (movie) => {
          rwClient.v2.tweet(`${movie.title} came out 20 years ago`);
      })
  })
  .catch((err) => console.log(err));
};

tweet();
