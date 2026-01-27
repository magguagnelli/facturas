import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Facturas from "./components/Facturas";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/facturas" element={<Facturas />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    

    
  );
}