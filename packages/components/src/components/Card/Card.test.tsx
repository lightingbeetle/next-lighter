import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import Card, { CardSection, CardTitle, CardAction } from ".";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <Card data-testid="card">
          <CardSection>
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const card = screen.getByTestId("card");

      expect(card).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it('gets correct className when hasOverflow="false" prop is passed', () => {
      render(
        <Card hasOverflow={false} data-testid="card">
          <CardSection>
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const card = screen.getByTestId("card");

      expect(card).toHaveClass("card--disable-overflow");
    });

    it("renders link correctly", () => {
      const { getByText } = render(
        <Card>
          <CardSection>
            <CardTitle>
              <CardAction>
                <a href="string-href">Test title</a>
              </CardAction>
            </CardTitle>
          </CardSection>
        </Card>
      );

      const link = getByText("Test title");

      expect(link.getAttribute("href")).toBe("string-href");
    });

    it("gets correct className when isBordered prop is passed", () => {
      render(
        <Card isBordered data-testid="card">
          <CardSection>
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const card = screen.getByTestId("card");

      expect(card).toHaveClass("card--bordered");
    });

    it("gets correct className when href prop is passed", () => {
      render(
        <Card isClickable data-testid="card">
          <CardSection>
            <CardTitle>
              <CardAction>
                <a href="/">Test title</a>
              </CardAction>
            </CardTitle>
          </CardSection>
        </Card>
      );

      const card = screen.getByTestId("card");

      expect(card).toHaveClass("card--clickable");
    });
  });
});

describe("CardSection", () => {
  describe("Props", () => {
    it('gets correct className when bg="white" is passed', () => {
      render(
        <Card>
          <CardSection bg="white" data-testid="card-section">
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--white");
    });

    it('gets correct className when bg="secondary" is passed', () => {
      render(
        <Card>
          <CardSection bg="secondary" data-testid="card-section">
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--secondary");
    });

    it('gets correct className when bg="primary" is passed', () => {
      render(
        <Card>
          <CardSection bg="primary" data-testid="card-section">
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--primary");
    });

    it('gets correct className when bg="grey" is passed', () => {
      render(
        <Card>
          <CardSection bg="secondary" data-testid="card-section">
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--secondary");
    });

    it("gets correct className when hasBgOnMobile prop is passed", () => {
      render(
        <Card>
          <CardSection hasBgOnMobile data-testid="card-section">
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--show-bg-responsive");
    });

    it("gets correct className when isCondensed prop is passed", () => {
      render(
        <Card>
          <CardSection isCondensed data-testid="card-section">
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--condensed");
    });

    it("gets correct className when isFilling prop is passed", () => {
      render(
        <Card>
          <CardSection isFilling data-testid="card-section">
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--fill");
    });

    it("gets correct className when type='image' prop is passed", () => {
      render(
        <Card>
          <CardSection type="image" data-testid="card-section">
            <CardTitle title="Test title" />
          </CardSection>
        </Card>
      );

      const cardSection = screen.getByTestId("card-section");

      expect(cardSection).toHaveClass("card__section--image");
    });
  });
});

describe("CardTitle", () => {
  describe("Props", () => {
    it("renders title correctly", () => {
      const { getByText } = render(
        <Card>
          <CardSection>
            <CardTitle>Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const title = getByText("Test title");

      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
    });

    it("renders gets correct tag", () => {
      const { getByText } = render(
        <Card>
          <CardSection>
            <CardTitle tag="h4">Test title</CardTitle>
          </CardSection>
        </Card>
      );

      const title = getByText("Test title");

      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H4");
    });
  });
});

describe("Accessibility", () => {
  it("is accessible", async () => {
    render(
      <Card data-testid="card">
        <CardSection>
          <CardTitle title="Test title" />
        </CardSection>
      </Card>
    );

    const card = screen.getByTestId("card");

    expect(await axe(card)).toHaveNoViolations();
  });
});
