import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import SurveyEmbed from "./components/SurveyEmbed/SurveyEmbed";

import "./components/SurveyEmbed/SurveyEmbed.css";

window.WebSmartAssistantSurvey = function (config = {}) {
  const rootId = `websmartassistant-survey-root-${
    config.surveyKey || "default"
  }`;

  const existing = document.getElementById(rootId);

  if (existing) {
    existing.remove();
  }

  const container = document.createElement("div");

  container.id = rootId;

  const target = config.target
    ? document.querySelector(config.target)
    : document.body;

  if (!target) {
    console.error("WebSmartAssistantSurvey target not found:", config.target);
    return;
  }

  target.appendChild(container);

  const root = ReactDOM.createRoot(container);

  root.render(
    <MemoryRouter>
      <SurveyEmbed
        clientKey={config.clientKey}
        surveyKey={config.surveyKey || "senior-living"}
      />
    </MemoryRouter>
  );
};