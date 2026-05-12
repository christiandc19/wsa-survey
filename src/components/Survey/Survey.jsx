import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ResultScreen from "./components/ResultScreen";
import SurveyLanding from "./components/SurveyLanding";
import LeadCaptureScreen from "./components/LeadCaptureScreen";
import SessionTimeoutModal from "./components/SessionTimeoutModal";
import SurveyQuestionLayout from "./components/SurveyQuestionLayout";
import { getSurveyClient } from "./config/clients";
import { getSurvey } from "./config/surveys";
import { getSurveyResult } from "./utils/surveyUtils";
import { createLead } from "../../services/widgetApi";
import "./Survey.css";

const STORAGE_PREFIX = "wsa-survey-state";
const WARNING_TIMEOUT_MS = 8 * 60 * 1000;
const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

const DEFAULT_ANSWERS = {
  whoFor: { label: "Mom", value: "mom" },
};

const DEFAULT_LEAD = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
};

export default function Survey() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientKey, surveyKey } = useParams();

  const resolvedClientKey = clientKey || "evergreen-heights";
  const resolvedSurveyKey = surveyKey || "senior-living";

  const survey = getSurvey(resolvedSurveyKey);
  const client = getSurveyClient(resolvedClientKey);
  const storageKey = `${STORAGE_PREFIX}-${resolvedClientKey}-${resolvedSurveyKey}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  const [lead, setLead] = useState(DEFAULT_LEAD);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const totalSteps = survey?.questions?.length || 0;
  const isStartRoute = location.pathname.endsWith("/start");
  const isResultsRoute = location.pathname.endsWith("/results");
  const isLandingRoute = !isStartRoute && !isResultsRoute;
  const isQuestionFlow = isStartRoute && currentIndex < totalSteps;
  const isLeadCaptureStep =
    isStartRoute && currentIndex >= totalSteps && !leadSubmitted;
  const isComplete = currentIndex >= totalSteps && leadSubmitted;

  const currentQuestion =
    survey && currentIndex < totalSteps ? survey.questions[currentIndex] : null;

  const result = useMemo(() => {
    if (!survey) return null;
    return getSurveyResult(answers, survey);
  }, [answers, survey]);

  // Restores saved survey progress from localStorage.
  useEffect(() => {
    if (!survey || !client) {
      setIsHydrated(true);
      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);

        setCurrentIndex(
          typeof parsed.currentIndex === "number" ? parsed.currentIndex : 0
        );

        setAnswers(
          parsed.answers && typeof parsed.answers === "object"
            ? parsed.answers
            : DEFAULT_ANSWERS
        );

        setLead(
          parsed.lead && typeof parsed.lead === "object"
            ? parsed.lead
            : DEFAULT_LEAD
        );

        setLeadSubmitted(!!parsed.leadSubmitted);
      }
    } catch (error) {
      console.error("Failed to restore survey state:", error);
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey, survey, client]);

  // Auto-saves survey progress after hydration.
  useEffect(() => {
    if (!isHydrated || !survey || !client) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          currentIndex,
          answers,
          lead,
          leadSubmitted,
        })
      );
    } catch (error) {
      console.error("Failed to save survey state:", error);
    }
  }, [
    currentIndex,
    answers,
    lead,
    leadSubmitted,
    isHydrated,
    storageKey,
    survey,
    client,
  ]);

  // Keeps the route in sync with the survey completion state.
  useEffect(() => {
    if (!isHydrated || !survey) return;

    const basePath = `/assessments/${resolvedClientKey}/${resolvedSurveyKey}`;

    if (isComplete && !isResultsRoute) {
      navigate(`${basePath}/results`, { replace: true });
      return;
    }

    if (!isComplete && isResultsRoute) {
      navigate(`${basePath}/start`, { replace: true });
    }
  }, [
    isHydrated,
    isComplete,
    isResultsRoute,
    navigate,
    resolvedClientKey,
    resolvedSurveyKey,
    survey,
  ]);

  // Shows a polished inactivity warning before the survey session expires.
  useEffect(() => {
    const handleTimeout = () => {
      setShowTimeoutWarning(false);
      navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}`, {
        replace: true,
      });
    };

    const resetTimers = () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);

      warningTimerRef.current = setTimeout(() => {
        setShowTimeoutWarning(true);
      }, WARNING_TIMEOUT_MS);

      timerRef.current = setTimeout(() => {
        handleTimeout();
      }, SESSION_TIMEOUT_MS);
    };

    const handleActivity = () => {
      // Activity resets the timers, but does not automatically close the modal.
      // The user should intentionally click "Continue Assessment".
      resetTimers();
    };

    const events = ["click", "keydown", "scroll", "mousemove", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    resetTimers();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [navigate, resolvedClientKey, resolvedSurveyKey]);

  const handleStart = () => {
    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/start`);
  };

  const handleAnswer = (question, value) => {
    if (!question) return;

    const selectedOption = question.options.find((opt) => opt.value === value);

    if (!selectedOption) return;

    // Supports multi-select questions by toggling selected options on/off.
    if (question.multi) {
      setAnswers((prev) => {
        const currentAnswers = Array.isArray(prev[question.id])
          ? prev[question.id]
          : [];

        const alreadySelected = currentAnswers.some(
          (answer) => answer.value === value
        );

        return {
          ...prev,
          [question.id]: alreadySelected
            ? currentAnswers.filter((answer) => answer.value !== value)
            : [...currentAnswers, selectedOption],
        };
      });

      return;
    }

    // Existing single-select behavior.
    setAnswers((prev) => ({
      ...prev,
      [question.id]: selectedOption,
    }));
  };

  const handleBack = () => {
    if (currentIndex > 0 && currentIndex <= totalSteps) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const currentAnswer = answers[currentQuestion.id];
    const hasAnswer = currentQuestion.multi
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : !!currentAnswer;

    if (!hasAnswer) return;

    const isLastQuestion = currentIndex === totalSteps - 1;

    if (isLastQuestion) {
      setCurrentIndex(totalSteps);
      navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/start`, {
        replace: true,
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleLeadSubmit = async (leadData) => {
    setLead(leadData);

    try {
      // Sends completed survey lead data to the backend/dashboard.
      await createLead({
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        source: "survey",
        clientKey: resolvedClientKey,
        formKey: resolvedSurveyKey,
        message: `Survey completed: ${result?.title || "Survey Result"}`,
        details: {
          surveyKey: resolvedSurveyKey,
          surveyResult: result?.title || "Survey Result",
          surveyScore: result?.score || null,
          surveyAnswersJson: JSON.stringify(answers),
          browser: navigator.userAgent,
          referrer: document.referrer,
        },
        conversations: [
          {
            sender: "system",
            message: `Survey completed: ${result?.title || "Survey Result"}`,
          },
        ],
      });

      setLeadSubmitted(true);
      navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/results`, {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to submit survey lead:", error);
      alert("Something went wrong while saving your survey. Please try again.");
    }
  };

  const handleRestart = () => {
    setAnswers(DEFAULT_ANSWERS);
    setLead(DEFAULT_LEAD);
    setLeadSubmitted(false);
    setCurrentIndex(0);
    localStorage.removeItem(storageKey);
    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}`, {
      replace: true,
    });
  };

  const handlePrimaryResultAction = () => {
    const actions = client?.survey?.actions || {};
    let url = actions.primary;

    if (result?.key === "memory-support") {
      url = actions.memory || url;
    }

    if (
      result?.key === "assisted-living" ||
      result?.key === "supportive-care"
    ) {
      url = actions.assisted || url;
    }

    if (url) {
      window.location.href = url;
    }
  };

  const handleContinueSession = () => {
    setShowTimeoutWarning(false);
  };

  const handleExitSurvey = () => {
    setShowTimeoutWarning(false);
    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}`, {
      replace: true,
    });
  };

  const timeoutModal = (
    <SessionTimeoutModal
      open={showTimeoutWarning}
      onContinue={handleContinueSession}
      onExit={handleExitSurvey}
    />
  );

  if (!survey) {
    return <div>Survey config not found for "{resolvedSurveyKey}".</div>;
  }

  if (!client) {
    return <div>Client config not found for "{resolvedClientKey}".</div>;
  }

  if (!client?.survey?.enabled) {
    return <div>Survey is not available for this client.</div>;
  }

  if (!isHydrated) {
    return null;
  }

  if (isLandingRoute) {
    return (
      <>
        {timeoutModal}
        <SurveyLanding
          title={survey.landing.title}
          subtitle={survey.landing.subtitle}
          cta={client?.survey?.landing?.ctaLabel || survey.landing.cta}
          onStart={handleStart}
          client={client}
          surveyKey={resolvedSurveyKey}
        />
      </>
    );
  }

  if (isQuestionFlow) {
    return (
      <>
        {timeoutModal}
        <SurveyQuestionLayout
          title={client?.communityName || "Assessment"}
          subtitle={`Step ${currentIndex + 1} of ${totalSteps}`}
          section={currentQuestion?.section}
          question={
            typeof currentQuestion?.title === "object"
              ? currentQuestion.title[answers?.whoFor?.value] ||
                currentQuestion.title.someoneElse
              : currentQuestion?.title
          }
          intro={
            typeof currentQuestion?.intro === "object"
              ? currentQuestion.intro[answers?.whoFor?.value] ||
                currentQuestion.intro.someoneElse
              : currentQuestion?.intro
          }
          helperSubtitle={currentQuestion?.subtitle}
          options={currentQuestion?.options || []}
          selected={
            currentQuestion?.multi
              ? answers[currentQuestion?.id]?.map((answer) => answer.value) || []
              : answers[currentQuestion?.id]?.value
          }
          onSelect={(val) => handleAnswer(currentQuestion, val)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentIndex + 1}
          totalSteps={totalSteps}
          showBack={currentIndex > 0}
          help={currentQuestion?.help}
        />
      </>
    );
  }

  if (isLeadCaptureStep) {
    return (
      <>
        {timeoutModal}
        <LeadCaptureScreen
          client={client}
          result={result}
          initialValues={lead}
          onBack={() => setCurrentIndex(totalSteps - 1)}
          onSubmit={handleLeadSubmit}
        />
      </>
    );
  }

  if (isResultsRoute && isComplete) {
    return (
      <div className="survey-shell">
        {timeoutModal}
        <div className="survey-container">
          <ResultScreen
            result={result}
            client={client}
            onRestart={handleRestart}
            onPrimaryAction={handlePrimaryResultAction}
          />
        </div>
      </div>
    );
  }

  return null;
}
