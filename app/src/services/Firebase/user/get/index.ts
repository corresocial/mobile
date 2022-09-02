import { doc, getDoc } from 'firebase/firestore';
import { UserCollection } from '../types';

import { firestore } from './../../Firebase';

async function getUser(userId: string) {
    try {
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return { userId, ...userSnap.data() as UserCollection };
        }
        return null;
    } catch (e) {
        console.log(e);
    }
}

export { getUser }
