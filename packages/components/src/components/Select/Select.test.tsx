/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";

import Select from ".";
import selectStatic from "./Select.static";
import { act } from "react-dom/test-utils";
import { within } from "@testing-library/dom";

const items = [
  { label: "Option 1", value: "option 1" },
  { label: "Option 2", value: "option 2" },
  { label: "Option 3", value: "option 3" },
];

function renderWithoutRuntime(element) {
  const div = document.createElement("div");
  const markup = renderToStaticMarkup(element);

  div.innerHTML = markup;

  return div;
}

describe("initial state", () => {
  it("has combobox", () => {
    render(<Select />);

    const select = screen.getByRole("combobox", { hidden: true });
    const button = screen.getByRole("button");
    const list = screen.getByRole("listbox");

    expect(button).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(list).toBeInTheDocument();

    expect(select).not.toBeVisible();
  });

  it("has empty options", () => {
    render(<Select />);

    const select = screen.getByRole("combobox", { hidden: true });

    expect(screen.getByText("No options")).toBeInTheDocument();
    expect(select).not.toHaveValue();
  });

  it("has hidden dropdown", () => {
    render(<Select />);
    const list = screen.getByRole("listbox");
    const button = screen.getByRole("button");

    expect(list).toHaveClass("dropdown-menu--hidden");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

describe("props", () => {
  it("has default placeholder", () => {
    render(<Select items={items} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Choose one");
  });

  it("has custom placeholder", () => {
    render(<Select items={items} placeholder="Pick option" />);

    const select = screen.getByRole("combobox", { hidden: true });
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Pick option");
    expect(select).not.toHaveValue();
  });

  it("has options", () => {
    render(<Select items={items} />);

    const options = screen.getAllByRole("option");
    const select = screen.getByRole("combobox", { hidden: true });
    const button = screen.getByRole("button");

    expect(options).toHaveLength(items.length);
    expect(options[0]).toHaveTextContent("Option 1");
    expect(select).not.toHaveValue();
    expect(button).toHaveTextContent("Choose one");
  });

  it("has value", () => {
    render(<Select items={items} value="option 2" onChange={() => {}} />);

    const select = screen.getByRole("combobox", { hidden: true });
    const button = screen.getByRole("button");

    expect(select).toHaveValue("option 2");
    expect(button).toHaveTextContent("Option 2");
  });

  it("handles options update", () => {
    const { rerender } = render(
      <Select items={[{ label: "Option 1", value: "option 1" }]} />
    );

    rerender(
      <Select
        items={[
          { label: "Option 1", value: "option 1" },
          { label: "Option 2", value: "option 2" },
        ]}
      />
    );

    const select = screen.getByRole("combobox", { hidden: true });
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(select).not.toHaveValue();
  });

  it("handles options update without initial options", () => {
    const { rerender } = render(<Select />);

    rerender(<Select items={items} />);

    const select = screen.getByRole("combobox", { hidden: true });
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(select).not.toHaveValue();
  });
});

describe("events", () => {
  it("returns selected value with onChange", async () => {
    const onChangeSpy = jest.fn();

    render(
      <Select
        items={[
          { label: "Option 1", value: "option 1" },
          { label: "Option 2", value: "option 2" },
        ]}
        onChange={onChangeSpy}
      />
    );

    const options = screen.getAllByRole("option");
    const select = screen.getByRole("combobox", { hidden: true });

    userEvent.click(options[1]);

    await waitFor(() => {
      expect(onChangeSpy).toBeCalledWith("option 2");
      expect(select).toHaveValue("option 2");
    });
  });
});

describe("static", () => {
  it("has value", async () => {
    const container = renderWithoutRuntime(
      <Select
        items={[
          { label: "Option 1", value: "option 1" },
          { label: "Option 2", value: "option 2" },
        ]}
        value="option 2"
      />
    );

    const el = container.querySelector("[data-select]");
    selectStatic(el);

    const select = within(container).getByRole("combobox", { hidden: true });
    const button = within(container).getByRole("button");

    await waitFor(() => {
      expect(select).toHaveValue("option 2");
      expect(button).toHaveTextContent("Option 2");
    });
  });

  it("set selected value on options click", async () => {
    const container = renderWithoutRuntime(
      <Select
        items={[
          { label: "Option 1", value: "option 1" },
          { label: "Option 2", value: "option 2" },
        ]}
      />
    );

    const el = container.querySelector("[data-select]");
    selectStatic(el);

    const button = within(container).getByRole("button");
    const select = within(container).getByRole("combobox", { hidden: true });

    act(() => {
      userEvent.click(button);
    });

    act(() => {
      const options = within(container).getAllByRole("option");
      userEvent.click(options[1]);
    });

    await waitFor(() => {
      expect(select).toHaveValue("option 2");
      expect(button).toHaveTextContent("Option 2");
    });
  });
});
