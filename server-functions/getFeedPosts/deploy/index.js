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
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(require('./cred-dev.json')) });
const getPostsByLocation_1 = require("./src/getPostsByLocation");
const getPollsByLocation_1 = require("./src/getPollsByLocation");
const getPetitionsByLocation_1 = require("./src/getPetitionsByLocation");
// async function getFeedPosts(data: any) {
exports.getFeedPosts = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getNewDate = (date) => {
        if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
            const { _seconds, seconds } = date;
            if (seconds) {
                return new Date(seconds * 1000);
            }
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
    try {
        const collectionRef = firebase_admin_1.default.firestore().collection('posts');
        const pollCollectionRef = firebase_admin_1.default.firestore().collection('polls');
        const petitionCollectionRef = firebase_admin_1.default.firestore().collection('petitions');
        // const { searchParams, userId }: RequestBody = data
        const { searchParams, userId } = req.body;
        const { nearbyPosts, nearPostIds } = yield (0, getPostsByLocation_1.getNearbyPosts)(collectionRef, searchParams);
        const { cityPosts, cityPostIds } = yield (0, getPostsByLocation_1.getCityPosts)(collectionRef, searchParams, nearPostIds);
        const countryPosts = yield (0, getPostsByLocation_1.getCountryPosts)(collectionRef, searchParams, nearPostIds, cityPostIds);
        console.log('searchParams.searchLeaderPosts');
        console.log(searchParams.searchLeaderPosts);
        const { nearbyPolls, nearPollIds } = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getNearbyPolls)(pollCollectionRef, searchParams, userId)
            : { nearbyPolls: [], nearPollIds: [] };
        const { cityPolls, cityPollIds } = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getCityPolls)(pollCollectionRef, searchParams, userId, nearPollIds)
            : { cityPolls: [], cityPollIds: [] };
        const countryPolls = searchParams.searchLeaderPosts
            ? yield (0, getPollsByLocation_1.getCountryPolls)(pollCollectionRef, searchParams, userId, cityPollIds)
            : [];
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
        // return completeFeed
        return res.status(200).send(completeFeed);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            nearby: [],
            city: [],
            country: []
        });
    }
    // }
}));
/* const main = async () => {
    const request: RequestBody = {
        searchParams: {
            searchLeaderPosts: true,
            city: "Londrina",
            country: "Brasil",
            geohashes: ["6gge7g", "6gge7u", "6ggekh", "6ggek5", "6ggek4", "[6gge7f]", "[6gge7d]", "6gge7e", "6gge7s"]
        },
        userId: 'gubzWyXdQFeC5xEaWlTtbaR64tT2'
    }

    const polls = await getFeedPosts(request)
    console.log('--------------------------------------')
    console.log('NEAR')
    polls?.nearby.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
    console.log('CITY')
    polls?.city.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
    console.log('COUNTRY')
    polls?.country.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
    console.log('--------------------------------------')
}

main() */ 
