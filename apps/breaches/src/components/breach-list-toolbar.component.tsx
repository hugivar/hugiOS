import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Column } from "../types";

interface BreachListColumnProps {
  columns: Column[];
  rowCount: number;
  onSearchChange: (column: string, searchText: string) => void;
}

export default function BreachListToolbar({
  columns,
  rowCount,
  onSearchChange,
}: BreachListColumnProps) {
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0].id);

  const handleChange = (value) => {
    setSelectedColumn(value);
  };

  const handleSearchClose = () => {
    onSearchChange(selectedColumn, "");
    setOpenSearch(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {openSearch ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="column-select-label">Column</InputLabel>
              <Select
                labelId="column-select-label"
                id="column-select"
                value={selectedColumn}
                label="Column"
                onChange={(event: React.MouseEvent<unknown>) =>
                  handleChange(event.target.value)
                }
              >
                {columns.map((item: Column) => (
                  <MenuItem value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="search-field"
              label="Search"
              variant="standard"
              fullWidth
              onChange={(event: React.MouseEvent<unknown>) =>
                onSearchChange(selectedColumn, event.target.value)
              }
            />
          </Grid>
        </Grid>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="breaches-count"
          component="div"
        >
          {rowCount} Breaches
        </Typography>
      )}
      {openSearch ? (
        <Tooltip title="Clear search">
          <IconButton sx={{ ml: 10 }} onClick={handleSearchClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Search breaches">
          <IconButton onClick={() => setOpenSearch(true)}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
