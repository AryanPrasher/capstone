import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard';
import LogoutCard from './components/LogoutCard';

function AuthAppContent() {
  const { currentUser, isAuthenticated, toast, dismissToast, login, logout } = useAuth();
  
  // Views: 'showcase' (side-by-side like inspo), 'login', 'signup', 'logout'
  const [currentView, setCurrentView] = useState('showcase');

  // Auto-switch to showcase or login if screen is small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 840 && currentView === 'showcase') {
        setCurrentView('login');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  const handleLoginSuccess = (user) => {
    // When logged in, provide smooth transition to session/logout card
    setCurrentView('logout');
  };

  const handleRegisterSuccess = (user) => {
    // Transition to session/logout card upon account creation
    setCurrentView('logout');
  };

  const handleQuickDemo = () => {
    if (isAuthenticated) {
      logout();
      setCurrentView('login');
    } else {
      login('demo', 'password123');
      setCurrentView('logout');
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
        <div className="brand-badge">
          <span className="brand-sparkle">✦</span>
          <span className="brand-name">Nature Inspo UI</span>
          <span className="brand-tag">v1.0</span>
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

          <button
            type="button"
            className={`nav-pill ${currentView === 'logout' ? 'active' : ''}`}
            onClick={() => setCurrentView('logout')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">Logout / Session</span>
            {isAuthenticated && <span className="auth-indicator-dot" title="Authenticated" />}
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
                <span>One-Click Demo</span>
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
          Crafted from <code>inspo/login insppo.webp</code> with fluid vector waves &amp; stateful authentication
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthAppContent />
    </AuthProvider>
  );
}
