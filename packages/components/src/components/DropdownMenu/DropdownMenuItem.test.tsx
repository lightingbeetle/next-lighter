/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import { DropdownMenuItem } from ".";

describe("rendering", () => {
  describe("initial state", () => {
    it("has label tag", () => {
      render(<DropdownMenuItem />);
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("has default className", () => {
      render(<DropdownMenuItem />);
      expect(screen.getByRole("listitem")).toHaveClass("dropdown-menu__item");
    });
  });

  describe("props", () => {
    it("renders children", () => {
      render(<DropdownMenuItem>Item</DropdownMenuItem>);
      expect(screen.getByText("Item")).toBeInTheDocument();
    });

    it("isHighlighted", () => {
      render(<DropdownMenuItem isHighlighted />);

      expect(screen.getByRole("listitem")).toHaveClass(
        "dropdown-menu__item--highlighted"
      );
    });

    it("passes other props", () => {
      render(<DropdownMenuItem data-testid="test" />);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
