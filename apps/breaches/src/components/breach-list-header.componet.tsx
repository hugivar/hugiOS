import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Data, Order, Column } from "../types";

interface BreachListHeaderProps {
  onRequestSort: (event: React.MouseEvent<unknown>, column: keyof Data) => void;
  order?: Order;
  orderBy?: string;
  columns: Column[];
}

export default function BreachListHeader({
  order,
  orderBy,
  onRequestSort,
  columns,
}: BreachListHeaderProps) {
  const handleSort = (event: React.MouseEvent<unknown>, column: keyof Data) => {
    onRequestSort(event, column);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={(event) => handleSort(event, headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "descending" : "ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
