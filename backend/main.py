from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

# --- API ---
@app.get("/api/hello")
def hello():
    return {"message": "ok"}

# --- FRONTEND (Vite build) ---
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIST = BASE_DIR / "frontend" / "components"
INDEX_HTML = FRONTEND_DIST / "index.html"

if FRONTEND_DIST.exists():
    # sirve assets estáticos
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="static")

    # SPA fallback → React Router
    @app.get("/{full_path:path}")
    async def spa_fallback(request: Request, full_path: str):
        # no interceptar API ni docs
        if full_path.startswith(("api", "docs", "openapi.json")):
            return {"detail": "Not Found"}
        return FileResponse(INDEX_HTML)
