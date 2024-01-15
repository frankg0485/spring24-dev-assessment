import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Volunteer } from "../ts/interfaces";
import { Button } from "@mui/material";
import "../styles/NotesPage.css";
import { useNavigate } from "react-router-dom";

function NotesPage() {
  const loc = useLocation();
  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/bog/users/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setVolunteer(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       console.error(`Couldn't fetch notes for id ${id}`);
  //     });
  // }, []);

  const navigate = useNavigate();

  if (!loc.state.volunteer) {
    return <div>error</div>;
  }

  const volunteer: Volunteer = loc.state.volunteer;

  return (
    <div className="NotesPage">
      <div className="header">
        <div>
          <span>Notes For&nbsp;</span>
          <span style={{ fontWeight: 600 }}>{volunteer.name}</span>
        </div>
        <Button sx={{ textTransform: "none" }} onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
      <div className="notes">{volunteer.notes}</div>
      <div>
        {volunteer.name}'s notes have been clicked {volunteer.clicks} {volunteer.clicks > 1 ? "times" : "time"}.
      </div>
    </div>
  );
}

export default NotesPage;
