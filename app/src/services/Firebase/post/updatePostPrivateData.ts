import {
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore';
import { firestore } from '../Firebase';
import { PostCollection, PostCollectionType } from '../types';

async function updatePostPrivateData(data: PostCollection, postId: string, postCollection: PostCollectionType, privateField: string = '') {
    try {
        try {
            const docRef = doc(firestore, postCollection, postId, 'private', privateField)
            await updateDoc(
                docRef,
                { ...data }),
                { merge: true }
        } catch (err) {
            const collectionRef = doc(firestore, postCollection, postId, 'private', privateField)
            await setDoc(
                collectionRef,
                { ...data },
            )
        }

    } catch (err) {
        console.log(err)
    }
}

export default updatePostPrivateData
