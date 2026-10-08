import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginCard from '../components/LoginCard';
import RegisterCard from '../components/RegisterCard';
import LogoutCard from '../components/LogoutCard';

export default function AuthPage({ initialMode = 'login' }) {
  const { currentUser, isAuthenticated, toast, dismissToast, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine view strictly based on current route
  const [currentView, setCurrentView] = useState(() => {
    if (location.pathname === '/register') return 'signup';
    if (location.pathname === '/logout') return 'logout';
    return initialMode === 'signup' ? 'signup' : initialMode === 'logout' ? 'logout' : 'login';
  });

  // Keep view synchronized with URL
  useEffect(() => {
    if (location.pathname === '/register') setCurrentView('signup');
    else if (location.pathname === '/logout') setCurrentView('logout');
    else setCurrentView('login');
  }, [location.pathname]);

  // Automatically redirect authenticated user to main portal if on /login or /register
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/skills', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleLoginSuccess = () => {
    navigate('/skills');
  };

  const handleRegisterSuccess = () => {
    navigate('/skills');
  };

  const handleSignOut = () => {
    logout();
    setCurrentView('login');
    navigate('/login');
  };

  return (
    <div className="app-viewport">
      {/* Ambient background decorative elements */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-grid-overlay" />

      {/* Top Floating Header */}
      <header className="app-topbar">
        <div
          className="brand-badge"
          onClick={() => {
            setCurrentView('login');
            navigate('/login');
          }}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <span className="brand-sparkle">✦</span>
          <span className="brand-name">SkillSync</span>
          <span className="brand-tag">Academia-Industry Portal</span>
        </div>

        {/* Topbar Actions */}
        <div className="topbar-actions">
          {isAuthenticated ? (
            <div className="auth-user-pill-container">
              <div className="auth-user-chip">
                <span className="user-dot" />
                <span className="user-chip-name">{currentUser?.name}</span>
                <span className="user-chip-role">@{currentUser?.username}</span>
              </div>
              <button
                type="button"
                className="topbar-nav-action-btn signout-btn"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          ) : currentView === 'login' ? (
            <button
              type="button"
              className="topbar-nav-action-btn"
              onClick={() => {
                setCurrentView('signup');
                navigate('/register');
              }}
            >
              <span>Don't have an account?</span>
              <strong>Sign Up &rarr;</strong>
            </button>
          ) : (
            <button
              type="button"
              className="topbar-nav-action-btn"
              onClick={() => {
                setCurrentView('login');
                navigate('/login');
              }}
            >
              <span>Already registered?</span>
              <strong>Sign In &rarr;</strong>
            </button>
          )}
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toast && (
        <aside className={`floating-toast toast-${toast.type}`} role="alert">
          <div className="toast-icon">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </div>
          <span className="toast-text">{toast.message}</span>
          <button
            type="button"
            className="toast-dismiss"
            onClick={dismissToast}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </aside>
      )}

      {/* Main View Area */}
      <main className="cards-stage-container">
        {currentView === 'login' && (
          <div className="single-card-wrapper fade-enter">
            <LoginCard
              onNavigateRegister={() => {
                setCurrentView('signup');
                navigate('/register');
              }}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        )}

        {currentView === 'signup' && (
          <div className="single-card-wrapper fade-enter">
            <RegisterCard
              onNavigateLogin={() => {
                setCurrentView('login');
                navigate('/login');
              }}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </div>
        )}

        {currentView === 'logout' && (
          <div className="single-card-wrapper fade-enter">
            <LogoutCard
              onNavigateLogin={() => {
                setCurrentView('login');
                navigate('/login');
              }}
              onNavigateRegister={() => {
                setCurrentView('signup');
                navigate('/register');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="portal-footer">
        <p>
          Portal for Academia-Industry Collaboration &bull; Skill Mapping, Internships &amp; Placement
        </p>
      </footer>
    </div>
  );
}
