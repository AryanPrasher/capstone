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

  // Determine view based on URL path or initialMode
  const [currentView, setCurrentView] = useState(() => {
    if (location.pathname === '/register') return 'signup';
    if (location.pathname === '/logout') return 'logout';
    if (location.pathname === '/showcase') return 'showcase';
    if (location.pathname === '/login') return initialMode === 'showcase' ? 'showcase' : 'login';
    return initialMode;
  });

  // Keep view in sync if path changes
  useEffect(() => {
    if (location.pathname === '/register') setCurrentView('signup');
    else if (location.pathname === '/logout') setCurrentView('logout');
    else if (location.pathname === '/showcase') setCurrentView('showcase');
    else if (location.pathname === '/login' && currentView !== 'showcase') setCurrentView('login');
  }, [location.pathname]);

  // Responsive fallback for showcase view on smaller viewports
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 840 && currentView === 'showcase') {
        setCurrentView('login');
        navigate('/login');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView, navigate]);

  const handleLoginSuccess = () => {
    setCurrentView('logout');
    navigate('/logout');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('logout');
    navigate('/logout');
  };

  const handleQuickDemo = () => {
    if (isAuthenticated) {
      logout();
      setCurrentView('login');
      navigate('/login');
    } else {
      login('demo', 'password123');
      setCurrentView('logout');
      navigate('/logout');
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
          <span className="brand-name">Nature Auth</span>
          <span className="brand-tag">Portal</span>
        </div>

        {/* View Switcher Pills */}
        <nav className="view-switcher-nav" aria-label="Portal Navigation">
          <button
            type="button"
            className={`nav-pill ${currentView === 'showcase' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('showcase');
              navigate('/showcase');
            }}
            title="View login and register side-by-side"
          >
            <span className="nav-icon">✨</span>
            <span className="nav-label">Dual Inspo View</span>
          </button>

          <button
            type="button"
            className={`nav-pill ${currentView === 'login' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('login');
              navigate('/login');
            }}
          >
            <span className="nav-icon">🔑</span>
            <span className="nav-label">Login</span>
          </button>

          <button
            type="button"
            className={`nav-pill ${currentView === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('signup');
              navigate('/register');
            }}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Sign Up</span>
          </button>

          <button
            type="button"
            className={`nav-pill ${currentView === 'logout' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('logout');
              navigate('/logout');
            }}
            title="View session details and logout"
          >
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Session / Logout</span>
          </button>
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
                <span>One-Click Demo &rarr; Sign In</span>
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
                onNavigateRegister={() => {
                  setCurrentView('signup');
                  navigate('/register');
                }}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>

            <div className="showcase-column">
              <div className="column-label">
                <span className="label-badge">Screen 2</span>
                <span>Sign Up Design</span>
              </div>
              <RegisterCard
                onNavigateLogin={() => {
                  setCurrentView('login');
                  navigate('/login');
                }}
                onRegisterSuccess={handleRegisterSuccess}
              />
            </div>
          </div>
        )}

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
          Nature Inspo Portal &bull; Secure Authentication &bull; Login, Register &amp; Logout
        </p>
      </footer>
    </div>
  );
}
