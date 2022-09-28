import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { axe } from "jest-axe";

import Table, {
  TableWrapper,
  TableBody,
  TableRow,
  TableHeading,
  TableCell,
  TableHead,
} from ".";
import Icon from "../Icon";
import Button from "../Button";

function resizeWindow(x: number, y: number) {
  // @ts-ignore
  window.innerWidth = x;
  // @ts-ignore
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
}

const columns = [
  {
    Header: "Meno",
    accessor: "meno",
  },
  { Header: "Dátum vypracovania", accessor: "datum" },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }: any) => (
      <div className="d-flex align-item-center">
        <Icon
          name={value === "vypracované" ? "heart" : "close"}
          className={`text-color-${
            value === "vypracované" ? "primary" : "error"
          }`}
          style={{ marginRight: "0.5rem" }}
        />
        {value}
      </div>
    ),
  },
  {
    Header: "",
    accessor: "confirm",
    Cell: () => (
      <Button size="s" className="no-mrg text-nowrap">
        <Icon className="icon--left" name="heart" size="s" />
        Potvrdiť
      </Button>
    ),
  },
  {
    Header: "",
    accessor: "delete",
    Cell: () => (
      <Button
        type="link"
        size="s"
        className="text-color-error no-mrg text-nowrap"
      >
        <Icon className="icon--left" name="close" size="s" />
        Odstrániť
      </Button>
    ),
  },
];

const data = [
  {
    meno: "Kristin Watson",
    datum: "December 19, 2013",
    status: "vypracované",
    confirm: true,
    delete: true,
  },
];

describe("Table", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <Table
          columns={columns}
          data={data}
          data-testid="table"
          caption="Názov tabuľky"
        />
      );

      const table = screen.getByTestId("table");
      expect(table).toBeInTheDocument();
    });

    it("renders table headings correctly", () => {
      render(
        <Table
          columns={columns}
          data={data}
          data-testid="table"
          caption="Názov tabuľky"
        />
      );

      const table = screen.getByTestId("table");
      const thead = table.querySelector("thead");
      const tableHeadings = thead?.querySelectorAll("th");

      expect(thead).toBeInTheDocument();
      expect(tableHeadings?.length).toBe(5);
      expect(tableHeadings && tableHeadings[0].textContent).toBe("Meno");
      expect(tableHeadings && tableHeadings[1].textContent).toBe(
        "Dátum vypracovania"
      );

      expect(tableHeadings && tableHeadings[2].textContent).toBe("Status");
    });

    it("renders table content correctly", () => {
      render(
        <Table
          columns={columns}
          data={data}
          data-testid="table"
          caption="Názov tabuľky"
        />
      );

      const table = screen.getByTestId("table");
      const tbody = table.querySelector("tbody");
      const allTableRows = tbody?.querySelectorAll("tr");
      const tableRow = tbody?.querySelector("tr");
      const tableRowColumns = tableRow?.querySelectorAll("td");

      expect(tbody).toBeInTheDocument();
      expect(allTableRows?.length).toBe(1);
      expect(tableRowColumns?.length).toBe(5);
      expect(tableRowColumns && tableRowColumns[0].textContent).toBe(
        "Kristin Watson"
      );
      expect(tableRowColumns && tableRowColumns[1].textContent).toBe(
        "December 19, 2013"
      );
      expect(
        tableRowColumns && tableRowColumns[2].querySelector("svg")
      ).toBeTruthy();
      expect(tableRowColumns && tableRowColumns[2].textContent).toContain(
        "vypracované"
      );
      expect(
        tableRowColumns && tableRowColumns[3].querySelector("button")
      ).toBeTruthy();
      expect(
        tableRowColumns &&
          tableRowColumns[3].querySelector("button")?.textContent
      ).toContain("Potvrdiť");
      expect(
        tableRowColumns &&
          tableRowColumns[4].querySelector("button")?.textContent
      ).toContain("Odstrániť");
    });
  });
});

describe("TableWrapper", () => {
  describe("Rendering", () => {
    it("renders caption correctly", () => {
      const { getByText } = render(
        <Table columns={columns} data={data} caption="Názov tabuľky" />
      );

      const tableCaption = getByText("Názov tabuľky");

      expect(tableCaption).toBeInTheDocument();
      expect(tableCaption.tagName).toBe("CAPTION");
    });

    it.each([[99, 50]])("it gets tabIndex attribute", async (x, y) => {
      resizeWindow(x, y);

      render(
        <Table
          columns={columns}
          data={data}
          caption="Názov tabuľky"
          className="test-className"
          data-testid="table"
        />
      );

      const tableWrapper = screen.getByTestId("table");

      await waitFor(() => {
        expect(tableWrapper.getAttribute("tabIndex")).toBe("0");
      });
    });

    it("renders table content correctly", () => {
      render(
        <Table
          columns={columns}
          data={data}
          caption="Názov tabuľky"
          data-testid="table"
        />
      );

      const table = screen.getByTestId("table");
      const tbody = table.querySelector("tbody");
      const allTableRows = tbody?.querySelectorAll("tr");
      const tableRow = tbody?.querySelector("tr");
      const tableRowColumns = tableRow?.querySelectorAll("td");

      expect(tbody).toBeInTheDocument();
      expect(allTableRows?.length).toBe(1);
      expect(tableRowColumns?.length).toBe(5);
      expect(tableRowColumns && tableRowColumns[0].textContent).toBe(
        "Kristin Watson"
      );
      expect(tableRowColumns && tableRowColumns[1].textContent).toBe(
        "December 19, 2013"
      );
      expect(
        tableRowColumns && tableRowColumns[2].querySelector("svg")
      ).toBeTruthy();
      expect(tableRowColumns && tableRowColumns[2].textContent).toContain(
        "vypracované"
      );
      expect(
        tableRowColumns && tableRowColumns[3].querySelector("button")
      ).toBeTruthy();
      expect(
        tableRowColumns &&
          tableRowColumns[3].querySelector("button")?.textContent
      ).toContain("Potvrdiť");
      expect(
        tableRowColumns &&
          tableRowColumns[4].querySelector("button")?.textContent
      ).toContain("Odstrániť");
    });
  });

  describe("Props", () => {
    it("visually hides caption when hiddenCaption prop is passed", () => {
      const { getByText } = render(
        <Table
          columns={columns}
          data={data}
          caption="Názov tabuľky"
          hiddenCaption
        />
      );

      const tableCaption = getByText("Názov tabuľky");

      expect(tableCaption).toBeInTheDocument();
      expect(tableCaption).toHaveClass("visually-hidden");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <Table
          columns={columns}
          data={data}
          caption="Názov tabuľky"
          data-testid="table"
        />
      );

      const tableWrapper = screen.getByTestId("table");
      const tableElement = tableWrapper.querySelector("table");

      expect(tableWrapper).toBeInTheDocument();
      expect(tableWrapper.tagName).toBe("DIV");
      expect(tableElement).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper
          className="test-class"
          data-testid="table"
          caption="Názov tabuľky"
        >
          <TableBody data-testid="tbody" />
        </TableWrapper>
      );

      const table = screen.getByTestId("table");

      expect(table).toHaveClass("test-class");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper data-testid="table" caption="Názov tabuľky">
          <TableBody data-testid="tbody" />
        </TableWrapper>
      );

      const table = screen.getByTestId("table");

      expect(await axe(table)).toHaveNoViolations();
    });
  });
});

describe("TableHead", () => {
  describe("Rendering", () => {
    it("renders thead tag correctly", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead data-testid="thead" />
        </TableWrapper>
      );

      const tableHead = screen.getByTestId("thead");

      expect(tableHead).toBeInTheDocument();
      expect(tableHead.tagName).toBe("THEAD");
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead className="test-class" data-testid="thead" />
        </TableWrapper>
      );

      const tableHead = screen.getByTestId("thead");

      expect(tableHead).toHaveClass("test-class");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead data-testid="thead" />
        </TableWrapper>
      );

      const tableHead = screen.getByTestId("thead");

      expect(await axe(tableHead)).toHaveNoViolations();
    });
  });
});

describe("TableRow", () => {
  describe("Rendering", () => {
    it("renders tr tag correctly", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody>
            <TableRow data-testid="tr" />
          </TableBody>
        </TableWrapper>
      );

      const tableRow = screen.getByTestId("tr");

      expect(tableRow).toBeInTheDocument();
      expect(tableRow.tagName).toBe("TR");
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody>
            <TableRow className="test-class" data-testid="tr" />
          </TableBody>
        </TableWrapper>
      );

      const tableRow = screen.getByTestId("tr");

      expect(tableRow).toHaveClass("test-class");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody>
            <TableRow data-testid="tr" />
          </TableBody>
        </TableWrapper>
      );

      const tableRow = screen.getByTestId("tr");

      expect(await axe(tableRow)).toHaveNoViolations();
    });
  });
});

describe("TableHeading", () => {
  describe("Rendering", () => {
    it("renders th tag correctly", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableHeading data-testid="th" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableHeading = screen.getByTestId("th");

      expect(tableHeading).toBeInTheDocument();
      expect(tableHeading.tagName).toBe("TH");
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableHeading rowSpan={3} data-testid="th" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableHeading = screen.getByTestId("th");

      expect(tableHeading.getAttribute("rowspan")).toBe("3");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableHeading data-testid="th" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableHeading = screen.getByTestId("th");

      expect(await axe(tableHeading)).toHaveNoViolations();
    });
  });
});

describe("TableBody", () => {
  describe("Rendering", () => {
    it("renders tbody tag correctly", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody data-testid="tbody" />
        </TableWrapper>
      );

      const tableBody = screen.getByTestId("tbody");

      expect(tableBody).toBeInTheDocument();
      expect(tableBody.tagName).toBe("TBODY");
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody className="test-class" data-testid="tbody" />
        </TableWrapper>
      );

      const tableBody = screen.getByTestId("tbody");

      expect(tableBody).toHaveClass("test-class");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableBody data-testid="tbody" />
        </TableWrapper>
      );

      const tableBody = screen.getByTestId("tbody");

      expect(await axe(tableBody)).toHaveNoViolations();
    });
  });
});

describe("TableCell", () => {
  describe("Rendering", () => {
    it("renders td tag correctly", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableCell data-testid="td" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableCell = screen.getByTestId("td");

      expect(tableCell).toBeInTheDocument();
      expect(tableCell.tagName).toBe("TD");
    });
  });

  describe("Props", () => {
    it("gets passed attributes", () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} data-testid="td" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableCell = screen.getByTestId("td");

      expect(tableCell.getAttribute("colspan")).toBe("3");
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(
        <TableWrapper caption="Názov tabuľky">
          <TableHead>
            <TableRow>
              <TableCell data-testid="td" />
            </TableRow>
          </TableHead>
        </TableWrapper>
      );

      const tableCell = screen.getByTestId("td");

      expect(await axe(tableCell)).toHaveNoViolations();
    });
  });
});
