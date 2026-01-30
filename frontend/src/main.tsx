import ReactDOM from "react-dom/client";
import { AuthProvider } from "./auth/AuthContext";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);