
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LessonViewer } from "./LessonViewer";
import { circuitBreakerLesson } from "../../content/lessons/circuit-breaker";

describe("LessonViewer", () => {
  it("renders lesson title and summary", () => {
    render(<LessonViewer lesson={circuitBreakerLesson} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Circuit Breaker Recovery",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Learn how services recover safely.")
    ).toBeInTheDocument();
  });

  it("renders all learning objectives", () => {
    render(<LessonViewer lesson={circuitBreakerLesson} />);

    for (const objective of circuitBreakerLesson.learningObjectives) {
      expect(screen.getByText(objective)).toBeInTheDocument();
    }
  });

  it("renders Python code as text", () => {
    const { container } = render(
      <LessonViewer lesson={circuitBreakerLesson} />
    );

    const code = container.querySelector("pre code");

    expect(code).not.toBeNull();
    expect(code).toHaveTextContent("breaker.is_open");
  });

  it("shows the configured activity placeholders", () => {
    render(<LessonViewer lesson={circuitBreakerLesson} />);

    expect(
      screen.getByRole("heading", { name: "The Failure Range" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Knowledge Check" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "The Proving Grounds" })
    ).toBeInTheDocument();
  });

  it("hides activities when none are configured", () => {
    const lessonWithoutActivities = {
      ...circuitBreakerLesson,
      simulationId: undefined,
      quizId: undefined,
      codingChallengeId: undefined,
    };

    render(<LessonViewer lesson={lessonWithoutActivities} />);

    expect(
      screen.queryByRole("heading", {
        name: "Continue your expedition",
      })
    ).not.toBeInTheDocument();
  });
});

