import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const userInitial = (currentUser?.name || 'U').charAt(0).toUpperCase();

  return (
    <div className="profile-page-container">
      <div className="profile-card-shell">
        {/* Profile Header */}
        <div className="profile-banner">
          <div className="profile-avatar-large">
            <span>{userInitial}</span>
            <span className="avatar-status-indicator" title="Active session" />
          </div>
          <div className="profile-titles">
            <h1 className="profile-display-name">{currentUser?.name || 'Student'}</h1>
            <p className="profile-handle">@{currentUser?.username || 'username'}</p>
            <span className="profile-email-tag">{currentUser?.email || 'email@domain.com'}</span>
          </div>
        </div>

        {/* Profile Data Sections */}
        <div className="profile-details-grid">
          <div className="profile-detail-box">
            <span className="detail-label">Active Learning Goal</span>
            <strong className="detail-value">{currentUser?.learningGoal || 'MERN Stack'}</strong>
            <button
              type="button"
              className="detail-action-link"
              onClick={() => navigate('/dashboard')}
            >
              Change on Dashboard &rarr;
            </button>
          </div>

          <div className="profile-detail-box">
            <span className="detail-label">Diagnostic Status</span>
            <strong className="detail-value text-amber">
              {currentUser?.assessmentStatus || 'Not Completed'}
            </strong>
            <button
              type="button"
              className="detail-action-link"
              onClick={() => navigate('/assessment')}
            >
              Begin Assessment &rarr;
            </button>
          </div>

          <div className="profile-detail-box">
            <span className="detail-label">Session Security</span>
            <strong className="detail-value text-emerald">Active &bull; Encrypted</strong>
            <span className="detail-subnote">Token stored securely in browser</span>
          </div>

          <div className="profile-detail-box">
            <span className="detail-label">Competency Level</span>
            <strong className="detail-value text-muted">
              {currentUser?.overallCompetency || 'Not Available'}
            </strong>
            <span className="detail-subnote">Calculated after assessment</span>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-action-footer">
          <button
            type="button"
            className="pill-cta-btn secondary-style"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            className="pill-cta-btn danger-style"
            onClick={handleSignOut}
          >
            Sign Out of Platform
          </button>
        </div>
      </div>
    </div>
  );
}
