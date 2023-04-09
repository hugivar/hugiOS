import React from "react";
import { it, expect, vi } from 'vitest';
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

it("render columns", () => {
  render(
    <Table>
      <BreachListHeader columns={columns} onRequestSort={vi.fn()} />
    </Table>
  );

  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Domain")).toBeInTheDocument();
  expect(screen.getByText("Date of Breach")).toBeInTheDocument();
});
