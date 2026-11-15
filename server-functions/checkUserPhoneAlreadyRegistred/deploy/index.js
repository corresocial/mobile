"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
if (!admin.apps.length) {
    admin.initializeApp();
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
exports.checkUserPhoneAlreadyRegistred = (0, https_1.onCall)((request) => __awaiter(void 0, void 0, void 0, function* () {
    if (ENFORCE_APP_CHECK && !request.app) {
        throw new https_1.HttpsError('unauthenticated', 'Unauthenticated');
    }
    const { phoneNumber } = (request.data || {});
    if (typeof phoneNumber !== 'string' || !E164_REGEX.test(phoneNumber)) {
        throw new https_1.HttpsError('invalid-argument', 'phoneNumber must be in E.164 format.');
    }
    try {
        yield admin.auth().getUserByPhoneNumber(phoneNumber);
        return true;
    }
    catch (error) {
        if (error.code === 'auth/user-not-found') {
            return false;
        }
        // Don't log the phone number or the uid (LGPD)
        console.error('Error fetching user:', error === null || error === void 0 ? void 0 : error.code, error === null || error === void 0 ? void 0 : error.message);
        throw new https_1.HttpsError('internal', 'Unable to check phone number.');
    }
}));
