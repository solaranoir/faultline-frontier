import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SimulationPlayer } from "./SimulationPlayer";
import { circuitBreakerSimulation } from "../../content/simulations/circuit-breaker";

describe("SimulationPlayer", () => {
  it("starts at the initial state", () => {
    render(
      <SimulationPlayer simulation={circuitBreakerSimulation} />
    );

    expect(screen.getByTestId("system-state")).toHaveTextContent(
      "CLOSED"
    );

    expect(
      screen.getByText("Ready to begin")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeDisabled();
  });

  it("advances through simulation steps", async () => {
    const user = userEvent.setup();

    render(
      <SimulationPlayer simulation={circuitBreakerSimulation} />
    );

    await user.click(
      screen.getByRole("button", { name: "Next" })
    );

    expect(
      screen.getByText("The dependency fails")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Next" })
    );

    expect(screen.getByTestId("system-state")).toHaveTextContent(
      "OPEN"
    );
  });

  it("returns to the previous step", async () => {
    const user = userEvent.setup();

    render(
      <SimulationPlayer simulation={circuitBreakerSimulation} />
    );

    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Previous" }));

    expect(
      screen.getByText("The dependency fails")
    ).toBeInTheDocument();
  });

  it("resets to the initial state", async () => {
    const user = userEvent.setup();

    render(
      <SimulationPlayer simulation={circuitBreakerSimulation} />
    );

    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(
      screen.getByText("Ready to begin")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeDisabled();
  });

  it("does not advance beyond the final step", async () => {
    const user = userEvent.setup();

    render(
      <SimulationPlayer simulation={circuitBreakerSimulation} />
    );

    for (let i = 0; i < circuitBreakerSimulation.steps.length; i++) {
      await user.click(
        screen.getByRole("button", { name: "Next" })
      );
    }

    expect(
      screen.getByRole("button", { name: "Next" })
    ).toBeDisabled();

    expect(
      screen.getByText("The service recovers")
    ).toBeInTheDocument();
  });
});

