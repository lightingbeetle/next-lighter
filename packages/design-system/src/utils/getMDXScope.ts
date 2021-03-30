import { components } from "components";

export default function getMDXScope() {
  const allComponentDocgens = Object.entries(components).reduce(
    (docgens, [ComponentName, Component]) => ({
      ...docgens,
      [ComponentName.toLowerCase()]: {
        __docgenInfo: Component.__docgenInfo ?? null,
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
