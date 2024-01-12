import '../styles/VolunteerTable.css';
import { IconButton, Avatar, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Volunteer } from '../ts/interfaces';
import EditIcon from '@mui/icons-material/Edit';

function VolunteerTable({ data, maxHeight, onEditClick }: { data: Volunteer[], maxHeight: string, onEditClick: (id: number) => void }) {
  return (
    <TableContainer component={Paper} sx={{maxHeight: maxHeight}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"/>
            <TableCell align="center">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Hero Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((volunteer) => (
            <TableRow
              key={volunteer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <IconButton onClick={() => onEditClick(volunteer.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Avatar src={volunteer.avatar}/>
                  {volunteer.name}
              </TableCell>
              <TableCell align="right">{volunteer.phone}</TableCell>
              <TableCell align="right">{volunteer.email}</TableCell>
              <TableCell align="right">{volunteer.rating}</TableCell>
              <TableCell align="right">{volunteer.status ? "Active" : "Inactive"}</TableCell>
              <TableCell align="right">{volunteer.hero_project}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VolunteerTable;
