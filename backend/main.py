import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from databricks import sql

conn = sql.connect(
    server_hostname="adb-7405615568530351.11.azuredatabricks.net",
    http_path="/sql/1.0/warehouses/605b873f22449da5",
    access_token="dapi927b2dd86f775c5296eb785afff3053a",
)

# --- Logging Setup ---
app = FastAPI(title="Sistema de Facturas")

# --- API Routes ---
#loggs
@app.get("/api/login")
def login():
    return {"message":"Login con conexión a BD"}