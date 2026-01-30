import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FacturasPage from "./pages/FacturasPage";
//import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/facturas" element={<FacturasPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//<Route path="/facturas" element={<Facturas />} />