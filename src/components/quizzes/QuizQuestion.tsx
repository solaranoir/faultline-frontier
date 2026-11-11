
import type { Question } from "../../schemas/quiz";
import type { Answer } from "./quiz-utils";

type Props = {
  question: Question;
  index: number;
  answer: Answer | undefined;
  disabled: boolean;
  onChange: (answer: Answer) => void;
};

export function QuizQuestion({
  question,
  index,
  answer,
  disabled,
  onChange,
}: Props) {
  return (
    <fieldset
      disabled={disabled}
      className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-5"
    >
      <legend className="px-2 font-semibold">
        {index + 1}. {question.prompt}
      </legend>

      <p className="text-xs text-slate-400">
        {question.points} points
      </p>

      {question.type === "true-false" ? (
        <div className="space-y-2">
          {[true, false].map((value) => (
            <label
              key={String(value)}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-600 p-3"
            >
              <input
                type="radio"
                name={question.id}
                checked={answer === value}
                onChange={() => onChange(value)}
              />
              {value ? "True" : "False"}
            </label>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {question.options.map((option) => {
            const isMultiple =
              question.type === "multiple-choice";

            const selected = isMultiple
              ? Array.isArray(answer) &&
                answer.includes(option.id)
              : answer === option.id;

            return (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-600 p-3"
              >
                <input
                  type={isMultiple ? "checkbox" : "radio"}
                  name={question.id}
                  checked={selected}
                  onChange={() => {
                    if (!isMultiple) {
                      onChange(option.id);
                      return;
                    }

                    const current = Array.isArray(answer)
                      ? answer
                      : [];

                    onChange(
                      selected
                        ? current.filter(
                            (id) => id !== option.id
                          )
                        : [...current, option.id]
                    );
                  }}
                />
                {option.text}
              </label>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

