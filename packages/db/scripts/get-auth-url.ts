import dotenv from "dotenv";
dotenv.config();

if (!process.env.STRAVA_CLIENT_ID) {
  throw new Error("STRAVA_CLIENT_ID environment variable not set");
}

const clientId = process.env.STRAVA_CLIENT_ID;
const redirectUri = "http://localhost/exchange_token";
const scope = "read,activity:read_all,profile:read_all";

const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

console.log("Open this URL in your browser to authorize your application:");
console.log(authUrl);
console.log(
  "\nAfter authorization, you'll be redirected to a URL that contains a 'code' parameter."
);
console.log("Copy that code and use it to get your initial tokens with:");
console.log(`\ncurl -X POST https://www.strava.com/oauth/token \\
  -d client_id=${clientId} \\
  -d client_secret=YOUR_CLIENT_SECRET \\
  -d code=THE_CODE_FROM_REDIRECT \\
  -d grant_type=authorization_code`);
