from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "CAMBIA_ESTA_LLAVE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# demo: usuario hardcodeado (luego lo conectas a BD)
fake_user = {
    "username": "admin",
    "password": "$2a$12$ymC.2Q3c2.J3jE9AyzHHVezpvX08i2ToPTaUx5NUti8AkUIhR6k6q"  # "password" hashed
}

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def authenticate_user(username: str, password: str):
    if username != fake_user["username"]:
        return None
    if not verify_password(password, fake_user["password"]):
        return None
    return {"username": username}

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {**data, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
