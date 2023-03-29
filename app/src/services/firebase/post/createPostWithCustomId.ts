import { doc, setDoc } from "firebase/firestore";
import { LocalUserData } from "@contexts/types";
import { firestore } from "..";

import { PostCollectionType, PostCollection, PostType } from "../types";

async function createPostWithCustomId(
	post: PostCollection,
	user: LocalUserData,
	postCollection: PostCollectionType,
	postType: PostType,
	customId: string
) {
	try {
		await setDoc(doc(firestore, postCollection, customId), {
			...post,
			postType,
			createdAt: post.createdAt ? post.createdAt : new Date(),
			owner: {
				userId: user.userId,
				name: user.name,
				profilePictureUrl: user.profilePictureUrl
					? user.profilePictureUrl
					: [],
			},
		});
		return customId;
	} catch (err) {
		console.log(err);
	}
}

export { createPostWithCustomId };
