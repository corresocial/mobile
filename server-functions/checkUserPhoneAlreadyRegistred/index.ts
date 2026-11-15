import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

if (!admin.apps.length) {
	admin.initializeApp();
}

interface RequestData {
	phoneNumber: string;
}

// E.164: "+" and 8 to 15 digits, no leading zero (e.g. +5543999999999)
const E164_REGEX = /^\+[1-9]\d{7,14}$/;

// enforceAppCheck: false -> set to true once App Check is set up in the app.
// firebase-functions 3.x has no `enforceAppCheck` option for v2 onCall (it would be
// ignored), so the check is explicit here. Invalid tokens are already rejected by the
// SDK; enabling this also rejects requests without a token.
// With firebase-functions >= 4, use onCall({ enforceAppCheck: true }, ...) instead.
const ENFORCE_APP_CHECK = false;

// Note: Function name is defined here
exports.checkUserPhoneAlreadyRegistred = onCall(async (request) => {
	if (ENFORCE_APP_CHECK && !request.app) {
		throw new HttpsError('unauthenticated', 'Unauthenticated');
	}

	const { phoneNumber } = (request.data || {}) as Partial<RequestData>;

	if (typeof phoneNumber !== 'string' || !E164_REGEX.test(phoneNumber)) {
		throw new HttpsError('invalid-argument', 'phoneNumber must be in E.164 format.');
	}

	try {
		await admin.auth().getUserByPhoneNumber(phoneNumber);
		return true;
	} catch (error: any) {
		if (error.code === 'auth/user-not-found') {
			return false;
		}

		// Don't log the phone number or the uid (LGPD)
		console.error('Error fetching user:', error?.code, error?.message);
		throw new HttpsError('internal', 'Unable to check phone number.');
	}
});
