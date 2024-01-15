import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Volunteer } from "../ts/interfaces";
import { Button } from "@mui/material";
import "../styles/NotesPage.css";
import { useNavigate } from "react-router-dom";

function NotesPage() {
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState<Volunteer | undefined>(undefined);
  useEffect(() => {
    fetch(`http://localhost:8000/api/bog/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVolunteer(data);
      })
      .catch((error) => {
        console.error(error);
        console.error(`Couldn't fetch notes for id ${id}`);
      });
  }, []);

  const navigate = useNavigate();

  if (!volunteer?.notes) {
    return <div>error</div>;
  }

  return <div className="NotesPage">
    <div className="header">
      <div>
        Notes For
      </div>
      <div style={{flex: 1, paddingLeft: "5px", fontWeight: 600}}>
        {volunteer!.name}
      </div>
      <Button sx={{textTransform: "none"}} onClick={() => navigate("/")}>Back</Button>
    </div>
    <div className="notes">
      {volunteer!.notes}
    </div>
  </div>;
}

export default NotesPage;
