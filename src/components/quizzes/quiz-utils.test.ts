
import { describe, expect, it } from "vitest";
import { gradeQuiz } from "./quiz-utils";
import { circuitBreakerQuiz } from "../../content/quizzes/circuit-breaker";

describe("gradeQuiz", () => {
  it("passes when all answers are correct", () => {
    const result = gradeQuiz(circuitBreakerQuiz, {
      "breaker-state": "open",
      "recovery-probes": ["evaluate", "limited"],
      "fail-fast": false,
    });

    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.earnedPoints).toBe(30);
  });

  it("requires an exact multiple-choice match", () => {
    const result = gradeQuiz(circuitBreakerQuiz, {
      "breaker-state": "open",
      "recovery-probes": ["limited"],
      "fail-fast": false,
    });

    expect(result.score).toBe(67);
    expect(result.passed).toBe(false);
  });

  it("does not award points for unanswered questions", () => {
    const result = gradeQuiz(circuitBreakerQuiz, {});

    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
  });

  it("handles false as a valid true-false answer", () => {
    const result = gradeQuiz(circuitBreakerQuiz, {
      "fail-fast": false,
    });

    expect(result.earnedPoints).toBe(10);
  });

  it("rejects duplicate multiple-choice selections", () => {
    const result = gradeQuiz(circuitBreakerQuiz, {
      "recovery-probes": ["limited", "limited"],
    });

    expect(result.questions[1].correct).toBe(false);
  });
});

