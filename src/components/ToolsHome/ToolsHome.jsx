import React from "react";
import { Link } from "react-router-dom";
import "./ToolsHome.css";

export default function ToolsHome() {
  return (
    <main className="tools-home">
      {/* Left hero section */}
      <section className="tools-home-left">
        <div className="tools-home-overlay" />

        <div className="tools-home-content">
          <div className="tools-home-logo">
            <img
              src="https://web-smart-assistant.s3.us-west-1.amazonaws.com/clients/smart-web-assistant/logo-white.png"
              alt="WebSmartAssistant"
            />
          </div>

            <h1>
              Understand your audience.
              <br />
              <span>Make better decisions.</span>
            </h1>

          <p>
            Create simple senior living surveys that help families, residents,
            and communities discover the right next step.
          </p>

          <Link
            to="/assessments/"
            className="tools-home-button"
          >
            Explore Surveys
          </Link>
        </div>
      </section>

      {/* Right overview section */}
      <section className="tools-home-right">
        <div className="tools-home-info">
          <p className="tools-home-kicker">
            Simple insights in <strong>about 4 minutes</strong>
          </p>

          <div className="tools-home-feature">
            <span>◎</span>
            <div>
              <h3>Smarter Decisions</h3>
              <p>
                Collect meaningful feedback from residents, families, and
                prospects.
              </p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>◷</span>
            <div>
              <h3>Easy to Complete</h3>
              <p>
                Simple, mobile-friendly surveys designed for better engagement.
              </p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>⌂</span>
            <div>
              <h3>Built for Senior Living</h3>
              <p>Assess care needs, lifestyle preferences, and community fit.</p>
            </div>
          </div>

          <div className="tools-home-feature">
            <span>▥</span>
            <div>
              <h3>Actionable Results</h3>
              <p>Turn responses into clear next steps and better conversations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom footer bar */}
      <footer className="tools-home-footer">
        <span>🔒 Private and Secure</span>
        <span>
          Powered by <strong>WebSmartAssistant</strong>
        </span>
      </footer>
    </main>
  );
}