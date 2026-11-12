
import { describe, expect, it } from "vitest";
import {
  getLearningModule,
  learningModules,
} from "./registry";

describe("learning registry", () => {
  it("finds the circuit-breaker module", () => {
    const slug = "circuit-breaker-recovery";
    const module = getLearningModule(slug);

    expect(module?.lesson.slug).toBe(slug);
    expect(module?.simulation).toBeDefined();
    expect(module?.quiz).toBeDefined();
  });

  it("returns undefined for an unknown lesson", () => {
    expect(getLearningModule("unknown")).toBeUndefined();
  });

  it("keeps activity references consistent", () => {
    for (const module of Object.values(learningModules)) {
      if (module.simulation) {
        expect(module.lesson.simulationId).toBe(
          module.simulation.id
        );
      }

      if (module.quiz) {
        expect(module.lesson.quizId).toBe(module.quiz.id);
      }
    }
  });
});

