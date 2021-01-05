import { renderSync } from "sass";
import { SpacesMap, space, spaceValue } from ".";

function renderSass(args) {
  return renderSync({
    outputStyle: "compressed",
    // not sure why this is needed and if it covers most uscases
    importer: originalUrl => {
      return { file: require.resolve(`./${originalUrl}`) };
    },
    ...args
  }).css.toString();
}

describe("scss space function", () => {
  it("should return value", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      padding: space('l');
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(".foo{padding:1.5rem}");
  });

  it("should return default value", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      padding: space();
      margin: space('default');
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(".foo{padding:1rem;margin:1rem}");
  });

  it("should throw on notdefined space", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      padding: space('notaspace');
    }
    `;

    const spy = jest.spyOn(process.stderr, "write").mockImplementation();

    renderSass({
      data
    });

    expect(spy.mock.calls[1][0]).toMatch(
      /Space 'notaspace' is not defined in \$spaces/
    );

    spy.mockRestore();
  });
});

// there is no way to import SCSS file with exports in jest test so we need to mock it
const spacesMock: SpacesMap = {
  default: "16px",
  s: "8px",
  l: "24px"
};

describe("js space function", () => {
  it("should retrun breakpoint value", () => {
    expect(space("l", spacesMock)).toBe("1.5rem");
  });
  it("throws error on non-existing breakpoint", () => {
    expect(() => space("notaspace", spacesMock)).toThrowError();
  });
});

describe("js spaceValue function", () => {
  it("should retrun breakpoint value", () => {
    expect(spaceValue("l", spacesMock)).toBe("24px");
  });
  it("throws error on non-existing breakpoint", () => {
    expect(() => spaceValue("notaspace", spacesMock)).toThrowError();
  });
});
