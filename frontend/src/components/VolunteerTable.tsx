import "../styles/VolunteerTable.css";
import { TableFooter, TablePagination, IconButton, Avatar, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Volunteer } from "../ts/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import { useState } from "react";

function VolunteerTable({ data, height, onEditClick, onDeleteClick, onNotesClick }:
  { data: Volunteer[];
    height: string;
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
    onNotesClick: (id: number) => void
  }) {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 10;
  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page);
  };

  return (
    <TableContainer component={Paper} sx={{ height: height }}>
      <Table stickyHeader={true} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" />
            <TableCell align="center">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Hero Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((volunteer, index) => (
            <TableRow key={volunteer.id} sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              backgroundColor: index % 2 == 0 ? "lightgray" : "white",
              }}>
              <TableCell>
                <IconButton onClick={() => onEditClick(volunteer.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteClick(volunteer.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onNotesClick(volunteer.id)}>
                  <NotesIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={{height: "100%", verticalAlign: "middle", textAlign: "center" }}>
                <Avatar src={volunteer.avatar} sx={{margin: "auto"}} />
                <div>{volunteer.name}</div>
              </TableCell>
              <TableCell align="right">{volunteer.phone}</TableCell>
              <TableCell align="right">{volunteer.email}</TableCell>
              <TableCell align="right">{volunteer.rating}</TableCell>
              <TableCell align="right">{volunteer.status ? "Active" : "Inactive"}</TableCell>
              <TableCell align="right">{volunteer.hero_project}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
          }}
        >
          <TablePagination rowsPerPage={rowsPerPage} count={data.length} page={page} onPageChange={handlePageChange} labelRowsPerPage={null} rowsPerPageOptions={[]} />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default VolunteerTable;
