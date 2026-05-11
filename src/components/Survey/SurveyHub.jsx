import { Link } from "react-router-dom";

export default function SurveyHub() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Choose an Assessment</h1>

      <ul>
        <li>
          <Link to="/assessments/evergreen-heights/senior-living">
            Senior Living Assessment
          </Link>
        </li>

        <li>
          <Link to="/assessments/evergreen-heights/care-needs">
            Care Needs Assessment
          </Link>
        </li>
      </ul>
    </div>
  );
}