
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Faultline Frontier", () => {
  it("renders the application lesson", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Circuit Breaker Recovery",
      })
    ).toBeInTheDocument();
  });

  it("displays the Faultline Frontier branding", () => {
    render(<App />);

    expect(
      screen.getByRole("navigation", {
        name: "Breadcrumb",
      })
    ).toHaveTextContent("FAULTLINE FRONTIER");
  });
});

