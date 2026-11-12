
import { Link } from "react-router-dom";
import type { Lesson } from "../../schemas/lesson";
import { getLessonPath } from "../../content/registry";

export type AvailableActivities = {
  simulation: boolean;
  quiz: boolean;
};

type Props = {
  lesson: Lesson;
  availableActivities?: AvailableActivities;
};

export function LessonActivities({
  lesson,
  availableActivities = {
    simulation: false,
    quiz: false,
  },
}: Props) {
  const basePath = getLessonPath(lesson.slug);

  const activities = [
    {
      id: lesson.simulationId,
      title: "The Failure Range",
      description: "Explore a system simulation.",
      available: availableActivities.simulation,
      path: `${basePath}/simulation`,
    },
    {
      id: lesson.quizId,
      title: "Knowledge Check",
      description: "Test your understanding.",
      available: availableActivities.quiz,
      path: `${basePath}/quiz`,
    },
    {
      id: lesson.codingChallengeId,
      title: "The Proving Grounds",
      description: "Solve a Python challenge.",
      available: false,
      path: "",
    },
  ].filter((activity) => Boolean(activity.id));

  if (activities.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="activities-heading"
      className="space-y-4"
    >
      <h2
        id="activities-heading"
        className="text-2xl font-bold text-amber-400"
      >
        Continue your expedition
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5"
          >
            <h3 className="text-lg font-semibold">
              {activity.title}
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              {activity.description}
            </p>

            {activity.available ? (
              <Link
                to={activity.path}
                className="mt-4 inline-block rounded-lg bg-amber-500 px-4 py-2 font-semibold text-slate-950"
              >
                Start activity
                <span className="sr-only">
                  : {activity.title}
                </span>
              </Link>
            ) : (
              <p className="mt-4 text-xs uppercase tracking-wider text-amber-400">
                Coming soon
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

