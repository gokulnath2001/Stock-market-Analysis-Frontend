import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const createTableHeader = (dataHeader) =>
  dataHeader.map((item) => (
    <TableCell key={item}>{item.toUpperCase()}</TableCell>
  ));

export const BasicTable = (props) => {
  const { tableHeaders, tableData } = props.table;
  const TableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {tableHeaders ? createTableHeader(tableHeaders) : null}
        </TableRow>
      </TableHead>
    );
  };
  const TableContent = () => {
    const mappedCell = tableData
      ? tableData.map((item) => (
          <TableRow key={item}>
            {item.map((i) => (
              <TableCell align="left" key={i}>
                {i ? i : i === 0 ? i : "-x-"}
              </TableCell>
            ))}
          </TableRow>
        ))
      : null;
    return <TableBody>{mappedCell}</TableBody>;
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHeader />
        <TableContent />
      </Table>
    </TableContainer>
  );
};
