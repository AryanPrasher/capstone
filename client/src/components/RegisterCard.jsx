import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TermsModal from './TermsModal';

export default function RegisterCard({ onNavigateLogin, onRegisterSuccess }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!username.trim() || username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = register({ name, email, username, password });
      setIsLoading(false);
      if (result.success) {
        if (onRegisterSuccess) onRegisterSuccess(result.user);
      } else {
        setError(result.message || 'Registration failed');
      }
    }, 450);
  };

  return (
    <div className="inspo-card signup-inspo-card">
      {/* Top Right Purple Liquid Wave Accent */}
      <div className="signup-top-wave">
        <svg
          viewBox="0 0 220 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradTopCorner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#190333" />
              <stop offset="60%" stopColor="#310960" />
              <stop offset="100%" stopColor="#531694" />
            </linearGradient>
            <filter id="topWaveShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-4" dy="8" stdDeviation="10" floodColor="#1a0438" floodOpacity="0.25" />
            </filter>
          </defs>
          <path
            d="M50 0 C70 40 100 70 140 85 C180 100 220 115 220 160 L220 0 Z"
            fill="url(#purpleGradTopCorner)"
            filter="url(#topWaveShadow)"
          />
        </svg>
      </div>

      {/* Main Form Content */}
      <div className="signup-card-body">
        <div className="signup-header-section">
          <h1 className="auth-title">Sign Up</h1>
        </div>

        {error && (
          <div className="inline-alert error-alert" role="alert">
            <span className="alert-icon">!</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Name Pill Input */}
          <div className="pill-input-group">
            <input
              id="signup-name"
              type="text"
              className="pill-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          {/* Email Id Pill Input */}
          <div className="pill-input-group">
            <input
              id="signup-email"
              type="email"
              className="pill-input"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Create Username Pill Input */}
          <div className="pill-input-group">
            <input
              id="signup-username"
              type="text"
              className="pill-input"
              placeholder="Create Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          {/* Create Password Pill Input */}
          <div className="pill-input-group password-group">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              className="pill-input"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
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

          {/* Terms & Condition Agreement with custom circular radio/checkbox */}
          <div className="terms-row">
            <button
              type="button"
              className={`custom-circle-check ${agreeTerms ? 'checked' : ''}`}
              onClick={() => setAgreeTerms(!agreeTerms)}
              aria-checked={agreeTerms}
              role="checkbox"
              id="terms-checkbox"
            >
              <span className="inner-dot" />
            </button>
            <label htmlFor="terms-checkbox" className="terms-label" onClick={() => setAgreeTerms(!agreeTerms)}>
              I do agree with the{' '}
              <button
                type="button"
                className="terms-link-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTermsModal(true);
                }}
              >
                Terms &amp; Contition
              </button>
            </label>
          </div>

          {/* Sign Up Primary Pill Button */}
          <button
            id="signup-submit-btn"
            type="submit"
            className="pill-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : 'Sign Up'}
          </button>
        </form>

        {/* Footer Navigation Link: Already have an account ? Sign In */}
        <div className="auth-footer-nav alt-nav">
          <span className="footer-prompt">Already have an account ? </span>
          <button
            type="button"
            className="footer-action-link"
            onClick={onNavigateLogin}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Left Swooping Fluid Wave & Bottom Wave Container */}
      <div className="signup-bottom-wave-container">
        <svg
          className="signup-wave-svg"
          viewBox="0 0 380 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradBottomWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#250547" />
              <stop offset="40%" stopColor="#1e0339" />
              <stop offset="85%" stopColor="#120124" />
              <stop offset="100%" stopColor="#2d0a5a" />
            </linearGradient>
            <filter id="bottomWaveShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#1a0438" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* S-curve sweeping from left edge down across bottom */}
          <path
            d="M 16 0 
               C 17 40, 5 95, 4 140 
               C 3 175, 12 210, 35 240 
               C 65 280, 115 285, 160 270 
               C 215 250, 240 290, 290 315 
               C 320 330, 355 338, 380 340 
               L 380 340 
               L 0 340 
               L 0 70 
               C 8 40, 15 15, 16 0 Z"
            fill="url(#purpleGradBottomWave)"
            filter="url(#bottomWaveShadow)"
          />
        </svg>

        {/* Inspirational Branding Typography in the Bottom Wave */}
        <div className="bottom-wave-branding">
          <p className="branding-line-1">Experience Life</p>
          <p className="branding-line-2">With a touch of Nature</p>
        </div>
      </div>

      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => setAgreeTerms(true)}
      />
    </div>
  );
}
