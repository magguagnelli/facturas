from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent
DIST = BASE_DIR / "frontend" / "dist"
INDEX = DIST / "index.html"

print("DIST:", DIST, "exists:", DIST.exists())

# Sirve assets del build (Vite suele ponerlos en dist/assets)
app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")

@app.get("/")
def root():
    return FileResponse(INDEX)

@app.get("/{path:path}")
def spa(path: str):
    if path.startswith(("api", "docs", "openapi.json", "assets")):
        return {"detail": "Not Found"}
    return FileResponse(INDEX)
