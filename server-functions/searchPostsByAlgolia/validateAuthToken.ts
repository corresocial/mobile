import * as admin from 'firebase-admin'

/**
 * Authentication context extracted from validated token
 */
export interface AuthContext {
  uid: string
  email?: string
  name?: string
  token: admin.auth.DecodedIdToken
}

/**
 * Authentication error for cloud functions
 */
export class AuthError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

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
export async function validateAuthToken(request: any): Promise<AuthContext> {
  // Extract Authorization header
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AuthError(
      'unauthenticated',
      'Missing Authorization header. Please provide a valid Firebase auth token.'
    )
  }

  // Extract Bearer token
  const parts = authHeader.split('Bearer ')
  if (parts.length !== 2) {
    throw new AuthError(
      'unauthenticated',
      'Invalid Authorization header format. Expected: Bearer <token>'
    )
  }

  const token = parts[1]

  if (!token) {
    throw new AuthError(
      'unauthenticated',
      'Authorization token is empty'
    )
  }

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token)

    // Extract user information
    const authContext: AuthContext = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      token: decodedToken,
    }

    return authContext
  } catch (error: any) {
    // Handle specific Firebase auth errors
    if (error.code === 'auth/id-token-expired') {
      throw new AuthError(
        'unauthenticated',
        'Authentication token has expired. Please refresh and try again.'
      )
    }

    if (error.code === 'auth/id-token-revoked') {
      throw new AuthError(
        'unauthenticated',
        'Authentication token has been revoked. Please log in again.'
      )
    }

    if (error.code === 'auth/invalid-id-token') {
      throw new AuthError(
        'unauthenticated',
        'Invalid authentication token. Please log in again.'
      )
    }

    // Generic authentication error
    console.error('Token validation error:', error)
    throw new AuthError(
      'unauthenticated',
      'Failed to validate authentication token'
    )
  }
}
