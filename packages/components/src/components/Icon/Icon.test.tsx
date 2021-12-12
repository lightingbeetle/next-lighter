/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Icon, { IconProvider } from ".";

describe("Icon", () => {
  it("render SVG", () => {
    render(<Icon name="home" />);

    const icon = screen.getByTitle("home").parentNode;

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("icon", "icon--home");
    expect(icon.querySelector("use")).toHaveAttribute(
      "xlink:href",
      "/icons-sprite.svg#home"
    );
  });

  it("render decorative SVG", () => {
    render(<Icon name="home" />);

    const icon = screen.getByTitle("home").parentNode;

    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("render meaningful SVG", () => {
    render(<Icon name="home" alt="This is home icon" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByTitle("This is home icon")).toBeInTheDocument();
  });

  it("render in correct size", () => {
    render(<Icon name="home" size="l" />);

    const icon = screen.getByTitle("home").parentNode;

    expect(icon).toHaveClass("icon--l");
  });

  it("render custom sprite path", () => {
    render(<Icon name="home" spritePath="/sprite.svg" />);

    const icon = screen.getByTitle("home").parentNode;

    expect(icon.querySelector("use")).toHaveAttribute(
      "xlink:href",
      "/sprite.svg#home"
    );
  });

  it("render custom class", () => {
    render(<Icon name="home" className="test" />);

    const icon = screen.getByTitle("home").parentNode;

    expect(icon).toHaveClass("test");
  });

  it("render custom attribute", () => {
    render(<Icon name="home" data-testid="test" />);

    const icon = screen.getByTestId("test");

    expect(icon).toBeInTheDocument();
  });
});

describe("IconProivder", () => {
  it("render custom sprite path", () => {
    render(
      <IconProvider spritePath="/sprite.svg">
        <Icon name="home" />
      </IconProvider>
    );

    const icon = screen.getByTitle("home").parentNode;

    expect(icon.querySelector("use")).toHaveAttribute(
      "xlink:href",
      "/sprite.svg#home"
    );
  });
});
