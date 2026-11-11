
import { useState } from "react";
import type { Quiz } from "../../schemas/quiz";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import {
  gradeQuiz,
  type Answer,
  type Answers,
  type QuizResult,
} from "./quiz-utils";

type Props = {
  quiz: Quiz;
};

export function QuizPlayer({ quiz }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<QuizResult | null>(
    null
  );

  const answeredCount = quiz.questions.filter(
    (question) => {
      const answer = answers[question.id];

      if (typeof answer === "boolean") return true;
      if (typeof answer === "string") return answer.length > 0;
      if (Array.isArray(answer)) return answer.length > 0;

      return false;
    }
  ).length;

  const allAnswered = answeredCount === quiz.questions.length;

  const updateAnswer = (
    questionId: string,
    answer: Answer
  ) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: answer,
    }));
  };

  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!allAnswered || result !== null) return;

    setResult(gradeQuiz(quiz, answers));
  };

  const retry = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <section
      aria-label="Knowledge check"
      className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 text-slate-100 sm:p-8"
    >
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
          Knowledge Check
        </p>

        <h2 className="text-2xl font-bold">
          {quiz.title}
        </h2>

        <p className="text-slate-300">
          {quiz.description}
        </p>

        <p className="text-sm text-slate-400">
          Passing score: {quiz.passingScore}%
        </p>
      </header>

      {result ? (
        <QuizResults result={result} onRetry={retry} />
      ) : (
        <form onSubmit={submit} className="space-y-6">
          <p className="text-sm text-slate-400">
            {answeredCount} of {quiz.questions.length} answered
          </p>

          {quiz.questions.map((question, index) => (
            <QuizQuestion
              key={question.id}
              question={question}
              index={index}
              answer={answers[question.id]}
              disabled={false}
              onChange={(answer) =>
                updateAnswer(question.id, answer)
              }
            />
          ))}

          <button
            type="submit"
            disabled={!allAnswered}
            className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit answers
          </button>
        </form>
      )}
    </section>
  );
}

