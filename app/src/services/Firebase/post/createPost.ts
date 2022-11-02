import {
    addDoc,
    collection,
} from 'firebase/firestore';
import { LocalUserData } from '../../../contexts/types';
import { firestore } from '../Firebase';
import { PostCollectionType ,PostCollection} from '../types';

export default async function createPost(post: PostCollection, user: LocalUserData, postCollection: PostCollectionType) { 
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
