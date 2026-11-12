
import type { Lesson } from "../schemas/lesson";
import type { Simulation } from "../schemas/simulation";
import type { Quiz } from "../schemas/quiz";

import { circuitBreakerLesson } from "./lessons/circuit-breaker";
import { circuitBreakerSimulation } from "./simulations/circuit-breaker";
import { circuitBreakerQuiz } from "./quizzes/circuit-breaker";

export type LearningModule = {
  lesson: Lesson;
  simulation?: Simulation;
  quiz?: Quiz;
};

const circuitBreakerModule: LearningModule = {
  lesson: circuitBreakerLesson,
  simulation: circuitBreakerSimulation,
  quiz: circuitBreakerQuiz,
};

export const learningModules: Record<string, LearningModule> = {
  [circuitBreakerLesson.slug]: circuitBreakerModule,
};

export function getLearningModule(
  slug: string
): LearningModule | undefined {
  return learningModules[slug];
}

export function getLessonPath(slug: string): string {
  return `/lessons/${encodeURIComponent(slug)}`;
}

