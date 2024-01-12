import '../styles/VolunteerTable.css';
import { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface Volunteer {
  id: number;
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: boolean;
}

function VolunteerTable() {
  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
    .then((response) => response.json())
    .then((data) => {
      setVolunteerData(data);
    })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Avatar</TableCell>
            <TableCell align="right">Hero Project</TableCell>
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteerData.map((volunteer) => (
            <TableRow
              key={volunteer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {volunteer.name}
              </TableCell>
              <TableCell align="right">{volunteer.avatar}</TableCell>
              <TableCell align="right">{volunteer.hero_project}</TableCell>
              <TableCell align="right">{volunteer.notes}</TableCell>
              <TableCell align="right">{volunteer.email}</TableCell>
              <TableCell align="right">{volunteer.phone}</TableCell>
              <TableCell align="right">{volunteer.rating}</TableCell>
              <TableCell align="right">{volunteer.status ? "Active" : "Inactive"}</TableCell>
              <TableCell align="right">{volunteer.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VolunteerTable;
