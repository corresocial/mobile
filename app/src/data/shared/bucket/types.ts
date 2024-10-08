import { FirebaseStorageTypes } from '@react-native-firebase/storage'

import { PETITION_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '../storageKeys/remoteStorageKeys'

export type UploadPath = typeof USER_COLLECTION | typeof POST_COLLECTION | typeof PETITION_COLLECTION

export interface UploadObjects { task: FirebaseStorageTypes.Task; fileRef: FirebaseStorageTypes.Reference }
