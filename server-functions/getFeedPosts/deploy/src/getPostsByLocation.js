"use strict";
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
exports.filterLocation = exports.getCountryPosts = exports.getCityPosts = exports.getNearbyPosts = void 0;
const getNearbyPosts = (collectionRef, searchParams) => __awaiter(void 0, void 0, void 0, function* () {
    const queryNearby = collectionRef
        .where('completed', '==', false)
        .where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
        .orderBy('createdAt', 'desc');
    return queryNearby.get()
        .then((snapshotNearby) => {
        const posts = [];
        const nearPostIds = [];
        snapshotNearby.forEach((doc) => {
            const docData = doc.data();
            posts.push(Object.assign(Object.assign({}, docData), { postId: doc.id }));
            nearPostIds.push(doc.id);
            // console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
        });
        return { nearbyPosts: posts, nearPostIds };
    })
        .catch((error) => {
        console.error('Error fetching nearby posts:', error);
        return { nearbyPosts: [], nearPostIds: [] };
    });
});
exports.getNearbyPosts = getNearbyPosts;
const getCityPosts = (collectionRef, searchParams, nearPostIds = []) => __awaiter(void 0, void 0, void 0, function* () {
    const queryCity = collectionRef
        .where('completed', '==', false)
        .where('location.city', '==', searchParams.city)
        .where('range', '==', 'city')
        .orderBy('createdAt', 'desc');
    return queryCity.get()
        .then((snapshotCity) => {
        const posts = [];
        const cityPostIds = [];
        snapshotCity.forEach((doc) => {
            if (!nearPostIds.includes(doc.id)) {
                const docData = doc.data();
                posts.push(Object.assign(Object.assign({}, docData), { postId: doc.id }));
                cityPostIds.push(doc.id);
                // console.log(`City: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
            }
        });
        return { cityPosts: posts, cityPostIds };
    })
        .catch((error) => {
        console.error('Error fetching city posts:', error);
        return { cityPosts: [], cityPostIds: [] };
    });
});
exports.getCityPosts = getCityPosts;
const getCountryPosts = (collectionRef, searchParams, nearPostIds = [], cityPostIds = []) => __awaiter(void 0, void 0, void 0, function* () {
    const countryQuery = collectionRef
        .where('completed', '==', false)
        .where('location.country', '==', searchParams.country)
        .where('range', '==', 'country')
        .orderBy('createdAt', 'desc');
    return countryQuery.get()
        .then((snapshotCountry) => {
        const posts = [];
        snapshotCountry.forEach((doc) => {
            if (!nearPostIds.includes(doc.id) && !cityPostIds.includes(doc.id)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
                const docData = doc.data();
                posts.push(Object.assign(Object.assign({}, docData), { postId: doc.id }));
                // console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
            }
        });
        return posts;
    })
        .catch((error) => {
        console.error('Error fetching city posts:', error);
        return [];
    });
});
exports.getCountryPosts = getCountryPosts;
const filterLocation = (posts, userId) => {
    return posts.map((post) => {
        let currentPost = Object.assign({}, post);
        if (post.locationView === 'private' && post.owner.userId !== userId) {
            currentPost.location = {};
        }
        if (post.locationView === 'approximate') {
            currentPost.location.coordinates = {
                latitude: currentPost.location.coordinates.latitude + getRandomDetachment(),
                longitude: currentPost.location.coordinates.longitude + getRandomDetachment()
            };
        }
        return currentPost;
    });
};
exports.filterLocation = filterLocation;
const getRandomDetachment = () => {
    const approximateRadius = 400;
    const binaryRandom = Math.round(Math.random());
    const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000;
    if (binaryRandom) {
        return (approximateRadius * detachmentRandom);
    }
    return -(approximateRadius * detachmentRandom);
};
