import { Button, Icon, Select } from "components";

export default function getMDXScope() {
  return {
    // TODO: We should not name all possible components here
    button: { __docgenInfo: Button.__docgenInfo ?? null },
    select: { __docgenInfo: Select.__docgenInfo ?? null },
    icon: { __docgenInfo: Icon.__docgenInfo ?? null },
    selectItems: [
      { label: "Item 1", value: "item 1" },
      { label: "Item 2", value: "item 2" },
      { label: "Item 3", value: "item 3" },
    ],
  };
}
