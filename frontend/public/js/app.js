const out = document.getElementById("out");
document.getElementById("btn").addEventListener("click", async () => {
  out.textContent = "Cargando...";

  // Llama al backend de Python
  const resp = await fetch("http://127.0.0.1:8000/api/hello?name=Miguel");
  const data = await resp.json();

  out.textContent = JSON.stringify(data, null, 2);
});
