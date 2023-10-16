import { TableBody, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";

function TableBodyCom({ data, editMode, tableKeys }) {
  return (
    <TableBody>
      {data && Array.isArray(data) && data.length && editMode
        ? data
            .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
            .map((row) => (
              <TableRow
                key={row.exam}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableKeys.map((it) => (
                  <TableCell component="th" scope="row" key={it}>
                    {row[it]}
                  </TableCell>
                ))}
              </TableRow>
            ))
        : (data || []).map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {tableKeys.map((it) => (
                <TableCell component="th" scope="row" key={it}>
                  {row[it]}
                </TableCell>
              ))}
            </TableRow>
          ))}
    </TableBody>
  );
}

export default TableBodyCom;
