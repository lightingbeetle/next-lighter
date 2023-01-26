import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react";

import { DocumentationSampleComponent, DocumentationSampleComponentProps } from "./DocumentationSampleComponent";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/DocumentationSampleComponent",
  component: DocumentationSampleComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: ["small", "large"],
    },
  },
  parameters: {
    componentSubtitle:
      "Buttons are control elements used for navigating and operating a page and form submission.",
  },
} as Meta<DocumentationSampleComponentProps>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<DocumentationSampleComponentProps> = (args) => (
  <DocumentationSampleComponent {...args} />
);

export const Small = Template.bind({});
Small.args = {
  variant: "small",
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit.",
};

export const Large = Template.bind({});
Large.args = {
  variant: "large",
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae."
};
Large.parameters = {
  docs: {
    storyDescription: 'This is a story description for large variant of our component. It supports **Markdown** and `code`.'
  }
}
