import * as components from "components";

const { tokens, ...appComponents } = components;

// FIXME: provide return type, infering is not working here
export default function getMDXScope(): object {
  const allComponentDocgens = Object.entries(appComponents).reduce(
    // @ts-expect-error not sure what is the problem here
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
