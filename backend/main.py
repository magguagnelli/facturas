import os
import logging
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import psycopg2

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

# --- Logging Setup ---
app = FastAPI(title="Sistema de Facturas")

# --- API Routes ---
#loggs
@app.get("/api/login")
def login():
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

# --- Frontend Serving ---
DIST_DIR = Path(__file__).resolve().parent.parent / "frontend" / "dist"

# 1) archivos estáticos (assets, js, css)
app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")

# 2) index para root
@app.get("/")
def index():
    return FileResponse(DIST_DIR / "index.html")

# 3) fallback SPA: cualquier ruta que no sea /api/* debe regresar index.html
@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    # si quieres excluir API:
    if full_path.startswith("api/"):
        return {"detail": "Not Found"}
    return FileResponse(DIST_DIR / "index.html")
