import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { firestore } from '../Firebase'

export default async function updateDoc(collection: string, uid: string, campo: string, valor: {}, union?: boolean) {
    const ref = doc(firestore, collection, uid)
    if (union) {
        const finished = await setDoc(
            ref,
            {
                [campo]: arrayUnion(valor),
                updated_at: new Date()
            },
            { merge: true },
        )
        return finished
    }
    const finished = await setDoc(
        ref,
        { [campo]: valor },
        { merge: true })
    return finished
}
