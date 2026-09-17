import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginCard({ onNavigateRegister, onLoginSuccess }) {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(identifier, password);
      setIsLoading(false);
      if (result.success) {
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Invalid credentials');
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    setIdentifier('demo');
    setPassword('password123');
    setError('');
  };

  const handleSocialClick = (provider) => {
    // Quick one-click simulated social login for seamless testing
    setIsLoading(true);
    setTimeout(() => {
      login('alexmorgan', 'password123');
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 350);
  };

  return (
    <div className="inspo-card login-inspo-card">
      {/* Top Liquid Wave Header with Cutouts */}
      <div className="wave-header-container">
        <svg
          className="liquid-wave-svg"
          viewBox="0 0 380 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradLogin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#190333" />
              <stop offset="45%" stopColor="#2e0a5c" />
              <stop offset="100%" stopColor="#4f178f" />
            </linearGradient>
            <filter id="waveShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#1a0438" floodOpacity="0.32" />
            </filter>
            <mask id="liquidCutoutMask">
              {/* White area is visible, black area is cut out */}
              <rect x="0" y="0" width="380" height="270" fill="white" />
              {/* Primary circular cutout */}
              <circle cx="56" cy="106" r="18" fill="black" />
              {/* Secondary smaller dot cutout */}
              <circle cx="83" cy="120" r="9" fill="black" />
              {/* Top pinhole accent cutout */}
              <circle cx="152" cy="34" r="4.5" fill="black" />
            </mask>
          </defs>

          {/* Underlay accent wave for depth */}
          <path
            d="M0 0 L380 0 L380 145 C340 185 300 230 330 265 C345 282 375 270 380 260 L380 0 Z"
            fill="#3a0d72"
            opacity="0.35"
          />

          {/* Main flowing wave with circular cutouts */}
          <path
            d="M0 0 L380 0 L380 62 C340 65 295 102 284 140 C270 190 320 235 348 248 C375 260 380 268 380 270 C360 270 330 255 305 230 C270 195 240 120 300 70 C340 38 370 48 380 40 L380 0 Z"
            fill="#120124"
            opacity="0.25"
          />
          <path
            d="M0 0 L380 0 L380 50 C325 50 285 95 275 145 C265 192 315 238 348 246 C370 252 380 258 380 265 C340 265 298 230 280 188 C256 132 288 78 350 56 L380 48 L380 0 L0 0 Z M0 0 L380 0 L380 42 C300 45 270 115 285 175 C295 215 345 235 365 242 C330 240 290 205 270 160 C248 108 285 52 380 40 L380 0 L0 0 Z"
            fill="url(#purpleGradLogin)"
            mask="url(#liquidCutoutMask)"
            filter="url(#waveShadow)"
          />
          {/* Main purple wave body */}
          <path
            d="M0 0 H380 V45 C310 48 265 105 285 175 C298 220 348 238 370 244 C342 245 298 212 278 165 C252 108 288 52 375 42 V0 H0 V128 C50 148 110 110 160 88 C215 64 260 85 305 60 C340 40 370 42 380 42 V0 Z"
            fill="url(#purpleGradLogin)"
            mask="url(#liquidCutoutMask)"
            filter="url(#waveShadow)"
          />
        </svg>

        {/* Crisp typography inside the wave */}
        <div className="wave-header-text">
          <h2 className="greeting-text">Hello There!</h2>
        </div>
      </div>

      {/* Main Login Form Content */}
      <div className="card-body">
        <div className="title-section">
          <h1 className="auth-title">Login</h1>
        </div>

        {error && (
          <div className="inline-alert error-alert" role="alert">
            <span className="alert-icon">!</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* User Name Pill Input */}
          <div className="pill-input-group">
            <input
              id="login-username"
              type="text"
              className="pill-input"
              placeholder="User Name"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          {/* Password Pill Input */}
          <div className="pill-input-group password-group">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="pill-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="pwd-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Sign In Primary Pill Button */}
          <button
            id="login-submit-btn"
            type="submit"
            className="pill-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Fill Pill */}
        <div className="demo-hint-container">
          <button type="button" className="demo-chip" onClick={handleQuickDemo}>
            ⚡ Autofill demo credentials
          </button>
        </div>

        {/* Divider "— Or —" */}
        <div className="inspo-divider">
          <span className="divider-line" />
          <span className="divider-text">Or</span>
          <span className="divider-line" />
        </div>

        {/* Social Round Buttons: Google & Facebook */}
        <div className="social-row">
          <button
            type="button"
            className="social-round-btn google-btn"
            onClick={() => handleSocialClick('Google')}
            aria-label="Sign in with Google"
            title="Sign in with Google"
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="social-round-btn facebook-btn"
            onClick={() => handleSocialClick('Facebook')}
            aria-label="Sign in with Facebook"
            title="Sign in with Facebook"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>

        {/* Footer Navigation: Don't have an account ? Create */}
        <div className="auth-footer-nav">
          <span className="footer-prompt">Don’t have an account ? </span>
          <button
            type="button"
            className="footer-action-link"
            onClick={onNavigateRegister}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
