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

    it("has default className", () => {
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

    it("should have default direction", () => {
      render(<Bar data-testid="bar" />);

      expect(screen.getByTestId("bar")).toHaveClass("bar--horizontal");
    });

    it("should have custom class", () => {
      render(<Bar data-testid="bar" className="custom-class" />);

      expect(screen.getByTestId("bar")).toHaveClass("custom-class");
    });

    it("should have align class", () => {
      render(<Bar data-testid="bar" align="bottom" />);

      expect(screen.getByTestId("bar")).toHaveClass("align-items-bottom");
    });

    it("should have vertical class", () => {
      render(<Bar data-testid="bar" direction="vertical" />);

      expect(screen.getByTestId("bar")).toHaveClass("bar--vertical");
    });

    it("should have space class", () => {
      render(<Bar data-testid="bar" space="small" />);

      expect(screen.getByTestId("bar")).toHaveClass("bar--horizontal-small");
    });

    it("passes other props", () => {
      render(<Bar data-testid="bar" />);

      expect(screen.getByTestId("bar")).toBeInTheDocument();
    });
  });
});
