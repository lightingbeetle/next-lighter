type CustomPages = {
  [key: string]: {
    nextRuntime: boolean;
    scripts: string[];
  };
};

const customPages: CustomPages = {
  "/static": { nextRuntime: false, scripts: ["static.js"] },
};

export default customPages;
