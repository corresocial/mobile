import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

interface RequestBody {
	phoneNumber: string
}

exports.checkUserPhoneAlreadyRegistred = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response | any) => {
	const { phoneNumber }: RequestBody = req.body

	if (!phoneNumber) {
		return res.status(400).send('Missing phoneNumber in request body.')
	}

	return admin.auth()
		.getUserByPhoneNumber(phoneNumber)
		.then((userRecord) => {
			console.log(`Successfully fetched user data:  ${userRecord.toJSON()}`)
			return res.status(200).send(!!userRecord)
		})
		.catch((error) => {
			console.log('Error fetching user data:', error)
			return res.status(200).send(false)
		})
})