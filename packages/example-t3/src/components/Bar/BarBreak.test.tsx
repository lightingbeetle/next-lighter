/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import BarBreak, { CLASS_ROOT } from "./BarBreak";

describe("rendering", () => {
  describe("initial state", () => {
    let item;

    beforeEach(() => {
      render(<BarBreak data-testid="item" />);
      item = screen.getByTestId("item");
    });

    it("has default tag", () => {
      expect(item).toBeInTheDocument();
    });

    it("has default className", () => {
      expect(item).toHaveClass(CLASS_ROOT);
    });
  });

  describe("passed props", () => {
    it("should have custom class", () => {
      render(<BarBreak data-testid="item" className="custom-class" />);

      expect(screen.getByTestId("item")).toHaveClass("custom-class");
    });

    it("passes other props", () => {
      render(<BarBreak data-testid="item" />);

      expect(screen.getByTestId("item")).toBeInTheDocument();
    });
  });
});
