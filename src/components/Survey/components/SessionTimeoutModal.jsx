import "./SessionTimeoutModal.css";

export default function SessionTimeoutModal({ open, onContinue, onExit }) {
  if (!open) return null;

  return (
    <div className="survey-timeout-overlay" role="dialog" aria-modal="true">
      <div className="survey-timeout-modal">
        <div className="survey-timeout-icon" aria-hidden="true">
          ⏳
        </div>

        <h2>Still reviewing your assessment?</h2>

        <p>
          Your progress has been automatically saved. For your privacy, this
          session will expire soon if there is no activity.
        </p>

        <div className="survey-timeout-countdown">
          Select continue to keep working on your assessment.
        </div>

        <div className="survey-timeout-actions">
          <button
            type="button"
            className="survey-timeout-secondary"
            onClick={onExit}
          >
            Exit
          </button>

          <button
            type="button"
            className="survey-timeout-primary"
            onClick={onContinue}
          >
            Continue Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
