import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import SkillMappingPage from './pages/SkillMappingPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Core Auth & Session Routes */}
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="/logout" element={<AuthPage initialMode="logout" />} />

          {/* Phase 2: Skill Mapping & Competency Engine */}
          <Route path="/skills" element={<SkillMappingPage />} />

          {/* Root Redirect to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all fallback to /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
