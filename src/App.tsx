
import { LessonViewer } from "./components/lessons/LessonViewer";
import { circuitBreakerLesson } from "./content/lessons/circuit-breaker";

function App() {
  return <LessonViewer lesson={circuitBreakerLesson} />;
}

export default App;

