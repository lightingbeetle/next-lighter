# Styleguide

[Live demo & docs](https://next-lighter-styelguide.lbx.sk)

Set of components to build styleguides and design systems.

## Quick start

```js
import React from "react";
import { Styleguide } from "@lighting-beetle/lighter-styleguide";

const DesignSystemPage = ({ children }) => {
  return (
    <Styleguide
      routes={[
        {
          title: "Design system",
          href: "/",
        },
        {
          title: "Components",
          routes: [
            {
              title: "Button",
              href: "/buttons",
            },
          ],
        },
      ]}
      currentPage="Title"
      logoSrc="/logo.svg"
    >
      {children}
    </Styleguide>
  );
};

export default DesignSystemPage;
```

## Local development

`npm run dev` in this package to run Next.js dev environment which also serves as documentation for this project.

## Build

This will build both: components package and docs.

- `npm run build` in this package
- `npm run build:styleguide` in the root of this project

## Principles

### Headless UI components

Components are build in headless way where all logic is encapsulated in one or more React hooks. Great example of this is [Downshift](https://github.com/paypal/downshift), [React Table](https://github.com/tannerlinsley/react-table) or [React Aria](https://react-spectrum.adobe.com/react-aria/).

### Compound components

Addtion to the headless components pattern with compound components are able to share components logic to children and with that build entairly custom UI without need to replicate the components logic. This is important when there is need to customize styelguide UI, but not redo base components like `Props` or `Preview` because they are fairly complex. See more at [React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks).

#### Example of compound component

```js
import { Props, usePropsContext } from "@lighting-beetle/lighter-styleguide";

const MyPropsTable = () => {
  const { props, displayName, description } = usePropsContext();

  return <div />; // Custom UI
};

const MyProps = () => (
  <Props component={Component}>
    <MyPropsTable />
  </Props>
);
```
