import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { toast, dismissToast } = useAuth();

  return (
    <div className="platform-shell">
      {/* Ambient background matching login theme */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-grid-overlay" />

      {/* Unified Navbar */}
      <Navbar />

      {/* Floating Toast Notification */}
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

      {/* Main Routed Page Content */}
      <main className="platform-main-content">
        <Outlet />
      </main>

      {/* Professional Platform Footer */}
      <footer className="platform-footer">
        <div className="footer-inner">
          <p className="footer-workflow-tagline">
            <strong>Core Workflow:</strong> Assessment → Gap Identification → Personalized Training → Re-assessment → Progress
          </p>
          <p className="footer-copyright">
            CompetencyAI &copy; {new Date().getFullYear()} — Built for intelligent competency mastery
          </p>
        </div>
      </footer>
    </div>
  );
}
