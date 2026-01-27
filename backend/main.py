import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Sistema de Facturas")

# --- API Routes ---
@app.get("/api/login")
async def login():
    logger.info("Accessed /api/login")
    return {"message":"Bienvenido al sistema de facturas"}

@app.get("/api/facturas")
async def login():
    logger.info("Accessed /api/facturas")
    return {"message":"Bienvenido al sistema de facturas"}

# --- Static (Vite build) ---
dist_dir = Path(__file__).resolve().parent.parent / "frontend" / "components"
index_html = dist_dir / "index.html"

if dist_dir.exists():
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")

    @app.get("/{full_path:path}")
    async def spa_fallback(request: Request, full_path: str):
        # No interceptar API/docs
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
            return {"detail": "Not Found"}
        return FileResponse(index_html)