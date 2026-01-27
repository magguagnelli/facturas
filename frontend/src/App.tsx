import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Facturas from "./components/Facturas";
//import ProtectedRoute from "./components/ProtectedRoute";

const navigate = useNavigate();
navigate("/facturas");

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/facturas" element={<Facturas />} />
      <Route path="/" element={<Navigate to="/facturas" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}