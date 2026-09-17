import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoalSelector from '../components/GoalSelector';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const userName = currentUser?.name || 'Student';
  const learningGoal = currentUser?.learningGoal || 'Not Set';
  const assessmentStatus = currentUser?.assessmentStatus || 'Not Completed';
  const overallCompetency = currentUser?.overallCompetency || 'Not Available';

  return (
    <div className="dashboard-page-container">
      {/* 1. Welcome Banner */}
      <section className="welcome-banner-card">
        <div className="banner-content">
          <span className="banner-eyebrow">Student Learning Dashboard</span>
          <h1 className="welcome-heading">Welcome back, {userName}</h1>
          <p className="welcome-quote">
            &ldquo;Let&rsquo;s identify your strengths and build the skills you need.&rdquo;
          </p>
        </div>
        <div className="banner-visual-accent">
          <span className="sparkle-gem">✦</span>
        </div>
      </section>

      {/* 2. Your Learning Profile Summary Cards */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-heading">Your Learning Profile</h2>
          <span className="section-hint">Overview of your diagnostic readiness</span>
        </div>

        <div className="profile-stats-grid">
          {/* Tile 1: Learning Goal */}
          <div className="stat-card">
            <div className="stat-card-icon goal-icon-bg">🎯</div>
            <div className="stat-card-meta">
              <span className="stat-label">Learning Goal</span>
              <strong className="stat-value highlight-value">{learningGoal}</strong>
              <span className="stat-subtext">Active Target Track</span>
            </div>
          </div>

          {/* Tile 2: Assessment Status */}
          <div className="stat-card">
            <div className="stat-card-icon status-icon-bg">📋</div>
            <div className="stat-card-meta">
              <span className="stat-label">Assessment Status</span>
              <strong className="stat-value text-amber">{assessmentStatus}</strong>
              <span className="stat-subtext">Diagnostic Pending</span>
            </div>
          </div>

          {/* Tile 3: Overall Competency */}
          <div className="stat-card">
            <div className="stat-card-icon competency-icon-bg">📊</div>
            <div className="stat-card-meta">
              <span className="stat-label">Overall Competency</span>
              <strong className="stat-value text-muted">{overallCompetency}</strong>
              <span className="stat-subtext">Unlocks post-assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Prominent CTA: Start Your Skill Assessment */}
      <section className="assessment-cta-card">
        <div className="cta-content">
          <div className="cta-badge">Step 1 of your journey</div>
          <h2 className="cta-title">Start Your Skill Assessment</h2>
          <p className="cta-description">
            Take a short assessment to evaluate your current competency across different skills. 
            Your results will help us identify knowledge gaps and create a personalized learning path.
          </p>
          <div className="cta-action-row">
            <button
              type="button"
              className="pill-cta-btn"
              onClick={() => navigate('/assessment')}
            >
              <span>Start Assessment</span>
              <span className="arrow-icon">→</span>
            </button>
            <span className="cta-time-hint">⏱ ~30 mins &bull; 40 Questions &bull; Adaptive</span>
          </div>
        </div>
        <div className="cta-decorative-graphic">
          <div className="pulsing-halo" />
          <span className="cta-large-icon">🎯</span>
        </div>
      </section>

      {/* 4. Goal Selector: What do you want to learn? */}
      <section className="dashboard-section">
        <GoalSelector />
      </section>

      {/* 5. Two Column Empty State Section: Competency & Recommended Training */}
      <div className="dashboard-two-col-grid">
        {/* Your Competency Section */}
        <section className="dashboard-card competency-section">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Your Competency</h3>
              <p className="card-subtitle">Skill-wise diagnostic breakdown</p>
            </div>
            <span className="empty-badge">No data yet</span>
          </div>

          <div className="empty-state-box">
            <div className="empty-state-icon">📊</div>
            <h4 className="empty-state-title">No competency data available yet.</h4>
            <p className="empty-state-desc">
              After you complete your initial assessment, this section will track:
            </p>
            <ul className="competency-metrics-preview">
              <li><span className="bullet-gem">✦</span> Overall Competency Score</li>
              <li><span className="bullet-gem">✦</span> Skill-wise Mastery Breakdown</li>
              <li><span className="bullet-gem">✦</span> Strong Areas &amp; Proficiencies</li>
              <li><span className="bullet-gem">✦</span> Identified Competency Gaps</li>
            </ul>
          </div>
        </section>

        {/* Recommended Training Section */}
        <section className="dashboard-card training-section">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Recommended Training</h3>
              <p className="card-subtitle">Personalized learning modules</p>
            </div>
            <span className="empty-badge">Locked</span>
          </div>

          <div className="empty-state-box">
            <div className="empty-state-icon">📚</div>
            <h4 className="empty-state-title">Complete your initial assessment</h4>
            <p className="empty-state-desc">
              Complete your initial assessment to receive personalized training recommendations.
            </p>
            <div className="training-lock-preview">
              <div className="locked-skeleton-item">
                <span className="skeleton-pill" />
                <span className="skeleton-title" />
              </div>
              <div className="locked-skeleton-item">
                <span className="skeleton-pill" />
                <span className="skeleton-title" />
              </div>
            </div>
            <button
              type="button"
              className="pill-secondary-cta"
              onClick={() => navigate('/assessment')}
            >
              Take Assessment to Unlock
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
