import "./SurveyHub.css";

export default function SurveyHub() {

const surveys = [
  {
    title: "Is Senior Living the Right Next Step?",
    description:
      "Answer a few quick questions to explore whether senior living may be a good fit.",

    image:
      "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/senior-living-survey-hero.webp",

    link: "https://websmartassistant.com/",
  },

  {
    title: "Could Memory Support Be the Right Next Step?",

    description:
      "Explore signs, care needs, and support options for memory-related concerns.",

    image:
        "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/memory-survey-hero.webp",
      link: "https://websmartassistant.com/",
  },

  {
    title: "Would Downsizing Make Life Easier Right Now?",

    description:
      "See whether simplifying the home or daily routine could reduce stress.",

    image:
      "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/downsizing-survey-hero.webp",

    link: "https://websmartassistant.com/",
  },

  {
    title: "What Could Senior Living Cost for Your Situation?",

    description:
      "Understand common cost factors and what may affect your planning.",

    image:
      "https://web-smart-assistant.s3.us-west-1.amazonaws.com/survey/images/affordability-survey-hero.webp",

    link: "https://websmartassistant.com/",
  },
];


  return (
    <main className="survey-hub">
      <section className="survey-hub-header">
        <span>Free Senior Living Assessments</span>
        <h1>Find the right next step with confidence.</h1>
        <p>
          Choose a quick assessment below. Each one is simple, private, and
          designed to help families make informed decisions.
        </p>
      </section>

      <section className="survey-grid">
        {surveys.map((survey) => (
          <a
            key={survey.surveyKey}
            href={survey.link}
            target="_blank"
            rel="noopener noreferrer"
            className="survey-card"
          >
            <img src={survey.image} alt="" className="survey-card-image" />

            <div className="survey-card-body">
              <h2>{survey.title}</h2>
              <p>{survey.description}</p>

              <div className="survey-card-action">
                Learn More <span>→</span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}