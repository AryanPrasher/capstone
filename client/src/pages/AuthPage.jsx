import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginCard from '../components/LoginCard';
import RegisterCard from '../components/RegisterCard';
import LogoutCard from '../components/LogoutCard';

export default function AuthPage({ initialMode = 'login' }) {
  const { currentUser, isAuthenticated, toast, dismissToast, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine view based on initialMode or URL path
  const [currentView, setCurrentView] = useState(() => {
    if (location.pathname === '/register') return 'signup';
    if (location.pathname === '/login') return initialMode === 'showcase' ? 'showcase' : 'login';
    return initialMode;
  });

  // If already authenticated and visiting /login or /register, allow them to view or go to dashboard
  useEffect(() => {
    // If screen shrinks below 840px and in showcase mode, fallback to single view
    const handleResize = () => {
      if (window.innerWidth < 840 && currentView === 'showcase') {
        setCurrentView('login');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  const handleLoginSuccess = () => {
    // Navigate straight to the learning dashboard as required!
    navigate('/dashboard');
  };

  const handleRegisterSuccess = () => {
    // Navigate straight to the learning dashboard upon account creation
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    if (isAuthenticated) {
      logout();
      setCurrentView('login');
    } else {
      login('demo', 'password123');
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-viewport">
      {/* Ambient background decorative elements */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-grid-overlay" />

      {/* Top Floating Control Bar */}
      <header className="app-topbar">
        <div className="brand-badge" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <span className="brand-sparkle">✦</span>
          <span className="brand-name">CompetencyAI</span>
          <span className="brand-tag">Auth Portal</span>
        </div>

        {/* View Switcher Pills */}
        <nav className="view-switcher-nav" aria-label="Portal Navigation">
          <button
            type="button"
            className={`nav-pill ${currentView === 'showcase' ? 'active' : ''}`}
            onClick={() => setCurrentView('showcase')}
            title="View both screens side-by-side as in the inspiration image"
          >
            <span className="nav-icon">✨</span>
            <span className="nav-label">Dual Inspo View</span>
          </button>

          <button
            type="button"
            className={`nav-pill ${currentView === 'login' ? 'active' : ''}`}
            onClick={() => setCurrentView('login')}
          >
            <span className="nav-icon">🔑</span>
            <span className="nav-label">Login</span>
          </button>

          <button
            type="button"
            className={`nav-pill ${currentView === 'signup' ? 'active' : ''}`}
            onClick={() => setCurrentView('signup')}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Sign Up</span>
          </button>

          {isAuthenticated && (
            <button
              type="button"
              className="nav-pill"
              onClick={() => navigate('/dashboard')}
              title="Go to Learning Dashboard"
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Go to Dashboard</span>
            </button>
          )}
        </nav>

        {/* Quick Demo Action */}
        <div className="topbar-actions">
          <button
            type="button"
            className={`quick-demo-btn ${isAuthenticated ? 'active-signed-in' : ''}`}
            onClick={handleQuickDemo}
          >
            {isAuthenticated ? (
              <>
                <span className="user-dot" />
                <span>Hi, {currentUser?.name?.split(' ')[0]}</span>
                <span className="quick-action-text">(Sign Out)</span>
              </>
            ) : (
              <>
                <span className="flash-icon">⚡</span>
                <span>One-Click Demo &rarr; Dashboard</span>
              </>
            )}
          </button>
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
        {currentView === 'showcase' && (
          <div className="showcase-dual-wrapper">
            <div className="showcase-column">
              <div className="column-label">
                <span className="label-badge">Screen 1</span>
                <span>Login Design</span>
              </div>
              <LoginCard
                onNavigateRegister={() => setCurrentView('signup')}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>

            <div className="showcase-column">
              <div className="column-label">
                <span className="label-badge">Screen 2</span>
                <span>Sign Up Design</span>
              </div>
              <RegisterCard
                onNavigateLogin={() => setCurrentView('login')}
                onRegisterSuccess={handleRegisterSuccess}
              />
            </div>
          </div>
        )}

        {currentView === 'login' && (
          <div className="single-card-wrapper fade-enter">
            <LoginCard
              onNavigateRegister={() => setCurrentView('signup')}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        )}

        {currentView === 'signup' && (
          <div className="single-card-wrapper fade-enter">
            <RegisterCard
              onNavigateLogin={() => setCurrentView('login')}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </div>
        )}

        {currentView === 'logout' && (
          <div className="single-card-wrapper fade-enter">
            <LogoutCard
              onNavigateLogin={() => setCurrentView('login')}
              onNavigateRegister={() => setCurrentView('signup')}
            />
          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="portal-footer">
        <p>
          AI-Enabled Learning Platform &bull; Competency Gaps &bull; Personalized Training
        </p>
      </footer>
    </div>
  );
}
