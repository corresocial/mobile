import { addDoc, collection } from 'firebase/firestore'

import { ImpactReport } from '@domain/entities/impactReport/types'

import { firestore } from '@services/firebase'

async function createNewReport(impactReportData: ImpactReport) {
	try {
		const collectionRef = collection(firestore, 'impactReports')
		await addDoc(collectionRef, impactReportData)
	} catch (err: any) {
		console.log(err)
		throw new Error(err)
	}
}

export { createNewReport }
