export default function TermsModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className="modal-header">
          <div className="modal-badge">✦</div>
          <h3>Terms &amp; Conditions</h3>
          <p className="modal-subtitle">Nature &amp; Community Guidelines</p>
        </div>
        <div className="modal-body">
          <h4>1. Privacy &amp; Data Security</h4>
          <p>
            We prioritize the sanctity of your private information. Your credentials and personal
            details are encrypted and never sold to third parties.
          </p>
          <h4>2. Mindful Community</h4>
          <p>
            Members agree to engage with empathy, respectful communication, and appreciation for
            shared spaces. Harassment, spam, or disruptive behavior will lead to account suspension.
          </p>
          <h4>3. Account Responsibility</h4>
          <p>
            You are responsible for safeguarding your login credentials. If you detect unauthorized
            access, report it to our team immediately.
          </p>
          <h4>4. Sustainable Infrastructure</h4>
          <p>
            Our platform operates with carbon-conscious hosting practices and minimal digital waste.
          </p>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="pill-btn primary"
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            I Agree &amp; Accept
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
