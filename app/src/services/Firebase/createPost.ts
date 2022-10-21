import {
    addDoc,
    collection,
} from 'firebase/firestore';
import { firestore } from './Firebase';
import { UserCollection } from './types';

export default async function createPost(post: any, user: UserCollection) {
    try {
        const docRef = await addDoc(collection(firestore, 'posts'), {
            ...post,
            created_at: new Date(),
            /* owner: {
                user_id: user.userId,
                name: user.name,
                img_url: user.img_url ? user.img_url : null,
                address: user.address,
                range: user.range,
            }, */
        });
        return docRef.id;
    } catch (e) {
        console.log(e);
    }
}
