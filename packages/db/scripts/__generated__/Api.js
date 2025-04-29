"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (exports.ContentType = ContentType = {}));
var HttpClient = /** @class */ (function () {
    function HttpClient(apiConfig) {
        var _a;
        if (apiConfig === void 0) { apiConfig = {}; }
        var _this = this;
        this.baseUrl = "https://www.strava.com/api/v3";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = function () {
            var fetchParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fetchParams[_i] = arguments[_i];
            }
            return fetch.apply(void 0, fetchParams);
        };
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = function (data) {
            _this.securityData = data;
        };
        this.contentFormatters = (_a = {},
            _a[ContentType.Json] = function (input) {
                return input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input;
            },
            _a[ContentType.Text] = function (input) { return (input !== null && typeof input !== "string" ? JSON.stringify(input) : input); },
            _a[ContentType.FormData] = function (input) {
                return Object.keys(input || {}).reduce(function (formData, key) {
                    var property = input[key];
                    formData.append(key, property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                            ? JSON.stringify(property)
                            : "".concat(property));
                    return formData;
                }, new FormData());
            },
            _a[ContentType.UrlEncoded] = function (input) { return _this.toQueryString(input); },
            _a);
        this.createAbortSignal = function (cancelToken) {
            if (_this.abortControllers.has(cancelToken)) {
                var abortController_1 = _this.abortControllers.get(cancelToken);
                if (abortController_1) {
                    return abortController_1.signal;
                }
                return void 0;
            }
            var abortController = new AbortController();
            _this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = function (cancelToken) {
            var abortController = _this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                _this.abortControllers.delete(cancelToken);
            }
        };
        this.request = function (_a) { return __awaiter(_this, void 0, void 0, function () {
            var secureParams, _b, requestParams, queryString, payloadFormatter, responseFormat;
            var _this = this;
            var body = _a.body, secure = _a.secure, path = _a.path, type = _a.type, query = _a.query, format = _a.format, baseUrl = _a.baseUrl, cancelToken = _a.cancelToken, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                            this.securityWorker;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.securityWorker(this.securityData)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        secureParams = (_b) ||
                            {};
                        requestParams = this.mergeRequestParams(params, secureParams);
                        queryString = query && this.toQueryString(query);
                        payloadFormatter = this.contentFormatters[type || ContentType.Json];
                        responseFormat = format || requestParams.format;
                        return [2 /*return*/, this.customFetch("".concat(baseUrl || this.baseUrl || "").concat(path).concat(queryString ? "?".concat(queryString) : ""), __assign(__assign({}, requestParams), { headers: __assign(__assign({}, (requestParams.headers || {})), (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null, body: typeof body === "undefined" || body === null ? null : payloadFormatter(body) })).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var r, data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            r = response.clone();
                                            r.data = null;
                                            r.error = null;
                                            if (!!responseFormat) return [3 /*break*/, 1];
                                            _a = r;
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, response[responseFormat]()
                                                .then(function (data) {
                                                if (r.ok) {
                                                    r.data = data;
                                                }
                                                else {
                                                    r.error = data;
                                                }
                                                return r;
                                            })
                                                .catch(function (e) {
                                                r.error = e;
                                                return r;
                                            })];
                                        case 2:
                                            _a = _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            data = _a;
                                            if (cancelToken) {
                                                this.abortControllers.delete(cancelToken);
                                            }
                                            if (!response.ok)
                                                throw data;
                                            return [2 /*return*/, data];
                                    }
                                });
                            }); })];
                }
            });
        }); };
        Object.assign(this, apiConfig);
    }
    HttpClient.prototype.encodeQueryParam = function (key, value) {
        var encodedKey = encodeURIComponent(key);
        return "".concat(encodedKey, "=").concat(encodeURIComponent(typeof value === "number" ? value : "".concat(value)));
    };
    HttpClient.prototype.addQueryParam = function (query, key) {
        return this.encodeQueryParam(key, query[key]);
    };
    HttpClient.prototype.addArrayQueryParam = function (query, key) {
        var _this = this;
        var value = query[key];
        return value.map(function (v) { return _this.encodeQueryParam(key, v); }).join("&");
    };
    HttpClient.prototype.toQueryString = function (rawQuery) {
        var _this = this;
        var query = rawQuery || {};
        var keys = Object.keys(query).filter(function (key) { return "undefined" !== typeof query[key]; });
        return keys
            .map(function (key) { return (Array.isArray(query[key]) ? _this.addArrayQueryParam(query, key) : _this.addQueryParam(query, key)); })
            .join("&");
    };
    HttpClient.prototype.addQueryParams = function (rawQuery) {
        var queryString = this.toQueryString(rawQuery);
        return queryString ? "?".concat(queryString) : "";
    };
    HttpClient.prototype.mergeRequestParams = function (params1, params2) {
        return __assign(__assign(__assign(__assign({}, this.baseApiParams), params1), (params2 || {})), { headers: __assign(__assign(__assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
/**
 * @title Strava API v3
 * @version 3.0.0
 * @baseUrl https://www.strava.com/api/v3
 *
 * The [Swagger Playground](https://developers.strava.com/playground) is the easiest way to familiarize yourself with the Strava API by submitting HTTP requests and observing the responses before you write any client code. It will show what a response will look like with different endpoints depending on the authorization scope you receive from your athletes. To use the Playground, go to https://www.strava.com/settings/api and change your “Authorization Callback Domain” to developers.strava.com. Please note, we only support Swagger 2.0. There is a known issue where you can only select one scope at a time. For more information, please check the section “client code” at https://developers.strava.com/docs.
 */
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.athletes = {
            /**
             * @description Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
             *
             * @tags Athletes
             * @name GetStats
             * @summary Get Athlete Stats
             * @request GET:/athletes/{id}/stats
             * @secure
             */
            getStats: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athletes/".concat(id, "/stats"), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
             *
             * @tags Routes
             * @name GetRoutesByAthleteId
             * @summary List Athlete Routes
             * @request GET:/athletes/{id}/routes
             * @secure
             */
            getRoutesByAthleteId: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athletes/".concat(id, "/routes"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.athlete = {
            /**
             * @description Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
             *
             * @tags Athletes
             * @name GetLoggedInAthlete
             * @summary Get Authenticated Athlete
             * @request GET:/athlete
             * @secure
             */
            getLoggedInAthlete: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athlete", method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Update the currently authenticated athlete. Requires profile:write scope.
             *
             * @tags Athletes
             * @name UpdateLoggedInAthlete
             * @summary Update Athlete
             * @request PUT:/athlete
             * @secure
             */
            updateLoggedInAthlete: function (weight, data, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athlete", method: "PUT", body: data, secure: true, type: ContentType.FormData, format: "json" }, params));
            },
            /**
             * @description Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
             *
             * @tags Athletes
             * @name GetLoggedInAthleteZones
             * @summary Get Zones
             * @request GET:/athlete/zones
             * @secure
             */
            getLoggedInAthleteZones: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athlete/zones", method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns the activities of an athlete for a specific identifier. Requires activity:read. Only Me activities will be filtered out unless requested by a token with activity:read_all.
             *
             * @tags Activities
             * @name GetLoggedInAthleteActivities
             * @summary List Athlete Activities
             * @request GET:/athlete/activities
             * @secure
             */
            getLoggedInAthleteActivities: function (query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athlete/activities", method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a list of the clubs whose membership includes the authenticated athlete.
             *
             * @tags Clubs
             * @name GetLoggedInAthleteClubs
             * @summary List Athlete Clubs
             * @request GET:/athlete/clubs
             * @secure
             */
            getLoggedInAthleteClubs: function (query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/athlete/clubs", method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.segments = {
            /**
             * @description Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.
             *
             * @tags Segments
             * @name GetSegmentById
             * @summary Get Segment
             * @request GET:/segments/{id}
             * @secure
             */
            getSegmentById: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segments/".concat(id), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description List of the authenticated athlete's starred segments. Private segments are filtered out unless requested by a token with read_all scope.
             *
             * @tags Segments
             * @name GetLoggedInAthleteStarredSegments
             * @summary List Starred Segments
             * @request GET:/segments/starred
             * @secure
             */
            getLoggedInAthleteStarredSegments: function (query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segments/starred", method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.
             *
             * @tags Segments
             * @name StarSegment
             * @summary Star Segment
             * @request PUT:/segments/{id}/starred
             * @secure
             */
            starSegment: function (id, data, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segments/".concat(id, "/starred"), method: "PUT", body: data, secure: true, type: ContentType.FormData, format: "json" }, params));
            },
            /**
             * @description Returns the top 10 segments matching a specified query.
             *
             * @tags Segments
             * @name ExploreSegments
             * @summary Explore segments
             * @request GET:/segments/explore
             * @secure
             */
            exploreSegments: function (query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segments/explore", method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns the given segment's streams. Requires read_all scope for private segments.
             *
             * @tags Streams
             * @name GetSegmentStreams
             * @summary Get Segment Streams
             * @request GET:/segments/{id}/streams
             * @secure
             */
            getSegmentStreams: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segments/".concat(id, "/streams"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.segmentEfforts = {
            /**
             * @description Returns a set of the authenticated athlete's segment efforts for a given segment.  Requires subscription.
             *
             * @tags SegmentEfforts
             * @name GetEffortsBySegmentId
             * @summary List Segment Efforts
             * @request GET:/segment_efforts
             * @secure
             */
            getEffortsBySegmentId: function (query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segment_efforts", method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a segment effort from an activity that is owned by the authenticated athlete. Requires subscription.
             *
             * @tags SegmentEfforts
             * @name GetSegmentEffortById
             * @summary Get Segment Effort
             * @request GET:/segment_efforts/{id}
             * @secure
             */
            getSegmentEffortById: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segment_efforts/".concat(id), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a set of streams for a segment effort completed by the authenticated athlete. Requires read_all scope.
             *
             * @tags Streams
             * @name GetSegmentEffortStreams
             * @summary Get Segment Effort Streams
             * @request GET:/segment_efforts/{id}/streams
             * @secure
             */
            getSegmentEffortStreams: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/segment_efforts/".concat(id, "/streams"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.activities = {
            /**
             * @description Creates a manual activity for an athlete, requires activity:write scope.
             *
             * @tags Activities
             * @name CreateActivity
             * @summary Create an Activity
             * @request POST:/activities
             * @secure
             */
            createActivity: function (data, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities", method: "POST", body: data, secure: true, type: ContentType.UrlEncoded, format: "json" }, params));
            },
            /**
             * @description Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
             *
             * @tags Activities
             * @name GetActivityById
             * @summary Get Activity
             * @request GET:/activities/{id}
             * @secure
             */
            getActivityById: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id), method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Updates the given activity that is owned by the authenticated athlete. Requires activity:write. Also requires activity:read_all in order to update Only Me activities
             *
             * @tags Activities
             * @name UpdateActivityById
             * @summary Update Activity
             * @request PUT:/activities/{id}
             * @secure
             */
            updateActivityById: function (id, body, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id), method: "PUT", body: body, secure: true, type: ContentType.Json, format: "json" }, params));
            },
            /**
             * @description Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
             *
             * @tags Activities
             * @name GetLapsByActivityId
             * @summary List Activity Laps
             * @request GET:/activities/{id}/laps
             * @secure
             */
            getLapsByActivityId: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id, "/laps"), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Summit Feature. Returns the zones of a given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
             *
             * @tags Activities
             * @name GetZonesByActivityId
             * @summary Get Activity Zones
             * @request GET:/activities/{id}/zones
             * @secure
             */
            getZonesByActivityId: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id, "/zones"), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
             *
             * @tags Activities
             * @name GetCommentsByActivityId
             * @summary List Activity Comments
             * @request GET:/activities/{id}/comments
             * @secure
             */
            getCommentsByActivityId: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id, "/comments"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
             *
             * @tags Activities
             * @name GetKudoersByActivityId
             * @summary List Activity Kudoers
             * @request GET:/activities/{id}/kudos
             * @secure
             */
            getKudoersByActivityId: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id, "/kudos"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
             *
             * @tags Streams
             * @name GetActivityStreams
             * @summary Get Activity Streams
             * @request GET:/activities/{id}/streams
             * @secure
             */
            getActivityStreams: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/activities/".concat(id, "/streams"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.clubs = {
            /**
             * @description Returns a given club using its identifier.
             *
             * @tags Clubs
             * @name GetClubById
             * @summary Get Club
             * @request GET:/clubs/{id}
             * @secure
             */
            getClubById: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/clubs/".concat(id), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a list of the athletes who are members of a given club.
             *
             * @tags Clubs
             * @name GetClubMembersById
             * @summary List Club Members
             * @request GET:/clubs/{id}/members
             * @secure
             */
            getClubMembersById: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/clubs/".concat(id, "/members"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a list of the administrators of a given club.
             *
             * @tags Clubs
             * @name GetClubAdminsById
             * @summary List Club Administrators
             * @request GET:/clubs/{id}/admins
             * @secure
             */
            getClubAdminsById: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/clubs/".concat(id, "/admins"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
            /**
             * @description Retrieve recent activities from members of a specific club. The authenticated athlete must belong to the requested club in order to hit this endpoint. Pagination is supported. Athlete profile visibility is respected for all activities.
             *
             * @tags Clubs
             * @name GetClubActivitiesById
             * @summary List Club Activities
             * @request GET:/clubs/{id}/activities
             * @secure
             */
            getClubActivitiesById: function (id, query, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/clubs/".concat(id, "/activities"), method: "GET", query: query, secure: true, format: "json" }, params));
            },
        };
        _this.gear = {
            /**
             * @description Returns an equipment using its identifier.
             *
             * @tags Gears
             * @name GetGearById
             * @summary Get Equipment
             * @request GET:/gear/{id}
             * @secure
             */
            getGearById: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/gear/".concat(id), method: "GET", secure: true, format: "json" }, params));
            },
        };
        _this.routes = {
            /**
             * @description Returns a route using its identifier. Requires read_all scope for private routes.
             *
             * @tags Routes
             * @name GetRouteById
             * @summary Get Route
             * @request GET:/routes/{id}
             * @secure
             */
            getRouteById: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/routes/".concat(id), method: "GET", secure: true, format: "json" }, params));
            },
            /**
             * @description Returns a GPX file of the route. Requires read_all scope for private routes.
             *
             * @tags Routes
             * @name GetRouteAsGpx
             * @summary Export Route GPX
             * @request GET:/routes/{id}/export_gpx
             * @secure
             */
            getRouteAsGpx: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/routes/".concat(id, "/export_gpx"), method: "GET", secure: true }, params));
            },
            /**
             * @description Returns a TCX file of the route. Requires read_all scope for private routes.
             *
             * @tags Routes
             * @name GetRouteAsTcx
             * @summary Export Route TCX
             * @request GET:/routes/{id}/export_tcx
             * @secure
             */
            getRouteAsTcx: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/routes/".concat(id, "/export_tcx"), method: "GET", secure: true }, params));
            },
            /**
             * @description Returns the given route's streams. Requires read_all scope for private routes.
             *
             * @tags Streams
             * @name GetRouteStreams
             * @summary Get Route Streams
             * @request GET:/routes/{id}/streams
             * @secure
             */
            getRouteStreams: function (id, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/routes/".concat(id, "/streams"), method: "GET", secure: true, format: "json" }, params));
            },
        };
        _this.uploads = {
            /**
             * @description Uploads a new data file to create an activity from. Requires activity:write scope.
             *
             * @tags Uploads
             * @name CreateUpload
             * @summary Upload Activity
             * @request POST:/uploads
             * @secure
             */
            createUpload: function (data, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/uploads", method: "POST", body: data, secure: true, type: ContentType.FormData, format: "json" }, params));
            },
            /**
             * @description Returns an upload for a given identifier. Requires activity:write scope.
             *
             * @tags Uploads
             * @name GetUploadById
             * @summary Get Upload
             * @request GET:/uploads/{uploadId}
             * @secure
             */
            getUploadById: function (uploadId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/uploads/".concat(uploadId), method: "GET", secure: true, format: "json" }, params));
            },
        };
        return _this;
    }
    return Api;
}(HttpClient));
exports.Api = Api;
