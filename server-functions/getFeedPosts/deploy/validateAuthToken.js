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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthError = void 0;
exports.validateAuthToken = validateAuthToken;
const admin = __importStar(require("firebase-admin"));
/**
 * Authentication error for cloud functions
 */
class AuthError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
/**
 * Validate Firebase auth token from Authorization header
 *
 * Extracts Bearer token from request header and validates it using
 * Firebase Admin SDK. Returns authentication context with user info.
 *
 * @param request - HTTP request object with headers
 * @returns AuthContext with validated user information
 * @throws AuthError if token is missing, invalid, or expired
 */
function validateAuthToken(request) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract Authorization header
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AuthError('unauthenticated', 'Missing Authorization header. Please provide a valid Firebase auth token.');
        }
        // Extract Bearer token
        const parts = authHeader.split('Bearer ');
        if (parts.length !== 2) {
            throw new AuthError('unauthenticated', 'Invalid Authorization header format. Expected: Bearer <token>');
        }
        const token = parts[1];
        if (!token) {
            throw new AuthError('unauthenticated', 'Authorization token is empty');
        }
        try {
            // Verify token using Firebase Admin SDK
            const decodedToken = yield admin.auth().verifyIdToken(token);
            // Extract user information
            const authContext = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                token: decodedToken,
            };
            return authContext;
        }
        catch (error) {
            // Handle specific Firebase auth errors
            if (error.code === 'auth/id-token-expired') {
                throw new AuthError('unauthenticated', 'Authentication token has expired. Please refresh and try again.');
            }
            if (error.code === 'auth/id-token-revoked') {
                throw new AuthError('unauthenticated', 'Authentication token has been revoked. Please log in again.');
            }
            if (error.code === 'auth/invalid-id-token') {
                throw new AuthError('unauthenticated', 'Invalid authentication token. Please log in again.');
            }
            // Generic authentication error
            console.error('Token validation error:', error);
            throw new AuthError('unauthenticated', 'Failed to validate authentication token');
        }
    });
}
