
import { Link, useParams } from "react-router-dom";
import { SimulationPlayer } from "../simulations/SimulationPlayer";
import {
  getLearningModule,
  getLessonPath,
} from "../../content/registry";
import { NotFoundPage } from "./NotFoundPage";

export function SimulationPage() {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getLearningModule(slug) : undefined;

  if (!module?.simulation) {
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

      <SimulationPlayer
        key={module.simulation.id}
        simulation={module.simulation}
      />

      {module.quiz && (
        <Link
          to={`${getLessonPath(module.lesson.slug)}/quiz`}
          className="inline-block rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950"
        >
          Continue to Knowledge Check
        </Link>
      )}
    </main>
  );
}

