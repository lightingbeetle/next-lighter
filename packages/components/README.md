# Components

Set of documented React components to kick start project.

## Local development

See [example](../example)

## Build

- `npm run build` in this package
- `npm run build:components` in the root of this project

### How to use components on projects

#### Styles

1. Install [sass](https://www.npmjs.com/package/sass) and [modern-normalize](https://www.npmjs.com/package/modern-normalize)
2. Copy `/styles` folder to your project
    - (Optional) If you want to preserve JS exports and functions install [polished](https://www.npmjs.com/package/polished)
    - (Optional) If you want to preserve tests, they are written in [jest](https://www.npmjs.com/package/jest) and you must not mock `index.scss` imports (like with `moduleNameMapper` in jest config)
3. Remove unwanted component styles from `styles/index.scss` and add yours project specific
4. Update configs in `styles/tokens/**/index.scss` according to your project needs
5. Import `styles/index.scss` to your project (like in `_app.tsx` in Next.js)
6. Use styles in your components like in the examples

    ```scss
    @use '../../styles/tokens';

    .my-class {
      color: tokens.color('primary');
    }
    ```

    ```jsx
    const MyComponent = () => <span className="text-color-primary">text</span>
    ```

## Principles

### Headless UI components

Components are build in headless way where all logic is encapsulated in one or more React hooks. Great example of this is [Downshift](https://github.com/paypal/downshift), [React Table](https://github.com/tannerlinsley/react-table) or [React Aria](https://react-spectrum.adobe.com/react-aria/).

#### Basic example

```js
function useToggle() {
  const [on, setOnState] = React.useState(false);
  const toggle = () => setOnState((o) => !o);
  const setOn = () => setOnState(true);
  const setOff = () => setOnState(false);
  return { on, toggle, setOn, setOff };
}
function Toggle() {
  const { on, toggle, setOn, setOff } = useToggle();
  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={toggle} />
    </div>
  );
}
function App() {
  return <Toggle />;
}
```

#### Why?

Main purpose is to separeate logic and UI in meaningful matter. It's great mechanism to reause stateful logic and behavior of the components and easy to modify UI structure.

#### Using components hooks without rendering UI with React

Building components logic with components hooks allows to reuse this logic outside of React enviroments with help of [Lighter hooks library](../lighter-hooks). Example can be found in [Select component](./src/components/Select/Select.static.ts).

#### Example of using components hook outside React

```js
/* Assuming Toggle UI */
/*
<div data-toggle>
  <button data-toggle-on>Switch Off</button>
  <button data-toggle-off>Switch On</button>
  <input type="checkbox" data-toggle-value />
</div>
*/

import hookIt from "@lighting-beetle/lighter-hooks";
import useToggle from "./useToggle";

const toggle = hoohIt((el) => {
  const { on, toggle, setOn, setOff } = useToggle();

  const offEl = el.querySelector("[data-toggle-off]");
  const onEl = el.querySelector("[data-toggle-on]");
  const checkboxEl = el.querySelector("[data-toggle-value]");

  useEffect(() => {
    checkboxEl.checked = on;
  }, [on, checkboxEl]);

  useEffect(() => {
    offEl.addEventListener("click", setOff);
    onEl.addEventListener("click", setOn);
    checkboxEl.addEventListener("change", toggle);

    return () => {
      offEl.removeEventListener("click", setOff);
      onEl.removeEventListener("click", setOn);
      checkboxEl.removeEventListener("change", toggle);
    };
  }, [offEl, onEl, checkboxEl]);

  return {};
});

select(document.querySelector("[data-toggle]"));
```

### CSS variables

Components should be build with CSS variables to be more future capable and dynamic.

### Documentation

Components are documented in MDX files. Documentation of every component should contain:

- Basic visual example
- Description of the component, why exists and when to or not to use it
- Visual example of all variants with description why this wariant exists and code examples
- Documentation of components React props
- Documentation of static methods
- Accessibility notes

### Testing

Components API and logic should be tested with help of [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to ensure functionality and to improve documentation.
