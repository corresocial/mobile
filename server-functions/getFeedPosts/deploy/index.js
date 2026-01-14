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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedPosts = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
// Prevent "App already exists" errors during hot-reload or cold starts
if (!admin.apps.length) {
    admin.initializeApp();
}
const getPostsByLocation_1 = require("./src/getPostsByLocation");
const getPollsByLocation_1 = require("./src/getPollsByLocation");
const getPetitionsByLocation_1 = require("./src/getPetitionsByLocation");
// Helper functions moved outside to keep the main logic clean
const getNewDate = (date) => {
    if (date && (typeof date === 'object') && ('seconds' in date || '_seconds' in date)) {
        const { _seconds, seconds } = date;
        if (seconds)
            return new Date(seconds * 1000);
        return new Date(_seconds * 1000);
    }
    return new Date(date);
};
const sortByCreatedAt = (a, b) => {
    const createdAtA = getNewDate(a.createdAt);
    const createdAtB = getNewDate(b.createdAt);
    if (createdAtA < createdAtB)
        return 1;
    if (createdAtA > createdAtB)
        return -1;
    return 0;
};
exports.getFeedPosts = (0, https_1.onCall)((request) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. SECURITY: Ensure user is authenticated
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }
    try {
        const collectionRef = admin.firestore().collection('posts');
        const pollCollectionRef = admin.firestore().collection('polls');
        const petitionCollectionRef = admin.firestore().collection('petitions');
        // 2. INPUT: Get data from 'request.data' instead of 'req.body'
        // We do NOT take userId from body anymore for security reasons.
        const { searchParams } = request.data;
        const userId = request.auth.uid; // Securely get the logged-in user's ID
        // 3. LOGIC: Existing logic remains the same
        const { nearbyPosts, nearPostIds } = yield (0, getPostsByLocation_1.getNearbyPosts)(collectionRef, searchParams);
        const { cityPosts, cityPostIds } = yield (0, getPostsByLocation_1.getCityPosts)(collectionRef, searchParams, nearPostIds);
        const countryPosts = yield (0, getPostsByLocation_1.getCountryPosts)(collectionRef, searchParams, nearPostIds, cityPostIds);
        // Polls Logic
        const { nearbyPolls, nearPollIds } = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getNearbyPolls)(pollCollectionRef, searchParams, userId)
            : { nearbyPolls: [], nearPollIds: [] };
        const { cityPolls, cityPollIds } = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getCityPolls)(pollCollectionRef, searchParams, userId, nearPollIds)
            : { cityPolls: [], cityPollIds: [] };
        const countryPolls = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getCountryPolls)(pollCollectionRef, searchParams, userId, cityPollIds)
            : [];
        // Petitions Logic
        const { nearbyPetitions, nearPetitionIds } = searchParams.searchLeaderPosts
            ? yield (0, getPetitionsByLocation_1.getNearbyPetitions)(petitionCollectionRef, searchParams, userId)
            : { nearbyPetitions: [], nearPetitionIds: [] };
        const { cityPetitions, cityPetitionIds } = searchParams.searchLeaderPosts
            ? yield (0, getPetitionsByLocation_1.getCityPetitions)(petitionCollectionRef, searchParams, userId, nearPetitionIds)
            : { cityPetitions: [], cityPetitionIds: [] };
        const countryPetitions = searchParams.searchLeaderPosts
            ? yield (0, getPetitionsByLocation_1.getCountryPetitions)(petitionCollectionRef, searchParams, userId, cityPetitionIds)
            : [];
        const postsWithLocationFilter = {
            nearby: (0, getPostsByLocation_1.filterLocation)(nearbyPosts, userId),
            city: (0, getPostsByLocation_1.filterLocation)(cityPosts, userId),
            country: (0, getPostsByLocation_1.filterLocation)(countryPosts, userId)
        };
        const completeFeed = {
            nearby: [...postsWithLocationFilter.nearby, ...nearbyPolls, ...nearbyPetitions].sort(sortByCreatedAt),
            city: [...postsWithLocationFilter.city, ...cityPolls, ...cityPetitions].sort(sortByCreatedAt),
            country: [...postsWithLocationFilter.country, ...countryPolls, ...countryPetitions].sort(sortByCreatedAt)
        };
        return completeFeed;
    }
    catch (err) {
        console.error("Error fetching feed:", err);
        // Throw a structured error that the client SDK can catch
        throw new https_1.HttpsError('internal', 'Unable to fetch feed posts', err);
    }
}));
