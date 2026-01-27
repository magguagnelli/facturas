from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def facturas():
    return [{"id": 2}]