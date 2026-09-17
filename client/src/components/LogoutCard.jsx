import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LogoutCard({ onNavigateLogin, onNavigateRegister }) {
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(128);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
      if (onNavigateLogin) onNavigateLogin();
    }, 450);
  };

  // Fallback if accessed without an active session
  const activeUser = currentUser || {
    name: 'Explorer Guest',
    username: 'guest_user',
    email: 'guest@nature.io'
  };

  const userInitial = (activeUser.name || 'U').charAt(0).toUpperCase();

  return (
    <div className="inspo-card logout-inspo-card">
      {/* Top Liquid Wave Header */}
      <div className="wave-header-container logout-wave-header">
        <svg
          className="liquid-wave-svg"
          viewBox="0 0 380 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradLogout" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#180231" />
              <stop offset="50%" stopColor="#2c0958" />
              <stop offset="100%" stopColor="#481585" />
            </linearGradient>
            <filter id="logoutWaveShadow" x="-10%" y="-10%" width="120%" height="125%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1a0438" floodOpacity="0.3" />
            </filter>
            <mask id="logoutCutoutMask">
              <rect x="0" y="0" width="380" height="230" fill="white" />
              <circle cx="60" cy="95" r="16" fill="black" />
              <circle cx="85" cy="110" r="8" fill="black" />
              <circle cx="310" cy="45" r="6" fill="black" />
            </mask>
          </defs>

          <path
            d="M0 0 H380 V80 C320 120 280 170 210 165 C140 160 100 210 0 190 Z"
            fill="url(#purpleGradLogout)"
            mask="url(#logoutCutoutMask)"
            filter="url(#logoutWaveShadow)"
          />
        </svg>

        <div className="wave-header-text">
          <h2 className="greeting-text">See You Soon!</h2>
        </div>
      </div>

      {/* Main Body */}
      <div className="card-body logout-body">
        {/* User Profile Avatar with Ring */}
        <div className="profile-avatar-section">
          <div className="avatar-ring-container">
            <div className="user-avatar-badge">
              <span>{userInitial}</span>
            </div>
            <span className="online-status-dot" title="Active session" />
          </div>

          <h1 className="auth-title profile-name">{activeUser.name}</h1>
          <p className="profile-username">@{activeUser.username}</p>
          <span className="profile-email-badge">{activeUser.email}</span>
        </div>

        {/* Session Info Pill */}
        <div className="session-status-card">
          <div className="session-status-item">
            <span className="status-label">Active Session</span>
            <span className="status-value">{formatSessionTime(sessionSeconds)}</span>
          </div>
          <div className="status-divider" />
          <div className="session-status-item">
            <span className="status-label">Security</span>
            <span className="status-value status-badge-secure">Encrypted ✦</span>
          </div>
        </div>

        <p className="logout-confirm-prompt">
          Ready to step away? Your preferences and saved settings are stored securely.
        </p>

        {/* Primary Action Button: Sign Out */}
        <button
          id="logout-submit-btn"
          type="button"
          className="pill-submit-btn logout-action-btn"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <span className="spinner" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </>
          )}
        </button>

        {/* Secondary Action: Keep Me Signed In / Return to Portal */}
        <button
          type="button"
          className="pill-secondary-btn"
          onClick={onNavigateLogin}
        >
          Keep Me Signed In
        </button>

        {/* Footer Navigation */}
        <div className="auth-footer-nav">
          <span className="footer-prompt">Need a different profile? </span>
          <button
            type="button"
            className="footer-action-link"
            onClick={onNavigateRegister}
          >
            Switch Account
          </button>
        </div>
      </div>

      {/* Bottom Wave Footer */}
      <div className="logout-bottom-wave-container">
        <svg
          viewBox="0 0 380 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 45 C100 80 250 20 380 60 L380 90 L0 90 Z"
            fill="url(#purpleGradLogout)"
          />
        </svg>
        <p className="logout-peace-text">Nature will remember your footsteps</p>
      </div>
    </div>
  );
}
