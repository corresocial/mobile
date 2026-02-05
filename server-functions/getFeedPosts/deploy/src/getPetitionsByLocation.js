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
exports.getNearbyPetitions = getNearbyPetitions;
exports.getCityPetitions = getCityPetitions;
exports.getCountryPetitions = getCountryPetitions;
function getNearbyPetitions(collectionRef, searchParams, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryNearby = collectionRef
            .where('completed', '==', false)
            .where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
            .orderBy('createdAt', 'desc');
        return queryNearby.get()
            .then((snapshotNearby) => {
            const petitions = [];
            const nearPetitionIds = [];
            snapshotNearby.forEach((doc) => {
                const docData = doc.data();
                if (!(docData.idUsersResponded || []).includes(userId)) {
                    petitions.push(Object.assign(Object.assign({}, docData), { petitionId: doc.id }));
                    nearPetitionIds.push(doc.id);
                    // console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().petitionType}`)
                }
            });
            return { nearbyPetitions: petitions, nearPetitionIds };
        })
            .catch((error) => {
            console.error('Error fetching nearby petitions:', error);
            return { nearbyPetitions: [], nearPetitionIds: [] };
        });
    });
}
function getCityPetitions(collectionRef_1, searchParams_1, userId_1) {
    return __awaiter(this, arguments, void 0, function* (collectionRef, searchParams, userId, nearPetitionIds = []) {
        const queryCity = collectionRef
            .where('completed', '==', false)
            .where('location.city', '==', searchParams.city)
            .where('range', '==', 'city')
            .orderBy('createdAt', 'desc');
        return queryCity.get()
            .then((snapshotCity) => {
            const petitions = [];
            const cityPetitionIds = [];
            snapshotCity.forEach((doc) => {
                const docData = doc.data();
                if (!nearPetitionIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) {
                    petitions.push(Object.assign(Object.assign({}, docData), { petitionId: doc.id }));
                    cityPetitionIds.push(doc.id);
                    // console.log(`City: ${doc.data().title} - ${doc.data().range}`)
                }
            });
            return { cityPetitions: petitions, cityPetitionIds };
        })
            .catch((error) => {
            console.error('Error fetching city petitions:', error);
            return { cityPetitions: [], cityPetitionIds: [] };
        });
    });
}
function getCountryPetitions(collectionRef_1, searchParams_1, userId_1) {
    return __awaiter(this, arguments, void 0, function* (collectionRef, searchParams, userId, nearPetitionIds = [], cityPetitionIds = []) {
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
                if (!nearPetitionIds.includes(doc.id) && !cityPetitionIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
                    posts.push(Object.assign(Object.assign({}, docData), { petitionId: doc.id }));
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
