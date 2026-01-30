import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FacturasPage from "./pages/FacturasPage";
import { ProtectedRoute } from "./auth/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/facturas"
        element={
          <ProtectedRoute>
            <FacturasPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
//<Route path="/facturas" element={<Facturas />} />