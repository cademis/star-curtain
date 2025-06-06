/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://www.strava.com/api/v3";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Strava API v3
 * @version 3.0.0
 * @baseUrl https://www.strava.com/api/v3
 *
 * The [Swagger Playground](https://developers.strava.com/playground) is the easiest way to familiarize yourself with the Strava API by submitting HTTP requests and observing the responses before you write any client code. It will show what a response will look like with different endpoints depending on the authorization scope you receive from your athletes. To use the Playground, go to https://www.strava.com/settings/api and change your “Authorization Callback Domain” to developers.strava.com. Please note, we only support Swagger 2.0. There is a known issue where you can only select one scope at a time. For more information, please check the section “client code” at https://developers.strava.com/docs.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  athletes = {
    /**
     * @description Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
     *
     * @tags Athletes
     * @name GetStats
     * @summary Get Athlete Stats
     * @request GET:/athletes/{id}/stats
     * @secure
     */
    getStats: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/athletes/${id}/stats`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
     *
     * @tags Routes
     * @name GetRoutesByAthleteId
     * @summary List Athlete Routes
     * @request GET:/athletes/{id}/routes
     * @secure
     */
    getRoutesByAthleteId: (
      id: string,
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/athletes/${id}/routes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  athlete = {
    /**
     * @description Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
     *
     * @tags Athletes
     * @name GetLoggedInAthlete
     * @summary Get Authenticated Athlete
     * @request GET:/athlete
     * @secure
     */
    getLoggedInAthlete: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/athlete`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update the currently authenticated athlete. Requires profile:write scope.
     *
     * @tags Athletes
     * @name UpdateLoggedInAthlete
     * @summary Update Athlete
     * @request PUT:/athlete
     * @secure
     */
    updateLoggedInAthlete: (weight: number, data?: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/athlete`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
     *
     * @tags Athletes
     * @name GetLoggedInAthleteZones
     * @summary Get Zones
     * @request GET:/athlete/zones
     * @secure
     */
    getLoggedInAthleteZones: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/athlete/zones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the activities of an athlete for a specific identifier. Requires activity:read. Only Me activities will be filtered out unless requested by a token with activity:read_all.
     *
     * @tags Activities
     * @name GetLoggedInAthleteActivities
     * @summary List Athlete Activities
     * @request GET:/athlete/activities
     * @secure
     */
    getLoggedInAthleteActivities: (
      query?: {
        /** An epoch timestamp to use for filtering activities that have taken place before a certain time. */
        before?: number;
        /** An epoch timestamp to use for filtering activities that have taken place after a certain time. */
        after?: number;
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/athlete/activities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of the clubs whose membership includes the authenticated athlete.
     *
     * @tags Clubs
     * @name GetLoggedInAthleteClubs
     * @summary List Athlete Clubs
     * @request GET:/athlete/clubs
     * @secure
     */
    getLoggedInAthleteClubs: (
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/athlete/clubs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  segments = {
    /**
     * @description Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.
     *
     * @tags Segments
     * @name GetSegmentById
     * @summary Get Segment
     * @request GET:/segments/{id}
     * @secure
     */
    getSegmentById: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/segments/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List of the authenticated athlete's starred segments. Private segments are filtered out unless requested by a token with read_all scope.
     *
     * @tags Segments
     * @name GetLoggedInAthleteStarredSegments
     * @summary List Starred Segments
     * @request GET:/segments/starred
     * @secure
     */
    getLoggedInAthleteStarredSegments: (
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/segments/starred`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.
     *
     * @tags Segments
     * @name StarSegment
     * @summary Star Segment
     * @request PUT:/segments/{id}/starred
     * @secure
     */
    starSegment: (
      id: number,
      data: {
        /**
         * If true, star the segment; if false, unstar the segment.
         * @default false
         */
        starred: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/segments/${id}/starred`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the top 10 segments matching a specified query.
     *
     * @tags Segments
     * @name ExploreSegments
     * @summary Explore segments
     * @request GET:/segments/explore
     * @secure
     */
    exploreSegments: (
      query: {
        /**
         * The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude]
         * @maxItems 4
         * @minItems 4
         */
        bounds: number[];
        /** Desired activity type. */
        activity_type?: "running" | "riding";
        /**
         * The minimum climbing category.
         * @min 0
         * @max 5
         */
        min_cat?: number;
        /**
         * The maximum climbing category.
         * @min 0
         * @max 5
         */
        max_cat?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/segments/explore`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the given segment's streams. Requires read_all scope for private segments.
     *
     * @tags Streams
     * @name GetSegmentStreams
     * @summary Get Segment Streams
     * @request GET:/segments/{id}/streams
     * @secure
     */
    getSegmentStreams: (
      id: number,
      query: {
        /**
         * The types of streams to return.
         * @minItems 1
         */
        keys: ("distance" | "latlng" | "altitude")[];
        /**
         * Must be true.
         * @default true
         */
        key_by_type: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/segments/${id}/streams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  segmentEfforts = {
    /**
     * @description Returns a set of the authenticated athlete's segment efforts for a given segment.  Requires subscription.
     *
     * @tags SegmentEfforts
     * @name GetEffortsBySegmentId
     * @summary List Segment Efforts
     * @request GET:/segment_efforts
     * @secure
     */
    getEffortsBySegmentId: (
      query: {
        /** The identifier of the segment. */
        segment_id: number;
        /**
         * ISO 8601 formatted date time.
         * @format date-time
         */
        start_date_local?: string;
        /**
         * ISO 8601 formatted date time.
         * @format date-time
         */
        end_date_local?: string;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/segment_efforts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a segment effort from an activity that is owned by the authenticated athlete. Requires subscription.
     *
     * @tags SegmentEfforts
     * @name GetSegmentEffortById
     * @summary Get Segment Effort
     * @request GET:/segment_efforts/{id}
     * @secure
     */
    getSegmentEffortById: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/segment_efforts/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a set of streams for a segment effort completed by the authenticated athlete. Requires read_all scope.
     *
     * @tags Streams
     * @name GetSegmentEffortStreams
     * @summary Get Segment Effort Streams
     * @request GET:/segment_efforts/{id}/streams
     * @secure
     */
    getSegmentEffortStreams: (
      id: number,
      query: {
        /**
         * The types of streams to return.
         * @minItems 1
         */
        keys: (
          | "time"
          | "distance"
          | "latlng"
          | "altitude"
          | "velocity_smooth"
          | "heartrate"
          | "cadence"
          | "watts"
          | "temp"
          | "moving"
          | "grade_smooth"
        )[];
        /**
         * Must be true.
         * @default true
         */
        key_by_type: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/segment_efforts/${id}/streams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  activities = {
    /**
     * @description Creates a manual activity for an athlete, requires activity:write scope.
     *
     * @tags Activities
     * @name CreateActivity
     * @summary Create an Activity
     * @request POST:/activities
     * @secure
     */
    createActivity: (
      data: {
        /** The name of the activity. */
        name: string;
        /** Type of activity. For example - Run, Ride etc. */
        type?: string;
        /** Sport type of activity. For example - Run, MountainBikeRide, Ride, etc. */
        sport_type: string;
        /**
         * ISO 8601 formatted date time.
         * @format date-time
         */
        start_date_local: string;
        /** In seconds. */
        elapsed_time: number;
        /** Description of the activity. */
        description?: string;
        /**
         * In meters.
         * @format float
         */
        distance?: number;
        /** Set to 1 to mark as a trainer activity. */
        trainer?: number;
        /** Set to 1 to mark as commute. */
        commute?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/activities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     *
     * @tags Activities
     * @name GetActivityById
     * @summary Get Activity
     * @request GET:/activities/{id}
     * @secure
     */
    getActivityById: (
      id: number,
      query?: {
        /** To include all segments efforts. */
        include_all_efforts?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/activities/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the given activity that is owned by the authenticated athlete. Requires activity:write. Also requires activity:read_all in order to update Only Me activities
     *
     * @tags Activities
     * @name UpdateActivityById
     * @summary Update Activity
     * @request PUT:/activities/{id}
     * @secure
     */
    updateActivityById: (id: number, body: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/activities/${id}`,
        method: "PUT",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     *
     * @tags Activities
     * @name GetLapsByActivityId
     * @summary List Activity Laps
     * @request GET:/activities/{id}/laps
     * @secure
     */
    getLapsByActivityId: (id: number, params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/activities/${id}/laps`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Summit Feature. Returns the zones of a given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     *
     * @tags Activities
     * @name GetZonesByActivityId
     * @summary Get Activity Zones
     * @request GET:/activities/{id}/zones
     * @secure
     */
    getZonesByActivityId: (id: number, params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/activities/${id}/zones`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     *
     * @tags Activities
     * @name GetCommentsByActivityId
     * @summary List Activity Comments
     * @request GET:/activities/{id}/comments
     * @secure
     */
    getCommentsByActivityId: (
      id: number,
      query?: {
        /** Deprecated. Prefer to use after_cursor. */
        page?: number;
        /**
         * Deprecated. Prefer to use page_size.
         * @default 30
         */
        per_page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        page_size?: number;
        /** Cursor of the last item in the previous page of results, used to request the subsequent page of results.  When omitted, the first page of results is fetched. */
        after_cursor?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/activities/${id}/comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
     *
     * @tags Activities
     * @name GetKudoersByActivityId
     * @summary List Activity Kudoers
     * @request GET:/activities/{id}/kudos
     * @secure
     */
    getKudoersByActivityId: (
      id: number,
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/activities/${id}/kudos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
     *
     * @tags Streams
     * @name GetActivityStreams
     * @summary Get Activity Streams
     * @request GET:/activities/{id}/streams
     * @secure
     */
    getActivityStreams: (
      id: number,
      query: {
        /**
         * Desired stream types.
         * @minItems 1
         */
        keys: (
          | "time"
          | "distance"
          | "latlng"
          | "altitude"
          | "velocity_smooth"
          | "heartrate"
          | "cadence"
          | "watts"
          | "temp"
          | "moving"
          | "grade_smooth"
        )[];
        /**
         * Must be true.
         * @default true
         */
        key_by_type: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/activities/${id}/streams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  clubs = {
    /**
     * @description Returns a given club using its identifier.
     *
     * @tags Clubs
     * @name GetClubById
     * @summary Get Club
     * @request GET:/clubs/{id}
     * @secure
     */
    getClubById: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/clubs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of the athletes who are members of a given club.
     *
     * @tags Clubs
     * @name GetClubMembersById
     * @summary List Club Members
     * @request GET:/clubs/{id}/members
     * @secure
     */
    getClubMembersById: (
      id: number,
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/clubs/${id}/members`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of the administrators of a given club.
     *
     * @tags Clubs
     * @name GetClubAdminsById
     * @summary List Club Administrators
     * @request GET:/clubs/{id}/admins
     * @secure
     */
    getClubAdminsById: (
      id: number,
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/clubs/${id}/admins`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve recent activities from members of a specific club. The authenticated athlete must belong to the requested club in order to hit this endpoint. Pagination is supported. Athlete profile visibility is respected for all activities.
     *
     * @tags Clubs
     * @name GetClubActivitiesById
     * @summary List Club Activities
     * @request GET:/clubs/{id}/activities
     * @secure
     */
    getClubActivitiesById: (
      id: number,
      query?: {
        /** Page number. Defaults to 1. */
        page?: number;
        /**
         * Number of items per page. Defaults to 30.
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any[], any>({
        path: `/clubs/${id}/activities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  gear = {
    /**
     * @description Returns an equipment using its identifier.
     *
     * @tags Gears
     * @name GetGearById
     * @summary Get Equipment
     * @request GET:/gear/{id}
     * @secure
     */
    getGearById: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/gear/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  routes = {
    /**
     * @description Returns a route using its identifier. Requires read_all scope for private routes.
     *
     * @tags Routes
     * @name GetRouteById
     * @summary Get Route
     * @request GET:/routes/{id}
     * @secure
     */
    getRouteById: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/routes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a GPX file of the route. Requires read_all scope for private routes.
     *
     * @tags Routes
     * @name GetRouteAsGpx
     * @summary Export Route GPX
     * @request GET:/routes/{id}/export_gpx
     * @secure
     */
    getRouteAsGpx: (id: number, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/routes/${id}/export_gpx`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns a TCX file of the route. Requires read_all scope for private routes.
     *
     * @tags Routes
     * @name GetRouteAsTcx
     * @summary Export Route TCX
     * @request GET:/routes/{id}/export_tcx
     * @secure
     */
    getRouteAsTcx: (id: number, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/routes/${id}/export_tcx`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns the given route's streams. Requires read_all scope for private routes.
     *
     * @tags Streams
     * @name GetRouteStreams
     * @summary Get Route Streams
     * @request GET:/routes/{id}/streams
     * @secure
     */
    getRouteStreams: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/routes/${id}/streams`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  uploads = {
    /**
     * @description Uploads a new data file to create an activity from. Requires activity:write scope.
     *
     * @tags Uploads
     * @name CreateUpload
     * @summary Upload Activity
     * @request POST:/uploads
     * @secure
     */
    createUpload: (
      data: {
        /**
         * The uploaded file.
         * @format binary
         */
        file?: File;
        /** The desired name of the resulting activity. */
        name?: string;
        /** The desired description of the resulting activity. */
        description?: string;
        /** Whether the resulting activity should be marked as having been performed on a trainer. */
        trainer?: string;
        /** Whether the resulting activity should be tagged as a commute. */
        commute?: string;
        /** The format of the uploaded file. */
        data_type?: "fit" | "fit.gz" | "tcx" | "tcx.gz" | "gpx" | "gpx.gz";
        /** The desired external identifier of the resulting activity. */
        external_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/uploads`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns an upload for a given identifier. Requires activity:write scope.
     *
     * @tags Uploads
     * @name GetUploadById
     * @summary Get Upload
     * @request GET:/uploads/{uploadId}
     * @secure
     */
    getUploadById: (uploadId: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/uploads/${uploadId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
