import React from "react";

import Icon from "../Icon";
import Button from "../Button";

export const tableAppColumns = [
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
          size="s"
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
      <Button type="link" size="s" className="no-mrg text-nowrap">
        <Icon className="icon--left" name="close" size="s" />
        Odstrániť
      </Button>
    ),
  },
];

export const tableAppData = [
  {
    meno: "Kristin Watson",
    datum: "December 19, 2013",
    status: "vypracované",
  },
  {
    meno: "Courtney Henry",
    datum: "July 14, 2015",
    status: "po termíne",
  },
  {
    meno: "Bessie Cooper",
    datum: "December 2, 2018",
    status: "vypracované",
  },
];

export const tableAppDataPaginationExample = [
  {
    meno: "Kristin Watson",
    datum: "December 19, 2013",
    status: "vypracované",
  },
  {
    meno: "Courtney Henry",
    datum: "July 14, 2015",
    status: "po termíne",
  },
  {
    meno: "Bessie Cooper",
    datum: "December 2, 2018",
    status: "vypracované",
  },
  {
    meno: "Guy Hawkins",
    datum: "August 24, 2013",
    status: "vypracované",
  },
  {
    meno: "Darlene Robertson",
    datum: "May 6, 2012",
    status: "po termíne",
  },
  {
    meno: "Ralph Edwards",
    datum: "November 7, 2017",
    status: "vypracované",
  },
  {
    meno: "Marvin McKinney",
    datum: "November 16, 2014",
    status: "vypracované",
  },
  {
    meno: "Annette Black",
    datum: "October 24, 2018",
    status: "vypracované",
  },
  {
    meno: "Eleanor Pena",
    datum: "May 12, 2019",
    status: "po termíne",
  },
  {
    meno: "Cody Fisher",
    datum: "March 13, 2014",
    status: "po termíne",
  },
];
