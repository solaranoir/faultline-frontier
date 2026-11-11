
import { z } from "zod";

const OptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

const QuestionBase = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  points: z.number().int().positive().default(10),
};

const SingleChoiceSchema = z.object({
  ...QuestionBase,
  type: z.literal("single-choice"),
  options: z.array(OptionSchema).min(2),
  correctAnswer: z.string().min(1),
});

const MultipleChoiceSchema = z.object({
  ...QuestionBase,
  type: z.literal("multiple-choice"),
  options: z.array(OptionSchema).min(2),
  correctAnswers: z.array(z.string()).min(1),
});

const TrueFalseSchema = z.object({
  ...QuestionBase,
  type: z.literal("true-false"),
  correctAnswer: z.boolean(),
});

export const QuestionSchema = z.discriminatedUnion(
  "type",
  [
    SingleChoiceSchema,
    MultipleChoiceSchema,
    TrueFalseSchema,
  ]
);

const BaseQuizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  passingScore: z.number().min(0).max(100),
  questions: z.array(QuestionSchema).min(1),
});


export const QuizSchema = BaseQuizSchema.superRefine(
  (quiz, ctx) => {
    for (const [index, question] of quiz.questions.entries()) {
      if (question.type === "true-false") {
        continue;
      }

      const optionIds = question.options.map(
        (option) => option.id
      );

      const uniqueOptionIds = new Set(optionIds);

      const answers =
        question.type === "single-choice"
          ? [question.correctAnswer]
          : question.correctAnswers;

      const uniqueAnswers = new Set(answers);

      if (uniqueOptionIds.size !== optionIds.length) {
        ctx.addIssue({
          code: "custom",
          path: ["questions", index, "options"],
          message: "Option IDs must be unique",
        });
      }

      if (answers.some((answer) => !uniqueOptionIds.has(answer))) {
        ctx.addIssue({
          code: "custom",
          path: ["questions", index],
          message: "Answer references an unknown option",
        });
      }

      if (uniqueAnswers.size !== answers.length) {
        ctx.addIssue({
          code: "custom",
          path: ["questions", index, "correctAnswers"],
          message: "Correct answers must be unique",
        });
      }

      if (
        question.type === "multiple-choice" &&
        uniqueAnswers.size >= uniqueOptionIds.size
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["questions", index, "correctAnswers"],
          message: "At least one option must be incorrect",
        });
      }
    }
  }
);

export type Quiz = z.infer<typeof QuizSchema>;
export type Question = z.infer<typeof QuestionSchema>;

