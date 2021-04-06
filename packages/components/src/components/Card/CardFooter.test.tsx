/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import { CardFooter } from ".";

describe("rendering", () => {
  describe("initial state", () => {
    let cardContent;

    beforeEach(() => {
      render(<CardFooter>CardFooter</CardFooter>);
      cardContent = screen.getByText("CardFooter");
    });

    it("has default className", () => {
      expect(cardContent).toHaveClass("card__footer");
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<CardFooter>CardFooter</CardFooter>);
      expect(screen.getByText("CardFooter")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <CardFooter>
          <span data-testid="child">Children</span>
        </CardFooter>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(<CardFooter data-testid="test">CardFooter</CardFooter>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
