import { addDoc, collection } from '@react-native-firebase/firestore'

import { ImpactReport } from '@domain/impactReport/entity/types'

import { IMPACT_REPORT_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createNewReport(impactReportData: ImpactReport) {
	try {
		const collectionRef = collection(firebaseFirestore, IMPACT_REPORT_COLLECTION)
		await addDoc(collectionRef, impactReportData)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { createNewReport }
