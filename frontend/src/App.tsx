import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Facturas from "./components/Facturas";
//import Proveedores from "./components/Proveedores"; // ejemplo
//import Contratos from "./components/Contratos";     // ejemplo

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* UI */}
        <Route path="/" element={<Login />} />
        <Route path="/facturas" element={<Facturas />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}