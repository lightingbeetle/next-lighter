import { renderSync } from "sass";
import { BreakpointsMap, breakpoint } from ".";

function renderSass(args) {
  return renderSync({
    outputStyle: "compressed",
    // not sure why this is needed and if it covers most uscases
    importer: (originalUrl) => {
      return { file: require.resolve(`./${originalUrl}`) };
    },
    ...args,
  }).css.toString();
}

describe("scss breakpoint function", () => {
  it("should return mobile first media query", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('l') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (min-width: 1280px){.foo{display:block}}"
    );
  });

  it("shound't return media query on smallest breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('xs') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(".foo{display:block}");
  });

  it("should't returns media query on default breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('default') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(".foo{display:block}");
  });

  it("should return media query of specified value", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('800px') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (min-width: 800px){.foo{display:block}}"
    );
  });

  it("should return max-width media query including that breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('m', 'down') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (max-width: 1279px){.foo{display:block}}"
    );
  });

  it.skip("throws on 'down' from largest breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('l', 'down') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toThrowError();
  });

  it("should return max-width media query excluding that breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('m', 'downfrom') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (max-width: 767px){.foo{display:block}}"
    );
  });

  it.skip("should't return max-width media query excluding that breakpoint on smallest breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('xs', 'downfrom') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toThrowError();
  });

  it("should return media query from that breakpint to next breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('m', 'only') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (min-width: 768px)and (max-width: 1279px){.foo{display:block}}"
    );
  });

  it("should return media query from smallest breakpint to next breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('xs', 'only') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (min-width: 0)and (max-width: 767px){.foo{display:block}}"
    );
  });

  it.skip("should return media query from largest breakpint to next breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('l', 'only') {
        display: block;
      }
    }
    `;

    const output = renderSass({ data });

    expect(output).toBe(
      "@media screen and (min-width: 1280px){.foo{display:block}}"
    );
  });

  it.skip("should throw on notdefined breakpoint", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('notabreakpoint') {
        display: block;
      }
    }
    `;

    const spy = jest.spyOn(process.stderr, "write").mockImplementation();

    renderSass({
      data,
    });

    expect(spy.mock.calls[1][0]).toMatch(
      /Breakpoint 'notabreakpoint' is not defined in \$breakpoints/
    );

    spy.mockRestore();
  });

  it("should throw on notdefined param", () => {
    const data = `
    @use "./index.scss" as *;

    .foo {
      @include breakpoint('l', 'notaparam') {
        display: block;
      }
    }
    `;

    const spy = jest.spyOn(process.stderr, "write").mockImplementation();

    renderSass({
      data,
    });

    expect(spy.mock.calls[1][0]).toMatch(
      /Breakpoint is not configured properly l, notaparam/
    );

    spy.mockRestore();
  });
});

// there is no way to import SCSS file with exports in jest test so we need to mock it
const breakpointMock: BreakpointsMap = {
  xs: "0",
  m: "768px",
  l: "1280px",
};

describe("js breakpoint function", () => {
  it("should retrun breakpoint value", () => {
    expect(breakpoint("m", breakpointMock)).toBe("768px");
  });
  it("throws error on non-existing breakpoint", () => {
    expect(() => breakpoint("notabreakpoint", breakpointMock)).toThrowError();
  });
});
