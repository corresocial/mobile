"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLocation = exports.structurePostObject = exports.getTagFilter = exports.getCategoryFilter = exports.getMacroCategoryFilter = exports.getRangeFilter = exports.getGeohashFilter = exports.getPostTypeFilter = exports.getPostCompletedFilter = exports.spreadPostsByRange = exports.removeDuplicatesByPostId = void 0;
const removeDuplicatesByPostId = (results) => {
    return results.filter((post, index, self) => index === self.findIndex((p) => p.postId === post.postId));
};
exports.removeDuplicatesByPostId = removeDuplicatesByPostId;
const spreadPostsByRange = (posts) => {
    const result = {
        nearby: [],
        city: [],
        country: []
    };
    posts.forEach((post) => {
        if (post.range === 'near') {
            result.nearby.push(post);
        }
        else if (post.range === 'city') {
            result.city.push(post);
        }
        else if (post.range === 'country') {
            result.country.push(post);
        }
    });
    return result;
};
exports.spreadPostsByRange = spreadPostsByRange;
const getPostCompletedFilter = () => {
    return '(completed:false) AND ';
};
exports.getPostCompletedFilter = getPostCompletedFilter;
const getPostTypeFilter = (postType) => {
    return `postType:${postType}`;
};
exports.getPostTypeFilter = getPostTypeFilter;
const getGeohashFilter = (geohashes, geohashField, negativeClause) => {
    return geohashes.reduce((geohashQuery, geohash) => {
        if (geohash === geohashes[geohashes.length - 1]) {
            return `(${geohashQuery}${negativeClause ? 'NOT' : ''}location.${geohashField}:${geohash})`;
        }
        return `${geohashQuery}${negativeClause ? 'NOT' : ''} location.${geohashField}:${geohash} OR `;
    }, '');
};
exports.getGeohashFilter = getGeohashFilter;
const getRangeFilter = (range, city, country) => {
    if (range === 'nearby' || range === 'city')
        return ` (range:city OR range:country) AND location.city:'${city}'`;
    if (range === 'country')
        return `range:${range} AND location.country:'${country}'`;
    return '';
};
exports.getRangeFilter = getRangeFilter;
const getMacroCategoryFilter = (macroCategory) => {
    if (!macroCategory)
        return '';
    return ` AND macroCategory:${macroCategory}`;
};
exports.getMacroCategoryFilter = getMacroCategoryFilter;
const getCategoryFilter = (category) => {
    if (!category)
        return '';
    return ` AND category:${category}`;
};
exports.getCategoryFilter = getCategoryFilter;
const getTagFilter = (tag) => {
    if (!tag)
        return '';
    return ` AND tags:${tag}`;
};
exports.getTagFilter = getTagFilter;
const structurePostObject = (record) => {
    const structuredPost = Object.assign(Object.assign({}, record), { postId: record.objectID });
    delete structuredPost.path;
    delete structuredPost.objectID;
    delete structuredPost.lastmodified;
    delete structuredPost._highlightResult;
    return structuredPost;
};
exports.structurePostObject = structurePostObject;
const filterLocation = (posts, userId) => {
    return posts.map((post) => {
        const currentPost = Object.assign({}, post);
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
