import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="/logout" element={<AuthPage initialMode="logout" />} />
          <Route path="/showcase" element={<AuthPage initialMode="showcase" />} />

          {/* Root Redirect to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all fallback to /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
