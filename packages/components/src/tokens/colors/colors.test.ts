import { renderSync } from "sass";
import { color, colorHex } from ".";
import scssTestImporter from "../../utils/ScssTestImporter";

function renderSass(args) {
  return renderSync({
    outputStyle: "compressed",
    // not sure why this is needed and if it covers most uscases
    importer: scssTestImporter(__dirname),
    ...args
  }).css.toString();
}

describe("scss color function", () => {
  it("returns css variable with default shade", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      color: color('primary');
    }`;

    const output = renderSass({ data });

    expect(output).toBe(".foo{color:var(--color-primary-500)}");
  });

  it("returns css variable with specified shade", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      color: color('error', 100);
    }`;

    const output = renderSass({ data });

    expect(output).toBe(".foo{color:var(--color-error-100)}");
  });

  it("returns css variable of non existing color and warns", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      color: color('notacolor');
    }`;

    const spy = jest.spyOn(process.stderr, "write").mockImplementation();

    const output = renderSass({
      data
    });

    expect(spy.mock.calls[1][0]).toMatch(
      /Color 'notacolor' is not defined in \$colors/
    );

    expect(output).toBe(".foo{color:var(--color-notacolor-500)}");

    spy.mockRestore();
  });

  it("returns css variable of non existing shade and warns", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      color: color('primary', 1);
    }`;

    const spy = jest.spyOn(process.stderr, "write").mockImplementation();

    const output = renderSass({
      data
    });

    expect(spy.mock.calls[1][0]).toMatch(
      /Color 'primary\.1' is not defined in \$colors/
    );

    expect(output).toBe(".foo{color:var(--color-primary-1)}");

    spy.mockRestore();
  });
});

// there is no way to import SCSS file with exports in jest test so we need to mock it
const colorPalleteMock = {
  primary: {
    500: "#ff5722"
  },
  error: {
    100: "#ffe3e3"
  }
};

describe("js color function", () => {
  it("returns css variable of default shade", () => {
    expect(color("primary", undefined, colorPalleteMock)).toBe(
      "--color-primary-500"
    );
  });
  it("returns css variable of specified shade", () => {
    expect(color("error", 100, colorPalleteMock)).toBe("--color-error-100");
  });
  it("throws error on non-existing color", () => {
    expect(() =>
      color("notacolor", undefined, colorPalleteMock)
    ).toThrowError();
  });
  it("throws error on non-existing shade", () => {
    expect(() => color("primary", 100, colorPalleteMock)).toThrowError();
  });
});

describe("js colorHex function", () => {
  it("returns hex value with default shade", () => {
    expect(colorHex("primary", undefined, colorPalleteMock)).toBe("#ff5722");
  });
  it("returns hex value with specified shade", () => {
    expect(colorHex("error", 100, colorPalleteMock)).toBe("#ffe3e3");
  });
  it("throws error on non-existing color", () => {
    expect(() =>
      colorHex("notacolor", undefined, colorPalleteMock)
    ).toThrowError();
  });
  it("throws error on non-existing shade", () => {
    expect(() => colorHex("primary", 100, colorPalleteMock)).toThrowError();
  });
});
