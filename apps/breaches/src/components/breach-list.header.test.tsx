import React from "react";
import { render, screen } from "@testing-library/react";
import BreachListHeader from "./breach-list-header.componet";
import { Column } from "../types";
import { Table } from "@mui/material";

const columns: Column[] = [
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "Domain",
    label: "Domain",
  },
  {
    id: "BreachDate",
    label: "Date of Breach",
  },
];

test("render columns", () => {
  render(
    <Table>
      <BreachListHeader columns={columns} onRequestSort={jest.fn()} />
    </Table>
  );

  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Domain")).toBeInTheDocument();
  expect(screen.getByText("Date of Breach")).toBeInTheDocument();
});
