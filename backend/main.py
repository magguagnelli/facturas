from fastapi import FastAPI
from api.router import router as api_router


app = FastAPI(title="Sistema de Facturas")
app.include_router(api_router, prefix="/api")