
import type { Lesson } from "../../schemas/lesson";

type LessonHeaderProps = {
  lesson: Lesson;
};

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <header className="space-y-5">
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-frontier-panel px-3 py-1 text-frontier-teal">
          {lesson.category.replaceAll("-", " ")}
        </span>
        <span className="rounded-full bg-frontier-panel px-3 py-1 capitalize">
          {lesson.difficulty}
        </span>
        <span className="rounded-full bg-frontier-panel px-3 py-1">
          {lesson.estimatedMinutes} min
        </span>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-frontier-amber sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-3 text-lg text-frontier-text/80">
          {lesson.summary}
        </p>
      </div>

      <section
        aria-labelledby="objectives-heading"
        className="rounded-xl border border-frontier-teal/30 bg-frontier-panel p-5"
      >
        <h2
          id="objectives-heading"
          className="text-xl font-semibold"
        >
          Learning objectives
        </h2>

        <ul className="mt-3 list-inside list-disc space-y-2">
          {lesson.learningObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      {lesson.prerequisites.length > 0 && (
        <section aria-label="Prerequisites">
          <h2 className="font-semibold">Before you begin</h2>
          <ul className="mt-2 list-inside list-disc">
            {lesson.prerequisites.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </section>
      )}
    </header>
  );
}

