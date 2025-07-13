import { db } from "@repo/db";
// import path from "node:path";

import dotenv from "dotenv";
import { Api } from "./__generated__/Api.js";
// import { fileURLToPath } from "node:url";
import { getActivitySchema } from "../src/schema/activity.js";
import { getLastSyncPreviousDateAsync } from "./get-last-sync-date.js";
dotenv.config();

const RESULTS_PER_PAGE = 200; //max rate limit for my account is 200
const DAYS_TO_SUBTRACT = 20;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
  if (
    !process.env.STRAVA_CLIENT_ID ||
    !process.env.STRAVA_CLIENT_SECRET ||
    !process.env.STRAVA_REFRESH_TOKEN
  ) {
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
    throw new Error(
      `Failed to refresh token: ${response.status} ${response.statusText}\nResponse: ${errorText}`
    );
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

    const lastSyncPreviousDate =
      await getLastSyncPreviousDateAsync(DAYS_TO_SUBTRACT);

    const response = await api.athlete.getLoggedInAthleteActivities(
      { per_page: RESULTS_PER_PAGE, after: lastSyncPreviousDate },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch activities: ${response.status} ${response.statusText}\nResponse: ${errorText}`
      );
    }

    const activities: Activity[] = await response.json();
    // fs.writeFile(
    //   path.join(__dirname, "./data.json"),
    //   JSON.stringify(activities)
    // );
    // console.log(activities.filter((activity) => activity.type === "Ride"));
    console.log({ activitiesFound: activities.length });
    for (let i = 0; i < activities.length; i++) {
      const mapString = activities[i]
        ? JSON.stringify(activities[i].map)
        : undefined;

      const activitySchema = getActivitySchema;

      const parsedActivity = activitySchema.parse({
        ...activities[i],
        map: mapString,
      });

      const {
        activityId,
        startDate,
        averageHeartrate,
        type,
        distance,
        averageWatts,
        elapsedTime,
        averageCadence,
        totalElevationGain,
        map,
      } = parsedActivity;

      await db.activity.upsert({
        where: {
          activityId: activityId.toString(),
        },
        create: {
          activityId: activityId.toString(),
          startDate,
          averageHeartrate,
          type,
          distance,
          averageWatts,
          elapsedTime: elapsedTime?.toString(),
          averageCadence,
          totalElevationGain,
          map,
        },
        update: {
          startDate,
          averageHeartrate,
          type,
          distance,
          averageWatts,
          elapsedTime: elapsedTime?.toString(),
          averageCadence,
          totalElevationGain,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

interface Athlete {
  id: number;
  resource_state: number;
}

// https://developers.strava.com/docs/reference/#api-models-PolylineMap
interface PolyLineMap {
  id: string;
  summary_polyline: string | null;
  resource_state: number;
}

// https://developers.strava.com/docs/reference/#api-models-SummaryActivity
export interface Activity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number | null;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: number[] | null;
  end_latlng: number[] | null;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: PolyLineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}
