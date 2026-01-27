from fastapi import APIRouter
from .login import router as users_router
from .facturas import router as invoices_router

router = APIRouter()
router.include_router(users_router, prefix="/login", tags=["login"])
router.include_router(invoices_router, prefix="/facturas", tags=["facturas"])
