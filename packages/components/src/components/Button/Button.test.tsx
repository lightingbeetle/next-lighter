/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";

import Button from ".";
import Icon from "../Icon";

describe("rendering", () => {
  describe("initial state", () => {
    let button;

    beforeEach(() => {
      render(<Button />);
      button = screen.getByRole("button");
    });

    it("has default tag", () => {
      expect(button).toBeInTheDocument();
    });

    it("has default className btn", () => {
      expect(button).toHaveClass("btn");
    });
  });

  describe("passed props", () => {
    it("renders children", () => {
      render(<Button>Button</Button>);
      expect(screen.getByText("Button")).toBeInTheDocument();
    });

    it("renders children as node", () => {
      render(
        <Button>
          <span data-testid="child">Children</span>
        </Button>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("renders as anchor with href", () => {
      render(<Button href="#">Anchor</Button>);

      const button = screen.getByRole("link");

      expect(button).toBeInTheDocument();
    });

    it("renders as disabled", () => {
      render(
        <>
          <Button isDisabled>Button</Button>
          <Button href="#" isDisabled>
            Button
          </Button>
        </>
      );

      const button = screen.getByRole("button");
      const link = screen.getByRole("link");

      expect(button).toBeDisabled();
      expect(link).not.toBeDisabled();
    });

    it("is square", () => {
      render(
        <>
          <Button>
            <Icon name="home" />
          </Button>
          <Button size="l">
            <Icon name="home" />
          </Button>
          <Button size="s">
            <Icon name="home" />
          </Button>
        </>
      );

      const buttons = screen.getAllByRole("button");

      buttons.forEach((button) => {
        const { width, height } = button.getBoundingClientRect();
        expect(width).toBe(height);
      });
    });

    it("passes other props", () => {
      render(<Button data-testid="test">Button</Button>);

      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
