
import { describe, expect, it } from "vitest";

import {
  LessonSchema,
  SimulationSchema,
  QuizSchema,
  CodingChallengeSchema,
} from "./index";

import {
  circuitBreakerLesson,
  circuitBreakerSimulation,
  circuitBreakerQuiz,
  circuitBreakerChallenge,
} from "../content/lessons/circuit-breaker";

describe("Faultline Frontier schemas", () => {
  it("validates a lesson", () => {
    expect(
      LessonSchema.safeParse(circuitBreakerLesson).success
    ).toBe(true);
  });

  it("rejects invalid lesson slugs", () => {
    expect(
      LessonSchema.safeParse({
        ...circuitBreakerLesson,
        slug: "Invalid Slug!",
      }).success
    ).toBe(false);
  });

  it("requires simulation steps", () => {
    expect(
      SimulationSchema.safeParse({
        ...circuitBreakerSimulation,
        steps: [],
      }).success
    ).toBe(false);
  });

  it("validates a quiz", () => {
    expect(
      QuizSchema.safeParse(circuitBreakerQuiz).success
    ).toBe(true);
  });

  it("requires challenge tests", () => {
    expect(
      CodingChallengeSchema.safeParse({
        ...circuitBreakerChallenge,
        tests: [],
      }).success
    ).toBe(false);
  });

  it("validates a coding challenge", () => {
    expect(
      CodingChallengeSchema.safeParse(
        circuitBreakerChallenge
      ).success
    ).toBe(true);
  });
});

it("rejects a quiz with an unknown answer ID", () => {
  const invalidQuiz = {
    ...circuitBreakerQuiz,
    questions: [
      {
        id: "q-invalid",
        type: "single-choice",
        prompt: "What state allows recovery probes?",
        explanation: "Half-open allows limited probes.",
        options: [
          { id: "a", text: "Closed" },
          { id: "b", text: "Half-open" },
        ],
        correctAnswer: "nonexistent",
      },
    ],
  };

  expect(QuizSchema.safeParse(invalidQuiz).success).toBe(false);
});
