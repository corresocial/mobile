import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { validateAuthToken, AuthError } from './validateAuthToken';

if (!admin.apps.length) {
	admin.initializeApp();
}

interface RequestData {
	phoneNumber: string;
}

// Note: Function name is defined here
exports.checkUserPhoneAlreadyRegistred = onRequest(async (request, response) => {
	// Parse request body
	const { phoneNumber } = request.body as RequestData;

	if (!phoneNumber) {
		response.status(400).json({
			error: 'Missing phoneNumber',
			code: 'invalid-argument'
		});
		return;
	}

	try {
		const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
		console.log(`User found: ${userRecord.uid}`);
		response.status(200).json(true);
	} catch (error: any) {
		if (error.code === 'auth/user-not-found') {
			response.status(200).json(false);
			return;
		}

		console.error('Error fetching user:', error);
		response.status(500).json({
			error: 'Unable to check phone number',
			code: 'internal'
		});
	}
});