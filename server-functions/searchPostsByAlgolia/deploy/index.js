"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPostsByAlgolia = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const algoliasearch_1 = __importDefault(require("algoliasearch"));
// Prevent "App already exists" errors
if (!admin.apps.length) {
    admin.initializeApp();
}
const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_KEY = process.env.ALGOLIA_KEY;
const client = (0, algoliasearch_1.default)(ALGOLIA_ID, ALGOLIA_KEY);
const postsIndex = client.initIndex('postsIndex');
const searchFilters_1 = require("./src/searchFilters");
exports.searchPostsByAlgolia = (0, https_1.onCall)((request) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. SECURITY: Authenticated users only
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'User must be logged in to search.');
    }
    try {
        // 2. INPUT: Get data from request.data (v2 Callable)
        const { searchText, searchParams, searchByRange } = request.data;
        // Securely get userId from the auth token, not the body
        const userId = request.auth.uid;
        const searchFilters = {
            completedFilter: '',
            cityFilter: '',
            countryFilter: '',
            postTypeFilter: '',
            geohashFilter: '',
            geohashExceptionFilter: '',
            macroCategoryFilter: '',
            categoryFilter: '',
            tagFilter: '',
        };
        searchFilters.completedFilter = (0, searchFilters_1.getPostCompletedFilter)();
        if (searchByRange) {
            const geohashField = 'geohashNearby';
            searchFilters.geohashFilter = searchParams.range === 'near' ? (0, searchFilters_1.getGeohashFilter)(searchParams.geohashes, geohashField) : '';
            searchFilters.cityFilter = searchParams.range === 'city' ? (0, searchFilters_1.getRangeFilter)('city', searchParams.city, searchParams.country) : '';
            searchFilters.countryFilter = searchParams.range === 'country' ? (0, searchFilters_1.getRangeFilter)('country', searchParams.country, searchParams.country) : '';
        }
        else {
            const geohashField = 'geohashNearby';
            searchFilters.postTypeFilter = (0, searchFilters_1.getPostTypeFilter)(searchParams.postType);
            searchFilters.geohashFilter = (0, searchFilters_1.getGeohashFilter)(searchParams.geohashes, geohashField);
            searchFilters.geohashExceptionFilter = (0, searchFilters_1.getGeohashFilter)(searchParams.geohashes, geohashField, true);
            searchFilters.cityFilter = (0, searchFilters_1.getRangeFilter)('city', searchParams.city, searchParams.country);
            searchFilters.countryFilter = (0, searchFilters_1.getRangeFilter)('country', searchParams.country, searchParams.country);
            searchFilters.macroCategoryFilter = (0, searchFilters_1.getMacroCategoryFilter)(searchParams.macroCategory);
            searchFilters.categoryFilter = (0, searchFilters_1.getCategoryFilter)(searchParams.category);
            searchFilters.tagFilter = (0, searchFilters_1.getTagFilter)(searchParams.tag);
        }
        const results = yield Promise.all(searchByRange
            ? [
                searchParams.range === 'near' && (yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.geohashFilter}`
                })),
                searchParams.range === 'city' && (yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.cityFilter}`
                })),
                searchParams.range === 'country' && (yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.countryFilter}`
                }))
            ]
            : [
                yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashFilter} ${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
                }),
                yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND ${searchFilters.cityFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
                }),
                yield postsIndex.search(searchText, {
                    filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND  ${searchFilters.countryFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
                })
            ])
            .then((responses) => responses.reduce((acc, result) => {
            // Check strictly for boolean false since we used short-circuiting (&&) above
            if (result && typeof result !== 'boolean' && result.hits && result.hits.length > 0) {
                const structuredPosts = result.hits.map((record) => {
                    const postData = (0, searchFilters_1.structurePostObject)(record);
                    return postData;
                });
                return [...acc, ...structuredPosts];
            }
            return acc;
        }, []));
        const postsWithLocationFilter = (0, searchFilters_1.filterLocation)(results, userId);
        const filteredPosts = (0, searchFilters_1.removeDuplicatesByPostId)(postsWithLocationFilter);
        const postsByRange = (0, searchFilters_1.spreadPostsByRange)(filteredPosts);
        // 3. RETURN: Directly return data (no res.status needed)
        return postsByRange;
    }
    catch (err) {
        console.error('Error searching Algolia:', err);
        throw new https_1.HttpsError('internal', 'Unable to search posts', err);
    }
}));
