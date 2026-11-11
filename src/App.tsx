import { LessonViewer } from "./components/lessons/LessonViewer";
import { SimulationPlayer } from "./components/simulations/SimulationPlayer";
import { circuitBreakerLesson } from "./content/lessons/circuit-breaker";
import { circuitBreakerSimulation } from "./content/simulations/circuit-breaker";

function App() {
  return (
    <>
      <LessonViewer lesson={circuitBreakerLesson} />

      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-8">
        <SimulationPlayer simulation={circuitBreakerSimulation} />
      </div>
    </>
  );
}

export default App;

