import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Progress() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="locked-page-container">
      <div className="locked-card">
        <div className="locked-card-icon-wrap">
          <span className="locked-icon">📈</span>
          <span className="lock-sub-icon">🔒</span>
        </div>

        <div className="locked-badge">Complete assessment first</div>
        <h1 className="locked-page-title">Competency Progress Tracking</h1>
        <p className="locked-page-subtitle">
          Track how your skills improve over time as you complete targeted practice and take re-assessments.
        </p>

        <div className="analytics-placeholder-grid">
          <div className="metric-box-skeleton">
            <span className="skeleton-label">Initial Assessment Score</span>
            <span className="skeleton-data">&mdash; / 100</span>
          </div>
          <div className="metric-box-skeleton">
            <span className="skeleton-label">Identified Gaps</span>
            <span className="skeleton-data">&mdash; Topics</span>
          </div>
          <div className="metric-box-skeleton">
            <span className="skeleton-label">Competency Growth</span>
            <span className="skeleton-data">0.0%</span>
          </div>
        </div>

        <button
          type="button"
          className="pill-cta-btn"
          onClick={() => navigate('/assessment')}
        >
          <span>Take Initial Assessment</span>
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
}
