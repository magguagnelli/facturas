import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

type Usuario = { id: string; nombre: string };
type Factura = { id: string; folio: string; total: number };

export default function Facturas() {
  const [me, setMe] = useState<Usuario | null>(null);
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        // API 1: sesión/usuario
        const usuario = await api<Usuario>("/api/auth/me");
        setMe(usuario);

        // API 2: facturas
        const lista = await api<Factura[]>("/api/facturas");
        setFacturas(lista);
      } catch (e: any) {
        setError(e.message ?? "Error");
      }
    })();
  }, []);

  if (error) return <p>{error}</p>;
  if (!me) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Facturas</h1>
      <p>Bienvenido: {me.nombre}</p>

      <ul>
        {facturas.map((f) => (
          <li key={f.id}>
            {f.folio} — ${f.total}
          </li>
        ))}
      </ul>
    </div>
  );
}