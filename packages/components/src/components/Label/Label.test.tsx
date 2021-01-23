/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Label from ".";

describe("rendering", () => {
  describe("initial state", () => {
    it("has label tag", () => {
      render(<Label>Label</Label>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("has default className", () => {
      render(<Label>Label</Label>);
      expect(screen.getByText("Label").parentNode).toHaveClass("label");
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<Label>Label</Label>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(<Label isError>Label</Label>);

      expect(screen.getByText("Label").parentNode).toHaveClass("label--error");
    });

    it("passes other props", () => {
      render(<Label data-testid="test">Label</Label>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
