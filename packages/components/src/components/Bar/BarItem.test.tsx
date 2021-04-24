/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import BarItem, { CLASS_ROOT } from "./BarItem";

describe("rendering", () => {
  describe("initial state", () => {
    let item;

    beforeEach(() => {
      render(<BarItem data-testid="item" />);
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
    it("renders children", () => {
      render(<BarItem>BarItem</BarItem>);
      expect(screen.getByText("BarItem")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <BarItem>
          <span data-testid="child">Children</span>
        </BarItem>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should have custom class", () => {
      render(<BarItem data-testid="item" className="custom-class" />);

      expect(screen.getByTestId("item")).toHaveClass("custom-class");
    });

    it("should have fill class", () => {
      render(<BarItem data-testid="item" isFilling />);

      expect(screen.getByTestId("item")).toHaveClass("bar__item--fill");
    });

    it("should have shrink class", () => {
      render(<BarItem data-testid="item" canShrink />);

      expect(screen.getByTestId("item")).toHaveClass("bar__item--shrink");
    });

    it("passes other props", () => {
      render(<BarItem data-testid="item" />);

      expect(screen.getByTestId("item")).toBeInTheDocument();
    });
  });
});
