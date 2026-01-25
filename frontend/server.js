const express = require("express");

const app = express();
const PORT = 3000;

// Sirve archivos estáticos (HTML, CSS, JS) desde /public
app.use(express.static("public"));

// Endpoint opcional del lado Node
app.get("/health", (req, res) => {
  res.json({ status: "ok-from-node" });
});

app.listen(PORT, () => {
  console.log(`Frontend (Node) corriendo en http://localhost:${PORT}`);
});
