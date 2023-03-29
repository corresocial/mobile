import {
	where,
	query,
	getDocs,
	DocumentData,
	collection,
	orderBy,
	CollectionReference,
} from "firebase/firestore";
import { firestore } from "..";
import { SearchParams } from "@maps/types";

export type PostIdentificationItem = {
	collection: string;
	postIds: string[];
};

export type PostIdentification = {
	service: PostIdentificationItem;
	sale: PostIdentificationItem;
	vacancy: PostIdentificationItem;
	socialImpact: PostIdentificationItem;
	culture: PostIdentificationItem;
};

async function getPostsByLocationPostType(searchParams: SearchParams) {
	try {
		const collectionRef = collection(firestore, "posts");

		const { nearbyPosts, nearPostIds } = await getNearbyPosts(
			collectionRef,
			searchParams
		);
		const cityPosts = await getCityPosts(
			collectionRef,
			searchParams,
			nearPostIds
		);
		const countryPosts = await getCountryPosts(
			collectionRef,
			searchParams,
			nearPostIds
		);

		return [...nearbyPosts, ...cityPosts, ...countryPosts];
	} catch (err) {
		console.log(err);
		return [];
	}
}

const getNearbyPosts = async (
	collectionRef: CollectionReference<DocumentData>,
	searchParams: SearchParams
) => {
	const posts: any = [];
	const nearPostIds: string[] = [];

	const queryNearby = query(
		collectionRef,
		where("postType", "==", searchParams.postType),
		where(
			"location.geohashNearby",
			"array-contains-any",
			searchParams.geohashes
		),
		orderBy("createdAt", "desc")
	);

	const snapshotNearby = await getDocs(queryNearby);

	snapshotNearby.forEach((doc) => {
		posts.push({ ...doc.data(), postId: doc.id });
		nearPostIds.push(doc.id);
		console.log(
			`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${
				doc.data().postType
			}`
		);
	});

	return { nearbyPosts: posts, nearPostIds };
};

const getCityPosts = async (
	collectionRef: CollectionReference<DocumentData>,
	searchParams: SearchParams,
	nearPostIds: string[] = []
) => {
	const posts: any = [];
	const queryCity = query(
		collectionRef,
		where("postType", "==", searchParams.postType),
		where("range", "==", "city"),
		where("location.city", "==", searchParams.city),
		orderBy("createdAt", "desc")
	);

	const snapshotCity = await getDocs(queryCity);

	snapshotCity.forEach((doc) => {
		if (!nearPostIds.includes(doc.id)) {
			posts.push({ ...doc.data(), postId: doc.id });
			console.log(
				`City: ${doc.data().title} - ${doc.data().range} ------- ${
					doc.data().postType
				}`
			);
		}
	});

	return posts;
};

const getCountryPosts = async (
	collectionRef: CollectionReference<DocumentData>,
	searchParams: SearchParams,
	nearPostIds: string[] = []
) => {
	const posts: any = [];

	const countryQuery = query(
		collectionRef,
		where("postType", "==", searchParams.postType),
		where("location.country", "==", searchParams.country),
		where("range", "==", "country"),
		where("location.city", "!=", searchParams.city), // Excepcion
		orderBy("location.city", "asc"),
		orderBy("createdAt", "desc")
	);

	const snapshotCountry = await getDocs(countryQuery);

	snapshotCountry.forEach((doc) => {
		if (!nearPostIds.includes(doc.id)) {
			posts.push({ ...doc.data(), postId: doc.id });
			console.log(
				`Country: ${doc.data().title} - ${doc.data().range} ------- ${
					doc.data().postType
				}`
			);
		}
	});

	return posts;
};

export { getPostsByLocationPostType };
