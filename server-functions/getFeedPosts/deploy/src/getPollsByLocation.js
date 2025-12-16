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
exports.getCountryPolls = exports.getCityPolls = exports.getNearbyPolls = void 0;
function getNearbyPolls(collectionRef, searchParams, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryNearby = collectionRef
            .where('completed', '==', false)
            .where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
            .orderBy('createdAt', 'desc');
        return queryNearby.get()
            .then((snapshotNearby) => {
            const polls = [];
            const nearPollIds = [];
            snapshotNearby.forEach((doc) => {
                const docData = doc.data();
                if (!(docData.idUsersResponded || []).includes(userId)) {
                    polls.push(Object.assign(Object.assign({}, docData), { pollId: doc.id }));
                    nearPollIds.push(doc.id);
                    // console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().pollType}`)
                }
            });
            return { nearbyPolls: polls, nearPollIds };
        })
            .catch((error) => {
            console.error('Error fetching nearby polls:', error);
            return { nearbyPolls: [], nearPollIds: [] };
        });
    });
}
exports.getNearbyPolls = getNearbyPolls;
function getCityPolls(collectionRef, searchParams, userId, nearPollIds = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryCity = collectionRef
            .where('completed', '==', false)
            .where('location.city', '==', searchParams.city)
            .where('range', '==', 'city')
            .orderBy('createdAt', 'desc');
        return queryCity.get()
            .then((snapshotCity) => {
            const polls = [];
            const cityPollIds = [];
            snapshotCity.forEach((doc) => {
                const docData = doc.data();
                if (!nearPollIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) {
                    polls.push(Object.assign(Object.assign({}, docData), { pollId: doc.id }));
                    cityPollIds.push(doc.id);
                    // console.log(`City: ${doc.data().title} - ${doc.data().range}`)
                }
            });
            return { cityPolls: polls, cityPollIds };
        })
            .catch((error) => {
            console.error('Error fetching city polls:', error);
            return { cityPolls: [], cityPollIds: [] };
        });
    });
}
exports.getCityPolls = getCityPolls;
function getCountryPolls(collectionRef, searchParams, userId, nearPollIds = [], cityPollIds = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const countryQuery = collectionRef
            .where('completed', '==', false)
            .where('location.country', '==', searchParams.country)
            .where('range', '==', 'country')
            .orderBy('createdAt', 'desc');
        return countryQuery.get()
            .then((snapshotCountry) => {
            const posts = [];
            snapshotCountry.forEach((doc) => {
                const docData = doc.data();
                if (!nearPollIds.includes(doc.id) && !cityPollIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
                    posts.push(Object.assign(Object.assign({}, docData), { pollId: doc.id }));
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
}
exports.getCountryPolls = getCountryPolls;
