import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { DownloadTableExcel } from "react-export-table-to-excel";
import FilterListIcon from "@mui/icons-material/FilterList";
import { StyledTableCell } from "../../styles/table";
import { btn } from "../../styles/buttonS";
import TableBodyCom from "./TableBodyCom";

function StudentsNotes({ title, tbct, data, notes, tableKeys }) {
  const [editMode, setEditMode] = useState(false);
  const [dt, setDt] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    if (data && data.length) {
      setDt(data);
    }
  }, [data]);
  const handleEditMode = () => {
    setEditMode(!editMode);
    dt.sort((a, b) => parseFloat(b.note) - parseFloat(a.note));
  };
  return (
    <>
      <Typography variant="h5" mb={1}>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              {tbct.map((it) => (
                <StyledTableCell>{it}</StyledTableCell>
              ))}
              <StyledTableCell>
                <Button
                  sx={{
                    padding: 0,
                    minWidth: "fit-content",
                    marginRight: "10px",
                  }}
                  color="inherit"
                  onClick={handleEditMode}
                >
                  <FilterListIcon sx={{ padding: 0, margin: 0 }} />
                </Button>{" "}
                {notes}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBodyCom data={dt} editMode={editMode} tableKeys={tableKeys} />
        </Table>
      </TableContainer>
      <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <Button variant="contained" sx={{ ...btn }}>
          {" "}
          download excel{" "}
        </Button>
      </DownloadTableExcel>
    </>
  );
}

export default StudentsNotes;
