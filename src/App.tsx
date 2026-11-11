
import { LessonViewer } from "./components/lessons/LessonViewer";
import { SimulationPlayer } from "./components/simulations/SimulationPlayer";
import { QuizPlayer } from "./components/quizzes/QuizPlayer";

import { circuitBreakerLesson } from "./content/lessons/circuit-breaker";
import { circuitBreakerSimulation } from "./content/simulations/circuit-breaker";
import { circuitBreakerQuiz } from "./content/quizzes/circuit-breaker";

function App() {
  return (
    <>
      <LessonViewer lesson={circuitBreakerLesson} />

      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-12 sm:px-8">
        <SimulationPlayer simulation={circuitBreakerSimulation} />
        <QuizPlayer quiz={circuitBreakerQuiz} />
      </div>
    </>
  );
}

export default App;

