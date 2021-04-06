import * as components from "components";

const { tokens, ...appComponents } = components;

export default function getMDXScope() {
  const allComponentDocgens = Object.entries(appComponents).reduce(
    (
      docgens,
      [ComponentName, Component]: [string, { __docgenInfo: object }]
    ) => ({
      ...docgens,
      [ComponentName.toLowerCase()]: {
        __docgenInfo: Component?.__docgenInfo ?? null,
      },
    }),
    {}
  );
  return {
    ...allComponentDocgens,
    selectItems: [
      { label: "Item 1", value: "item 1" },
      { label: "Item 2", value: "item 2" },
      { label: "Item 3", value: "item 3" },
    ],
  };
}
