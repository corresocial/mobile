import {
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore';
import { firestore } from '../Firebase';
import { UserCollection } from '../types';

async function updateUserPrivateData(data: UserCollection, userId: string, privateField: string = '') {
    try {
        try {
            const docRef = doc(firestore, 'users', userId, 'private', privateField)
            await updateDoc(
                docRef,
                { ...data }),
                { merge: true }
        } catch (err) {
            const collectionRef = doc(firestore, 'users', userId, 'private', privateField)
            await setDoc(
                collectionRef,
                { ...data },
            )
        }

    } catch (err) {
        console.log(err)
    }
}

export default updateUserPrivateData
