
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { LessonPage } from "./LessonPage";
import { SimulationPage } from "./SimulationPage";
import { QuizPage } from "./QuizPage";
import { NotFoundPage } from "./NotFoundPage";
import { getLessonPath } from "../../content/registry";

export function LearningRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={getLessonPath("circuit-breaker-recovery")}
            replace
          />
        }
      />

      <Route
        path="/lessons/:slug"
        element={<LessonPage />}
      />

      <Route
        path="/lessons/:slug/simulation"
        element={<SimulationPage />}
      />

      <Route
        path="/lessons/:slug/quiz"
        element={<QuizPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

