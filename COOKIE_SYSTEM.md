# 🔐 Cookie System Documentation

## Overview

This system implements a secure cookie-based authentication flow between the frontend and backend.

## Backend Implementation

### New Route: `/api/auth/send-cookie`

- **Method**: POST
- **Purpose**: Sends a JWT token as a cookie to the frontend
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "userId": "clerk_user_id"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Cookie sent successfully",
    "token": "jwt_token_here",
    "email": "user@example.com",
    "userId": "clerk_user_id"
  }
  ```

### Cookie Configuration

- **Signed**: true (for security)
- **HttpOnly**: false (allows JavaScript access)
- **Secure**: true in production, false in development
- **SameSite**: "lax" (more permissive for frontend)
- **MaxAge**: 7 days
- **Path**: "/"

## Frontend Implementation

### Store Functions (useAuthStore)

#### `getCookieFromBackend(email, userId)`

- Calls the backend `/send-cookie` route
- Stores token in Zustand state
- Sets cookie in frontend using js-cookie
- Returns the response data

#### `checkCookie()`

- Checks if a token exists in cookies
- Updates store state if token found
- Returns the token or null

#### `clearCookie()`

- Removes token from cookies
- Clears token from store state

### Integration with Auth Component

- Automatically checks for existing cookies on mount
- Calls `getCookieFromBackend` after successful Clerk authentication
- Clears cookies on logout

## Usage Flow

1. **User logs in with Clerk**
2. **Frontend calls `clerk_auth`** with user data
3. **Backend creates/updates user** and returns success
4. **Frontend calls `getCookieFromBackend`** to get cookie
5. **Backend sends JWT token** as cookie and in response
6. **Frontend stores token** in both state and cookie
7. **Token persists** across browser sessions

## Security Features

- JWT tokens are signed and verified
- Cookies are configured for security
- Tokens expire after 7 days
- Automatic cleanup on logout

## Debug Features

In development mode, a debug panel shows:

- Store token status
- Cookie token status
- Manual test button

## Testing

1. Start both backend and frontend servers
2. Log in with Clerk
3. Check browser cookies (should see "token" cookie)
4. Check console logs for cookie status
5. Use debug panel to test cookie functionality

## Environment Variables

Backend needs:

- `JWT_SECRET`: Secret for JWT signing
- `COOKIE_SECRET`: Secret for cookie signing
- `NODE_ENV`: Environment (production/development)
