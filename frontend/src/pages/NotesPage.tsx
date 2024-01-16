import { useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Volunteer } from "../ts/interfaces";
import { IconButton } from "@mui/material";
import "../styles/NotesPage.css";
import { useNavigate } from "react-router-dom";
import { Keyboard } from "@mui/icons-material";

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
        <IconButton className="btn-action" style={{width: "auto"}} onClick={() => navigate("/")}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </div>
      <div className="notes">{volunteer.notes}</div>
      <div>
        {volunteer.name}'s notes have been clicked {volunteer.clicks} {volunteer.clicks > 1 ? "times" : "time"}.
      </div>
    </div>
  );
}

export default NotesPage;
