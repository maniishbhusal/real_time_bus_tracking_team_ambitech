import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import MapPlaceholder from "./components/map/MapPlaceholder";
import UserBusTracker from "./components/map/UserBusTracker";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/driver" element={<MapPlaceholder />} /> */}
          <Route path="/driver" element={<UserBusTracker />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
