import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Facturas from "./components/Facturas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/facturas" element={<Facturas />} />

        {/* opcional: fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/*import Login from "./components/Login";

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;*/
