import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { IBlog } from "../../redux/model/IBlog";

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof IBlog;
  label: string;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IBlog
  ) => void;
  order: Order;
  orderBy: string;
}

export const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) => {

  const headCells: readonly HeadCell[] = [
    {
      id: "title",
      label: "Title",
    },
    {
      id: "created_at",
      label: "Publication Date",
    },
  ];

  const createSortHandler =
  (property: keyof IBlog) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
