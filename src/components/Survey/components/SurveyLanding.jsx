import React from "react";

export default function SurveyLanding({
  title,
  subtitle,
  cta,
  onStart,
  client,
  surveyKey,
}) {

  const surveyBranding = client?.survey?.branding || {};
  const surveyLanding = client?.survey?.landing || {};

  const SURVEY_ASSET_BASE =
    "https://cdn.websmartassistant.com/survey-assets/hero-images";

  const defaultSurveyImages = {
    "senior-living": `${SURVEY_ASSET_BASE}/senior-living-survey-hero.webp`,
    downsizing: `${SURVEY_ASSET_BASE}/downsizing-survey-hero.webp`,
    "memory-support": `${SURVEY_ASSET_BASE}/memory-survey-hero.webp`,
    affordability: `${SURVEY_ASSET_BASE}/affordability-survey-hero.webp`,
  };
  
  const heroImage =
    surveyBranding.heroImages?.[surveyKey] ||
    surveyBranding.heroImage ||
    defaultSurveyImages[surveyKey] ||
    "/images/surveys/default-hero.webp";

  const overlayColor =
    surveyBranding.overlayColor || "rgba(15, 94, 104, 0.55)";
  const textColor = surveyBranding.textColor || "#ffffff";
  const primaryColor = surveyBranding.primaryColor || "#8b2c1a";
  const primaryHoverColor = surveyBranding.primaryHoverColor || "#6f2215";
  const logo = surveyBranding.logo || client?.logoUrl;
  const kicker = surveyLanding.kicker || client?.communityName;
  const trustNote = surveyLanding.trustNote;

  const landingStyle = heroImage
    ? { backgroundImage: `url(${heroImage})` }
    : undefined;

  return (
    <div className="survey-landing" style={landingStyle}>
      <div
        className="survey-landing-overlay"
        style={{ background: overlayColor }}
      />

      <div className="survey-landing-inner fade-up" style={{ color: textColor }}>
        {logo && (
          <img
            src={logo}
            alt={client?.communityName || "Client logo"}
            className="survey-landing-logo"
          />
        )}

        {kicker && <p className="survey-landing-kicker">{kicker}</p>}

        <h1 className="survey-landing-title">{title}</h1>

        <p className="survey-landing-subtitle">{subtitle}</p>

        <button
          type="button"
          className="survey-landing-btn"
          style={{ background: primaryColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = primaryHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = primaryColor;
          }}
          onClick={onStart}
        >
          {cta}
        </button>

        {trustNote && (
          <p className="survey-landing-trust-note">{trustNote}</p>
        )}
      </div>
    </div>
  );
}