import { useEffect, useState } from "react";

export default function Facturas() {
  const [login, setlogin] = useState<any>(null);

  useEffect(() => {
    fetch("/api/login")
      .then((r) => {
        if (!r.ok) throw new Error("Error en API");
        return r.json();
      })
      .then(setlogin)
      .catch((e) => console.error(e));
  }, []);

  return <pre>{JSON.stringify(login, null, 2)}</pre>;
}
