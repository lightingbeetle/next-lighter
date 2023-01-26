import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react";
import { within, createEvent, fireEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Button } from "components";

type ButtonProps = ComponentProps<typeof Button>;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    square: {
      control: "boolean",
      defaultValue: false,
    },
    isActive: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    purpose: {
      control: "select",
      options: ["link", "secondary", undefined],
    },
  },
  parameters: {
    componentSubtitle:
      "Buttons are control elements used for navigating and operating a page and form submission.",
  },
} as Meta<ButtonProps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: "plain",
  children: "Button",
};

export const Link = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Link.args = {
  variant: "plain",
  children: "Link to Storybook homepage",
  href: "https://storybook.js.org",
  purpose: "link",
};
Link.play = async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement);
  const element = canvas.getByRole("link");
  const event = createEvent.click(element);
  event.preventDefault();
  fireEvent(element, event);

  expect(element).toHaveAttribute("href", "https://storybook.js.org");
  expect(element.tagName.toLowerCase()).toBe("a");
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "l",
  children: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "s",
  children: "Button",
};
