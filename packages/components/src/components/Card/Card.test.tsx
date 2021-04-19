/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Card from ".";

describe("rendering", () => {
  describe("initial state", () => {
    let card;

    beforeEach(() => {
      render(<Card>Card</Card>);
      card = screen.getByText("Card");
    });

    it("has default className", () => {
      expect(card).toHaveClass("card");
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<Card>Card</Card>);
      expect(screen.getByText("Card")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <Card>
          <span data-testid="child">Children</span>
        </Card>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(<Card data-testid="test">Card</Card>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
