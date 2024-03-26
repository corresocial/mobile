import { addDoc, collection } from 'firebase/firestore'

import { ImpactReport } from '@domain/impactReport/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function createNewReport(impactReportData: ImpactReport) {
	try {
		const collectionRef = collection(firestore, 'impactReports')
		await addDoc(collectionRef, impactReportData)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { createNewReport }
