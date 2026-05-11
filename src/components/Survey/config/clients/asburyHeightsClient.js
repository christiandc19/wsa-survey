// src/components/Survey/config/clients/asburyHeightsClient.js

const asburyHeightsClient = {
  clientKey: "asbury-heights",

  clientName: "Asbury Heights Senior Living",

  logoUrl:
    "https://web-smart-assistant.s3.us-west-1.amazonaws.com/clients/asbury-heights/asbury-heights.png",

  headerTitle: "Chat with Asbury Heights",
  headerSubtitle: "Guidance for your next chapter",

  welcomeMessage:
    "Hi there 👋 I'm here to help you explore senior living options at Asbury Heights.",

  launcherTitle: "Asbury Heights",
  launcherSubtitle: "Explore your options",

  theme: {
    primary: "#2D5B4F",
    primaryHover: "#23473D",
    accent: "#D6B36A",

    headerBg: "#2D5B4F",
    headerText: "#ffffff",
    headerSubtitle: "#D7E6E1",

    botBubbleBg: "#F4F7F6",
    userBubbleBg: "#2D5B4F",
    textDark: "#1F2937",

    launcherBg: "#2D5B4F",
    launcherAccent: "#D6B36A",

    backButtonBg: "#2D5B4F",
    backButtonText: "#ffffff",
  },

  survey: {
    enabled: true,

    landing: {
      kicker: "FREE ASSESSMENT",

      title: "Find the Right Senior Living Option",

      subtitle:
        "Answer a few simple questions and get personalized guidance for you or your loved one.",

      buttonText: "Start Assessment",

      trustNote: "Takes 2–3 minutes. No obligation.",

      overlayColor: "rgba(0, 0, 0, 0.45)",

      textColor: "#ffffff",

      primaryColor: "#2D5B4F",

      primaryHoverColor: "#23473D",
    },

    branding: {
      heroImages: {
        "senior-living":
          "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/senior-living-survey-hero.webp",

        downsizing:
          "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/downsizing-survey-hero.webp",

        "memory-support":
          "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/memory-support-survey-hero.webp",

        affordability:
          "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/affordability-survey-hero.webp",

        "care-needs":
          "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/care-needs-survey-hero.webp",
      },
    },
  },
};

export default asburyHeightsClient;