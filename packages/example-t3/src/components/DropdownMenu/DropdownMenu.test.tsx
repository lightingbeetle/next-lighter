/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import DropdownMenu from ".";

describe("rendering", () => {
  describe("initial state", () => {
    it("has label tag", () => {
      render(<DropdownMenu />);
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("has default className", () => {
      render(<DropdownMenu />);
      expect(screen.getByRole("list")).toHaveClass("dropdown-menu");
    });

    it("is not visible", () => {
      render(<DropdownMenu />);
      expect(screen.getByRole("list")).toHaveClass("dropdown-menu--hidden");
      // expect(screen.getByRole('list')).not.toBeVisible();
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<DropdownMenu>Item</DropdownMenu>);
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("isOpen", () => {
      render(<DropdownMenu isOpen />);

      expect(screen.getByRole("list")).toBeVisible();
    });

    it("passes other props", () => {
      render(<DropdownMenu data-testid="test" />);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
