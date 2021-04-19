/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import { CardContent } from ".";

describe("rendering", () => {
  describe("initial state", () => {
    let cardContent;

    beforeEach(() => {
      render(<CardContent>CardContent</CardContent>);
      cardContent = screen.getByText("CardContent");
    });

    it("has default className", () => {
      expect(cardContent).toHaveClass("card__content");
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<CardContent>CardContent</CardContent>);
      expect(screen.getByText("CardContent")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <CardContent>
          <span data-testid="child">Children</span>
        </CardContent>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(<CardContent data-testid="test">CardContent</CardContent>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
