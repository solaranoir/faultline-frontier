
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { LearningRoutes } from "./LearningRoutes";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LearningRoutes />
    </MemoryRouter>
  );
}

const lessonPath = "/lessons/circuit-breaker-recovery";

describe("LearningRoutes", () => {
  it("redirects the homepage to the default lesson", async () => {
    renderAt("/");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Circuit Breaker Recovery",
      })
    ).toBeInTheDocument();
  });

  it("navigates from a lesson to its simulation", async () => {
    const user = userEvent.setup();
    renderAt(lessonPath);

    await user.click(
      screen.getByRole("link", {
        name: "Start activity: The Failure Range",
      })
    );

    expect(
      screen.getByRole("region", {
        name: "Simulation player",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Ready to begin")
    ).toBeInTheDocument();
  });

  it("navigates from simulation to quiz", async () => {
    const user = userEvent.setup();
    renderAt(`${lessonPath}/simulation`);

    await user.click(
      screen.getByRole("link", {
        name: "Continue to Knowledge Check",
      })
    );

    expect(
      screen.getByRole("region", {
        name: "Knowledge check",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Circuit Breaker Knowledge Check",
      })
    ).toBeInTheDocument();
  });

  it("returns from quiz to lesson", async () => {
    const user = userEvent.setup();
    renderAt(`${lessonPath}/quiz`);

    await user.click(
      screen.getByRole("link", {
        name: "Back to lesson",
      })
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Circuit Breaker Recovery",
      })
    ).toBeInTheDocument();
  });

  it("handles an unknown lesson", () => {
    renderAt("/lessons/does-not-exist");

    expect(
      screen.getByRole("heading", {
        name: "Lost beyond the frontier",
      })
    ).toBeInTheDocument();
  });

  it("handles an unknown route", () => {
    renderAt("/not-a-real-page");

    expect(
      screen.getByRole("heading", {
        name: "Lost beyond the frontier",
      })
    ).toBeInTheDocument();
  });
});

