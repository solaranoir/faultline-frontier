
import { useParams } from "react-router-dom";
import { LessonViewer } from "../lessons/LessonViewer";
import { getLearningModule } from "../../content/registry";
import { NotFoundPage } from "./NotFoundPage";

export function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getLearningModule(slug) : undefined;

  if (!module) {
    return <NotFoundPage />;
  }

  return (
    <LessonViewer
      lesson={module.lesson}
      availableActivities={{
        simulation: Boolean(module.simulation),
        quiz: Boolean(module.quiz),
      }}
    />
  );
}

