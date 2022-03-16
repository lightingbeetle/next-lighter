module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  moduleNameMapper: {
    "^.+/export.module.(css|scss)$": "identity-obj-proxy",
    "^.+/style.(css|scss)$": "identity-obj-proxy",
    "^@lighting\\-beetle/lighter\\-hooks$":
      "<rootDir>/../../packages/lighter-hooks/src/index.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
