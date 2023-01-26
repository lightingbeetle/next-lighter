import React, {ComponentProps} from 'react';
import {Meta, Story} from "@storybook/react";

import { Button } from "components";

type ButtonProps = ComponentProps<typeof Button>

type X = ButtonProps['purpose']

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    square: {
      control: 'boolean',
      defaultValue: false
    },
    isActive: {
      control: 'boolean',
      defaultValue: false
    },
    isDisabled: {
      control: 'boolean',
      defaultValue: false
    },
    purpose: {
      control: 'select',
      options: ['link', 'secondary', undefined]
    }
  },
} as Meta<ButtonProps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'plain',
  children: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'l',
  children: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 's',
  children: 'Button'
};
