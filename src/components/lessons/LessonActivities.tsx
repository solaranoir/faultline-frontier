
import type { Lesson } from "../../schemas/lesson";

type LessonActivitiesProps = {
  lesson: Lesson;
};

export function LessonActivities({
  lesson,
}: LessonActivitiesProps) {
  const activities = [
    {
      id: lesson.simulationId,
      title: "The Failure Range",
      description: "Explore a system simulation.",
    },
    {
      id: lesson.quizId,
      title: "Knowledge Check",
      description: "Test your understanding.",
    },
    {
      id: lesson.codingChallengeId,
      title: "The Proving Grounds",
      description: "Solve a Python challenge.",
    },
  ].filter(
    (activity): activity is {
      id: string;
      title: string;
      description: string;
    } => activity.id !== undefined
  );

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
        className="text-2xl font-bold text-frontier-amber"
      >
        Continue your expedition
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="rounded-xl border border-white/10 bg-frontier-panel p-5"
          >
            <h3 className="text-lg font-semibold">
              {activity.title}
            </h3>

            <p className="mt-2 text-sm text-frontier-text/70">
              {activity.description}
            </p>

            <p className="mt-4 text-xs uppercase tracking-wider text-frontier-amber">
              Coming soon
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

