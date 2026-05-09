import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Survey from "./components/Survey/Survey";
import ToolsHome from "./components/ToolsHome/ToolsHome";
import SurveyHub from "./components/Survey/SurveyHub";

function AppContent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToolsHome />} />

        <Route path="/how-it-works" element={<ToolsHome />} />

        <Route path="/assessments" element={<SurveyHub />} />

        <Route
          path="/assessments/:clientKey/:surveyKey"
          element={<Survey />}
        />

        <Route
          path="/assessments/:clientKey/:surveyKey/start"
          element={<Survey />}
        />

        <Route
          path="/assessments/:clientKey/:surveyKey/results"
          element={<Survey />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}