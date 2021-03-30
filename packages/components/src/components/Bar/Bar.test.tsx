/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Bar, { CLASS_ROOT } from "./Bar";

describe("rendering", () => {
  describe("initial state", () => {
    let bar;

    beforeEach(() => {
      render(<Bar data-testid="bar" />);
      bar = screen.getByTestId("bar");
    });

    it("has default tag", () => {
      expect(bar).toBeInTheDocument();
    });

    it("has default className bar", () => {
      expect(bar).toHaveClass(CLASS_ROOT);
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<Bar>Bar</Bar>);
      expect(screen.getByText("Bar")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <Bar>
          <span data-testid="child">Children</span>
        </Bar>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(<Bar data-testid="test">Bar</Bar>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
