import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from databricks import sql

    DATABRICKS_HOST ="instance-ee9c166c-7472-4aa4-b57c-7234a9730321.database.azuredatabricks.net"
    HTTP_PATH ="/sql/1.0/warehouses/605b873f22449da5"
    TOKEN = "dapi927b2dd86f775c5296eb785afff3053a"

# --- Logging Setup ---
app = FastAPI(title="Sistema de Facturas")

# --- API Routes ---
#loggs
@app.get("/api/login")
def login():
    with sql.connect(
        server_hostname=DATABRICKS_HOST,
        http_path=HTTP_PATH,
        access_token=TOKEN,
    ) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT current_user(), current_catalog(), current_schema()")
            print(cur.fetchall())

            cur.execute("SELECT * FROM catalogo.esquema.mi_tabla LIMIT 10")
            rows = cur.fetchall()
            print(rows)
    return {"message":"Login con conexión a BD"}