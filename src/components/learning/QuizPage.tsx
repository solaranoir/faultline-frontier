
import { Link, useParams } from "react-router-dom";
import { QuizPlayer } from "../quizzes/QuizPlayer";
import {
  getLearningModule,
  getLessonPath,
} from "../../content/registry";
import { NotFoundPage } from "./NotFoundPage";

export function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getLearningModule(slug) : undefined;

  if (!module?.quiz) {
    return <NotFoundPage />;
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <Link
        to={getLessonPath(module.lesson.slug)}
        className="text-sm text-teal-400 underline"
      >
        Back to lesson
      </Link>

      <QuizPlayer
        key={module.quiz.id}
        quiz={module.quiz}
      />
    </main>
  );
}

