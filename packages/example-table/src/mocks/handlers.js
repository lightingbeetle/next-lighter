export const commonHandlers = [];

const testOnlyHandlers = [];

export const serverHandler = [
  ...commonHandlers,
  // eslint-disable-next-line no-undef
  ...(process.env.NODE_ENV === "test" ? testOnlyHandlers : []),
];
export const browserHandlers = [
  ...commonHandlers,
  // eslint-disable-next-line no-undef
  ...(process.env.NODE_ENV === "test" ? testOnlyHandlers : []),
];
