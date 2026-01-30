import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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