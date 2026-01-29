import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
//import Facturas from "./components/Facturas";
//import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//<Route path="/facturas" element={<Facturas />} />