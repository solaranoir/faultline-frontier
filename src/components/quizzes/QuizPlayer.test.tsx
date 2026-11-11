
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { QuizPlayer } from "./QuizPlayer";
import { circuitBreakerQuiz } from "../../content/quizzes/circuit-breaker";

describe("QuizPlayer", () => {
  it("renders the quiz title and questions", () => {
    render(<QuizPlayer quiz={circuitBreakerQuiz} />);

    expect(
      screen.getByRole("heading", {
        name: "Circuit Breaker Knowledge Check",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/which state rejects calls/i)
    ).toBeInTheDocument();
  });

  it("disables submission until all questions are answered", () => {
    render(<QuizPlayer quiz={circuitBreakerQuiz} />);

    expect(
      screen.getByRole("button", { name: "Submit answers" })
    ).toBeDisabled();
  });

  it("submits correct answers and shows a passing result", async () => {
    const user = userEvent.setup();

    render(<QuizPlayer quiz={circuitBreakerQuiz} />);

    await user.click(
      screen.getByRole("radio", { name: "Open" })
    );

    await user.click(
      screen.getByRole("checkbox", {
        name: /allow a limited number/i,
      })
    );

    await user.click(
      screen.getByRole("checkbox", {
        name: /evaluate probe results/i,
      })
    );

    await user.click(
      screen.getByRole("radio", { name: "False" })
    );

    await user.click(
      screen.getByRole("button", { name: "Submit answers" })
    );

    expect(
      screen.getByRole("heading", { name: "100%" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/passed/i)
    ).toBeInTheDocument();
  });

  it("clears answers when retrying", async () => {
    const user = userEvent.setup();

    render(<QuizPlayer quiz={circuitBreakerQuiz} />);

    await user.click(screen.getByRole("radio", { name: "Open" }));
    await user.click(
      screen.getByRole("checkbox", {
        name: /allow a limited number/i,
      })
    );
    await user.click(
      screen.getByRole("radio", { name: "False" })
    );

    await user.click(
      screen.getByRole("button", { name: "Submit answers" })
    );

    await user.click(
      screen.getByRole("button", { name: "Retry quiz" })
    );

    expect(
      screen.getByRole("button", { name: "Submit answers" })
    ).toBeDisabled();

    expect(
      screen.getByText("0 of 3 answered")
    ).toBeInTheDocument();
  });
});

