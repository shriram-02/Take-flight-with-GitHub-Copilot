# User Authentication System

This document describes the user authentication implementation for the Mergington High School Activity Management System.

## Overview

The authentication system provides secure user registration, login, and role-based access control using:
- **JWT (JSON Web Tokens)** for stateless authentication
- **bcrypt** for password hashing
- **FastAPI Security** for dependency injection and authorization

## Features Implemented

### 1. User Registration
- **Endpoint:** `POST /auth/register`
- **Parameters:**
  - `email` (required): User's email address
  - `full_name` (required): User's full name
  - `password` (required): User's password (min 8 characters recommended)
  - `role` (optional): User role - "student" (default) or "admin"
- **Response:** User details with email, name, role, and active status

**Example:**
```json
POST /auth/register
{
  "email": "newstudent@mergington.edu",
  "full_name": "Alice Johnson",
  "password": "securepass123",
  "role": "student"
}
```

### 2. User Login
- **Endpoint:** `POST /auth/login`
- **Parameters:**
  - `email` (required): User's email address
  - `password` (required): User's password
- **Response:** JWT access token and user information
- **Token Type:** Bearer token (valid for 30 minutes by default)

**Example:**
```json
POST /auth/login
{
  "email": "student@mergington.edu",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "email": "student@mergington.edu",
    "full_name": "John Student",
    "role": "student",
    "is_active": true
  }
}
```

### 3. Get Current User Profile
- **Endpoint:** `GET /auth/me`
- **Authentication:** Required (Bearer token)
- **Response:** Current authenticated user's profile information

**Example:**
```
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response:
{
  "email": "student@mergington.edu",
  "full_name": "John Student",
  "role": "student",
  "is_active": true
}
```

### 4. Logout
- **Endpoint:** `POST /auth/logout`
- **Response:** Confirmation message
- **Note:** Client should discard the token

### 5. Role-Based Access Control

#### Student Role
- Can register for activities
- Can unregister from activities
- Cannot access admin endpoints

#### Admin Role
- Has all student permissions
- Can access admin-only endpoints (to be implemented)

## Protected Endpoints

The following endpoints now require authentication:

### Activity Registration
- **Endpoint:** `POST /activities/{activity_name}/signup`
- **Authentication:** Required
- **Behavior:** User is identified from their token (no email parameter needed)

### Activity Unregistration
- **Endpoint:** `DELETE /activities/{activity_name}/unregister`
- **Authentication:** Required
- **Behavior:** User is identified from their token (no email parameter needed)

## Test Credentials

Pre-configured test accounts:

| Email | Password | Role | Full Name |
|-------|----------|------|----------|
| `student@mergington.edu` | `password123` | student | John Student |
| `admin@mergington.edu` | `admin123` | admin | Admin User |

## How to Use

### 1. Login and Get Token
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@mergington.edu",
    "password": "password123"
  }'
```

### 2. Use Token for Protected Endpoints
```bash
curl -X POST "http://localhost:8000/activities/Chess%20Club/signup" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Get User Profile
```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Security Considerations

⚠️ **Important for Production:**

1. **Change Secret Key:** Update `SECRET_KEY` in `src/auth.py` to a strong random value
2. **Use HTTPS:** Always use HTTPS in production to protect tokens
3. **Database:** Replace in-memory `users_db` with a real database (PostgreSQL, MongoDB, etc.)
4. **Token Expiration:** Adjust `ACCESS_TOKEN_EXPIRE_MINUTES` based on security requirements
5. **Password Requirements:** Implement stronger password requirements (min length, complexity)
6. **Rate Limiting:** Add rate limiting to login endpoint to prevent brute force attacks
7. **Email Verification:** Add email verification for new registrations

## Architecture

```
Authentication Flow:
1. User calls /auth/register or /auth/login
2. Credentials validated against users_db
3. JWT token created with user claims (email, role)
4. Token returned to client
5. Client includes token in Authorization header for protected endpoints
6. FastAPI dependency (get_current_user) validates token and extracts user
7. Endpoint receives authenticated user information
```

## Dependencies Added

- `pydantic[email]` - Data validation with email support
- `passlib[bcrypt]` - Password hashing
- `python-jose[cryptography]` - JWT token management
- `python-multipart` - Form data support

## Future Enhancements

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] OAuth2 social login (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Token refresh mechanism
- [ ] User profile update endpoint
- [ ] Admin user management endpoints
- [ ] Activity management by club admins
- [ ] Audit logging for security events