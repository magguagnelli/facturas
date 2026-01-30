import os
import logging
from fastapi import FastAPI, HTTPException, logger
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import psycopg2
# 
# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Sistema de Facturas")

#wherehouse
   # DATABRICKS_HOST ="instance-ee9c166c-7472-4aa4-b57c-7234a9730321.database.azuredatabricks.net"
    #HTTP_PATH ="/sql/1.0/warehouses/605b873f22449da5"
    #TOKEN = "dapi927b2dd86f775c5296eb785afff3053a"
#Lakebase
DB_HOST ="adb-8727252254628701.3.azuredatabricks.net"
DB_NAME ="databricks_postgres"
DB_USER ="facturas_role"
DB_PASSWORD ="18B+|2]mi:nT"
DB_SSL_MODE = "require"



# --- API Routes ---
#login home
@app.get("/api/login")
def login():
    logger.info("Accessed /api/login")
    conn = psycopg2.connect(
        host=DB_HOST,
        port=5432,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        sslmode=DB_SSL_MODE,
    )
    with conn.cursor() as cur:
        cur.execute("SELECT NOW()")
        db_resp = cur.fetchone()[0]
    conn.close()
    return {"message":db_resp}

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