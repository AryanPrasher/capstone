import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LearningPath() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="locked-page-container">
      <div className="locked-card">
        <div className="locked-card-icon-wrap">
          <span className="locked-icon">🗺️</span>
          <span className="lock-sub-icon">🔒</span>
        </div>

        <div className="locked-badge">Complete assessment first</div>
        <h1 className="locked-page-title">Personalized Learning Path</h1>
        <p className="locked-page-subtitle">
          Your custom training modules are generated specifically from your identified competency gaps.
        </p>

        <div className="locked-steps-preview">
          <div className="preview-step-item active-step">
            <span className="step-num">1</span>
            <div className="step-info">
              <strong>Initial Assessment</strong>
              <p>Evaluate your strengths &amp; knowledge gaps in {currentUser?.learningGoal || 'MERN Stack'}</p>
            </div>
            <span className="step-status-tag pending">Pending</span>
          </div>

          <div className="step-connector-line" />

          <div className="preview-step-item">
            <span className="step-num">2</span>
            <div className="step-info">
              <strong>Gap Identification Algorithm</strong>
              <p>Detect specific areas that require targeted practice</p>
            </div>
            <span className="step-status-tag locked">Locked</span>
          </div>

          <div className="step-connector-line" />

          <div className="preview-step-item">
            <span className="step-num">3</span>
            <div className="step-info">
              <strong>Custom Training Recommendations</strong>
              <p>Curated micro-lessons and code exercises</p>
            </div>
            <span className="step-status-tag locked">Locked</span>
          </div>
        </div>

        <button
          type="button"
          className="pill-cta-btn"
          onClick={() => navigate('/assessment')}
        >
          <span>Go to Initial Assessment</span>
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
}
