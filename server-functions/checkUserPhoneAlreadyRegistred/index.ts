import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

if (!admin.apps.length) {
	admin.initializeApp();
}

interface RequestData {
	phoneNumber: string;
}

// Note: Function name is defined here
exports.checkUserPhoneAlreadyRegistred = onCall(async (request) => {
	const { phoneNumber } = request.data as RequestData;

	if (!phoneNumber) {
		throw new HttpsError('invalid-argument', 'Missing phoneNumber.');
	}

	try {
		const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
		console.log(`User found: ${userRecord.uid}`);
		return true;
	} catch (error: any) {
		if (error.code === 'auth/user-not-found') {
			return false;
		}

		console.error('Error fetching user:', error);
		throw new HttpsError('internal', 'Unable to check phone number.');
	}
});