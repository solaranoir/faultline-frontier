
import type { Quiz } from "../../schemas/quiz";

export type Answer = string | string[] | boolean;
export type Answers = Record<string, Answer>;

export type QuestionResult = {
  questionId: string;
  correct: boolean;
  earnedPoints: number;
  possiblePoints: number;
  explanation: string;
};

export type QuizResult = {
  score: number;
  earnedPoints: number;
  possiblePoints: number;
  passed: boolean;
  questions: QuestionResult[];
};

export function gradeQuiz(
  quiz: Quiz,
  answers: Answers
): QuizResult {
  const questions = quiz.questions.map((question) => {
    const answer = answers[question.id];
    let correct = false;

    switch (question.type) {
      case "single-choice":
        correct =
          typeof answer === "string" &&
          answer === question.correctAnswer;
        break;

      case "multiple-choice":
        correct =
          Array.isArray(answer) &&
          answer.length === question.correctAnswers.length &&
          new Set(answer).size === answer.length &&
          question.correctAnswers.every((id) =>
            answer.includes(id)
          );
        break;

      case "true-false":
        correct =
          typeof answer === "boolean" &&
          answer === question.correctAnswer;
        break;
    }

    return {
      questionId: question.id,
      correct,
      earnedPoints: correct ? question.points : 0,
      possiblePoints: question.points,
      explanation: question.explanation,
    };
  });

  const earnedPoints = questions.reduce(
    (sum, question) => sum + question.earnedPoints,
    0
  );

  const possiblePoints = questions.reduce(
    (sum, question) => sum + question.possiblePoints,
    0
  );

  const score =
    possiblePoints === 0
      ? 0
      : Math.round((earnedPoints / possiblePoints) * 100);

  return {
    score,
    earnedPoints,
    possiblePoints,
    passed: (earnedPoints / possiblePoints) * 100 >= quiz.passingScore,
    questions,
  };
}

