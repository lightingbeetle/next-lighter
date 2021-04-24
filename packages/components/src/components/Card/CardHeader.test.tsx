/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import { CardHeader } from ".";

describe("rendering", () => {
  describe("initial state", () => {
    let cardContent;

    beforeEach(() => {
      render(<CardHeader data-testid="test" title="Title" />);
      cardContent = screen.getByTestId("test");
    });

    it("has default className", () => {
      expect(cardContent).toHaveClass("card__header");
    });
  });

  describe("passed props", () => {
    it("renders title from string", () => {
      render(<CardHeader data-testid="test" title="Title" />);
      const titleParent = screen.getByText("Title").parentNode;
      const header = screen.getByTestId("test");
      expect(titleParent).toBe(header);
    });

    it("renders title as single node", () => {
      render(<CardHeader data-testid="test" title={<h3>Title</h3>} />);
      const titleParent = screen.getByText("Title").parentNode;
      const header = screen.getByTestId("test");
      expect(titleParent).toBe(header);
    });

    it("renders children", () => {
      render(<CardHeader title="Title">CardHeader</CardHeader>);
      expect(screen.getByText("CardHeader")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <CardHeader title="Title">
          <span data-testid="child">Children</span>
        </CardHeader>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("renders actions", () => {
      render(<CardHeader title="Title" actions={<button>Action</button>} />);
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("passes other props", () => {
      render(
        <CardHeader title="Title" data-testid="test">
          CardHeader
        </CardHeader>
      );

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
