import {
    addDoc,
    collection,
} from 'firebase/firestore';
import { firestore } from '../Firebase';
import { PostCollectionType, UserCollection } from '../types';

export default async function createPost(post: any, user: UserCollection, postCollection: PostCollectionType) {
    try {
        const docRef = await addDoc(collection(firestore, postCollection), {
            ...post,
            created_at: new Date(),
            owner: {
                userId: user.userId,
                name: user.name,
                profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : [],
            },
        });
    return docRef.id;
    } catch (err) {
        console.log(err);
    }
}
