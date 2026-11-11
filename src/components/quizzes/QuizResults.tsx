
import type { QuizResult } from "./quiz-utils";

type Props = {
  result: QuizResult;
  onRetry: () => void;
};

export function QuizResults({
  result,
  onRetry,
}: Props) {
  return (
    <section
      aria-label="Quiz results"
      aria-live="polite"
      className="space-y-5 rounded-xl border border-slate-700 bg-slate-800 p-6"
    >
      <div>
        <p className="text-sm uppercase tracking-widest text-slate-400">
          Assessment complete
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {result.score}%
        </h3>

        <p className="mt-2 font-semibold">
          {result.passed
            ? "Passed. Well done, explorer."
            : "Not quite. Review the feedback and try again."}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {result.earnedPoints} of {result.possiblePoints} points
        </p>
      </div>

      <div className="space-y-3">
        {result.questions.map((question, index) => (
          <article
            key={question.questionId}
            className="rounded-lg border border-slate-600 p-4"
          >
            <p className="font-semibold">
              Question {index + 1}:{" "}
              {question.correct ? "Correct" : "Incorrect"}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              {question.explanation}
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-amber-500 px-5 py-2 font-semibold text-slate-950"
      >
        Retry quiz
      </button>
    </section>
  );
}

