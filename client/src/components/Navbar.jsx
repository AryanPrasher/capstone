import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      status: 'active'
    },
    {
      to: '/assessment',
      label: 'Assessment',
      icon: '🎯',
      status: 'available'
    },
    {
      to: '/learning-path',
      label: 'Learning Path',
      icon: '🗺️',
      status: 'locked',
      badge: 'Complete assessment first'
    },
    {
      to: '/progress',
      label: 'Progress',
      icon: '📈',
      status: 'locked',
      badge: 'Complete assessment first'
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: '👤',
      status: 'available'
    }
  ];

  const userInitial = (currentUser?.name || 'U').charAt(0).toUpperCase();

  return (
    <header className="platform-navbar">
      <div className="navbar-container">
        {/* Brand & Platform Identity */}
        <NavLink to="/dashboard" className="navbar-brand">
          <span className="brand-logo-gem">✦</span>
          <div className="brand-text-wrap">
            <span className="platform-title">CompetencyAI</span>
            <span className="platform-tagline">Skill Gap &amp; Adaptive Learning</span>
          </div>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Nav Links */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''} ${
                  item.status === 'locked' ? 'nav-item-locked' : ''
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-text">{item.label}</span>
              {item.badge && (
                <span className="nav-locked-badge" title={item.badge}>
                  Assessment first
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Session & Logout Action */}
        <div className="navbar-user-actions">
          <NavLink to="/profile" className="user-profile-chip" title="View Profile">
            <div className="user-nav-avatar">{userInitial}</div>
            <div className="user-nav-info">
              <span className="user-nav-name">{currentUser?.name || 'Student'}</span>
              <span className="user-nav-goal">{currentUser?.learningGoal || 'MERN Stack'}</span>
            </div>
          </NavLink>

          <button
            type="button"
            className="nav-logout-btn"
            onClick={handleLogout}
            title="Sign out of your session"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
