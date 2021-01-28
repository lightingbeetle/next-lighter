module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  moduleNameMapper: {
    "^.+/export.module.(css|scss)$": "identity-obj-proxy",
    "^.+/style.(css|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
