type customPages = {
  [key: string]: {
    nextRuntime: boolean;
    scripts: string[];
  };
};

const customPages: customPages = {
  '/static': { nextRuntime: false, scripts: ['static.js'] },
};

export default customPages;
