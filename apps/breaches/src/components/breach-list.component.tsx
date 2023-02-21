import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import BreachListHeader from "./breach-list-header.componet";
import { Data, Order, Column } from "../types";
import BreachListToolbar from "./breach-list-toolbar.component";
import { Typography } from "@mui/material";

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

const sortRows = (rows: Data[], order: Order, orderBy: string) =>
  [...rows].sort((a, b) =>
    order === "desc"
      ? a[orderBy] > b[orderBy]
        ? -1
        : 1
      : a[orderBy] > b[orderBy]
      ? 1
      : -1
  );

interface BreachListProps {
  show: boolean;
  loading: boolean;
  data: Data[];
}

export default function BreachList({ show, loading, data }: BreachListProps) {
  const [rows, setRows] = useState(
    data || Array.from({ length: 10 }, (_, i) => i)
  );
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("Name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    column: keyof Data
  ) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const sortedRows = sortRows(rows, order, orderBy);

  const handleSearchChange = (column, searchText) => {
    if (searchText.length === 0) {
      return setRows(data);
    }
    const filteredRows = data.filter((item) => {
      return item[column].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

    setRows(filteredRows);
  };

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  if (!show) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <BreachListToolbar
          columns={columns}
          rowCount={!loading ? rows.length : null}
          onSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="breaches-count">
            <BreachListHeader
              order={order}
              orderBy={orderBy}
              columns={columns}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {loading ? (
                        <Skeleton width={180} height={32} />
                      ) : (
                        row?.Name
                      )}
                    </TableCell>
                    <TableCell>
                      {loading ? (
                        <Skeleton width={180} height={32} />
                      ) : (
                        row?.Domain
                      )}
                    </TableCell>
                    <TableCell>
                      {loading ? (
                        <Skeleton width={180} height={32} />
                      ) : (
                        row?.BreachDate
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {data.length === 0 && !loading ? (
            <Typography variant="h6" align="center" py="4rem">
              No Breaches Found
            </Typography>
          ) : null}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
