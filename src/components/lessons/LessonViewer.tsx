import type { Lesson } from "../../schemas/lesson";
import { LessonHeader } from "./LessonHeader";
import { LessonContent } from "./LessonContent";
import {
  LessonActivities,
  type AvailableActivities,
} from "./LessonActivities";

export type LessonViewerProps = {
  lesson: Lesson;
  availableActivities?: AvailableActivities;
};

export function LessonViewer({
  lesson,
  availableActivities,
}: LessonViewerProps) {
  return (
    <main className="min-h-screen bg-frontier-bg px-4 py-10 text-frontier-text sm:px-8">
      <article className="mx-auto max-w-3xl space-y-10">
        <nav aria-label="Breadcrumb">
          <span className="text-sm font-semibold tracking-widest text-frontier-teal">
            FAULTLINE FRONTIER / LESSONS
          </span>
        </nav>

        <LessonHeader lesson={lesson} />

        <div className="border-t border-white/10 pt-8">
          <LessonContent blocks={lesson.content} />
        </div>

        <div className="border-t border-white/10 pt-8">
          <LessonActivities
             lesson={lesson}
             availableActivities={availableActivities}
          />
        </div>
      </article>
    </main>
  );
}

