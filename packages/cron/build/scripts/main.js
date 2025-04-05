import { db } from "@repo/db";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { Api } from "../__generated__/Api.js";
dotenv.config();
/*
 * To properly authorize your application with Strava, visit:
 * https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost/exchange_token&response_type=code&scope=read,activity:read_all,profile:read_all
 *
 * Replace YOUR_CLIENT_ID with your actual client ID
 * After authorizing, you'll be redirected to a URL that contains a 'code' parameter
 * Use that code to get your initial access and refresh tokens with:
 *
 * curl -X POST https://www.strava.com/oauth/token \
 *   -d client_id=YOUR_CLIENT_ID \
 *   -d client_secret=YOUR_CLIENT_SECRET \
 *   -d code=THE_CODE_FROM_REDIRECT \
 *   -d grant_type=authorization_code
 *
 * Update your .env file with the new refresh_token you receive
 */
async function refreshToken() {
    if (!process.env.STRAVA_CLIENT_ID ||
        !process.env.STRAVA_CLIENT_SECRET ||
        !process.env.STRAVA_REFRESH_TOKEN) {
        throw new Error("Missing required environment variables for Strava API");
    }
    const params = new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: "refresh_token",
    });
    console.log("Token refresh URL params:", params.toString());
    const response = await fetch(`https://www.strava.com/oauth/token?${params}`, {
        method: "POST",
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
    }
    const data = await response.json();
    console.log("Token refresh response:", {
        access_token: data.access_token
            ? `${data.access_token.substring(0, 5)}...`
            : undefined,
        token_type: data.token_type,
        expires_at: data.expires_at,
        expires_in: data.expires_in,
    });
    return data.access_token;
}
async function main() {
    const api = new Api();
    try {
        // Get a fresh access token
        const accessToken = await refreshToken();
        console.log("Using access token:", accessToken.substring(0, 5) + "...");
        // Use the fresh token to fetch activities
        // const response = await fetch(
        //   "https://www.strava.com/api/v3/athlete/activities",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   }
        // );
        const response = await api.athlete.getLoggedInAthleteActivities({}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch activities: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
        }
        const activities = await response.json();
        fs.writeFile(path.join(__dirname, "./data.json"), JSON.stringify(activities));
        // console.log(activities.filter((activity) => activity.type === "Ride"));
        for (let i = 0; i < activities.length; i++) {
            const { id, start_date, average_heartrate, type, distance, average_watts, elapsed_time, } = activities[i];
            await db.activity.upsert({
                where: {
                    id: id,
                },
                create: {
                    activityId: id,
                    start_date,
                    average_heartrate,
                    type,
                    distance,
                    average_watts,
                    elapsed_time,
                },
                update: {
                    start_date,
                    average_heartrate,
                    type,
                    distance,
                    average_watts,
                    elapsed_time,
                },
            });
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}
main();
