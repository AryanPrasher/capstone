import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import SkillMappingPage from './pages/SkillMappingPage';

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/skills' : '/login'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Portal Application Route */}
          <Route path="/skills" element={<SkillMappingPage />} />

          {/* Core Auth & Session Routes */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="/logout" element={<AuthPage initialMode="logout" />} />

          {/* Root Redirect to /skills when logged in, or /login when logged out */}
          <Route path="/" element={<RootRedirect />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
