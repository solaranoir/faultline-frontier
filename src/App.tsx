
import { BrowserRouter } from "react-router-dom";
import { LearningRoutes } from "./components/learning/LearningRoutes";

function App() {
  return (
    <BrowserRouter>
      <LearningRoutes />
    </BrowserRouter>
  );
}

export default App;

