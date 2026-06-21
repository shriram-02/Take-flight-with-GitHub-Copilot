"""
Authentication module for user login, registration, and token management.

Handles user credentials, password hashing, JWT token generation, and role-based access control.
"""

from datetime import datetime, timedelta
from typing import Optional, Dict
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# In-memory user database (replace with real database in production)
users_db: Dict[str, Dict] = {
    "student@mergington.edu": {
        "email": "student@mergington.edu",
        "full_name": "John Student",
        "hashed_password": pwd_context.hash("password123"),
        "role": "student",
        "is_active": True
    },
    "admin@mergington.edu": {
        "email": "admin@mergington.edu",
        "full_name": "Admin User",
        "hashed_password": pwd_context.hash("admin123"),
        "role": "admin",
        "is_active": True
    }
}

# Security scheme for Bearer token
security = HTTPBearer()


# Pydantic models
class UserRegister(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str = "student"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict


class UserResponse(BaseModel):
    email: str
    full_name: str
    role: str
    is_active: bool


# Helper functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its hashed version."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Dict:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(credentials: HTTPAuthCredentials = Depends(security)) -> Dict:
    """Dependency to get current authenticated user from token."""
    token = credentials.credentials
    payload = decode_token(token)
    email = payload.get("sub")
    
    if email not in users_db:
        raise HTTPException(status_code=401, detail="User not found")
    
    user = users_db[email]
    if not user["is_active"]:
        raise HTTPException(status_code=401, detail="User is inactive")
    
    return user


async def get_current_admin(current_user: Dict = Depends(get_current_user)) -> Dict:
    """Dependency to ensure current user is an admin."""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user


def register_user(email: str, full_name: str, password: str, role: str = "student") -> Dict:
    """Register a new user."""
    if email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    users_db[email] = {
        "email": email,
        "full_name": full_name,
        "hashed_password": get_password_hash(password),
        "role": role,
        "is_active": True
    }
    
    return users_db[email]


def authenticate_user(email: str, password: str) -> Dict:
    """Authenticate a user with email and password."""
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user = users_db[email]
    if not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user["is_active"]:
        raise HTTPException(status_code=401, detail="User account is inactive")
    
    return user