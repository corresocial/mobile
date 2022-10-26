import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase';

export default async function uploadImage(
    localPath: string,
    collection: string,
    uid: string,
    index?: number
) {
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', localPath, true);
            xhr.send(null);
        });

        const fileRef = ref(
            storage,
            `imagens/${collection}/${uid}${index || ''}.jpg`,
        );

        const uploadTask = uploadBytesResumable(fileRef, blob as Blob | Uint8Array | ArrayBuffer);

        return { uploadTask, blob };
    } catch (e) {
        console.log(e);
    }
}