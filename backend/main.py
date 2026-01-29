import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import psycopg2

conn = psycopg2.connect(
    host=os.environ["DB_HOST"],
    dbname=os.environ["DB_NAME"],
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    port=int(os.environ.get("DB_PORT", "5432")),
    connect_timeout=5,
)

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
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    logger.info("DB OK ✅", cur.fetchone())
    cur.close()
    conn.close()
    logger.info("Accessed /api/login")
    return {"message":"Bienvenido al sistema de facturas"}

@app.get("/api/facturas")
async def facturas():
    logger.info("Accessed /api/facturas")
    return {"message":"Bienvenido al sistema de facturas"}

# --- Static Files Setup ---
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
os.makedirs(static_dir, exist_ok=True)

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

# --- Catch-all for React Routes ---
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    index_html = os.path.join(static_dir, "index.html")
    if os.path.exists(index_html):
        logger.info(f"Serving React frontend for path: /{full_path}")
        return FileResponse(index_html)
    logger.error("Frontend not built. index.html missing.")
    raise HTTPException(
        status_code=404,
        detail="Frontend not built. Please run 'npm run build' first."
    )