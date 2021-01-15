module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^.+/export.module.(css|scss)$": "identity-obj-proxy",
    "^.+/style.(css|scss)$": "identity-obj-proxy"
  }
};
