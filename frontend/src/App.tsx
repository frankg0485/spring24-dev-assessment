import { useState, useEffect } from "react";
import VolunteerTable from "./components/VolunteerTable";
import { Volunteer } from "./ts/interfaces";
import { Button } from "@mui/material";
import "./styles/App.css";
import VolunteerActionModal from "./components/VolunteerActionModal";

function App() {
  const defaultVolunteer = {
    id: -1,
    name: "",
    avatar: "",
    hero_project: "",
    notes: "",
    email: "",
    phone: "",
    rating: 0,
    status: false,
  };

  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);
  const [volunteerActionModalOpen, setVolunteerActionModalOpen] = useState<boolean>(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(defaultVolunteer);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
      .then((response) => response.json())
      .then((data) => {
        setVolunteerData(data);
      });
  }, []);

  const onVolunteerFormClose = (submit: boolean = false) => {
    if (submit) {
      if (isEditing) { // edit existing volunteer
        const indexToUpdate = volunteerData.findIndex((volunteer) => volunteer.id === currentVolunteer.id);

        if (indexToUpdate !== -1) {
          volunteerData[indexToUpdate] = { ...currentVolunteer };
        }
      } else { // add a new volunteer
        volunteerData.push({
          ...currentVolunteer,
          id: volunteerData.length + 1,
        });
      }
      
    }
    setCurrentVolunteer(defaultVolunteer);
    setVolunteerActionModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.target;
    if (!id) id = "status";
    setCurrentVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const handleRatingChange = (e: React.SyntheticEvent<Element>, val: number | null) => {
    setCurrentVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      rating: val! * 2,
    }));
  };

  const onVolunteerEditClick = (id: number) => {
    // deep copy
    setCurrentVolunteer({
      ...volunteerData.filter((v) => v.id == id)[0],
    });
    setVolunteerActionModalOpen(true);
    setIsEditing(true);
  };

  const onVolunteerDeleteClick = (id: number) => {
    const indexToDelete = volunteerData.findIndex((volunteer) => volunteer.id === id);

    if (indexToDelete !== -1) {
      setVolunteerData((oldData) => oldData.filter((_, index) => index !== indexToDelete));
    }
  };

  const onAddVolunteerClick = () => {
    setIsEditing(false);
    setVolunteerActionModalOpen(true);
  };

  return (
    <div className="App">
      <Button onClick={onAddVolunteerClick}>Add Volunteer</Button>
      <VolunteerActionModal isEditing={isEditing} volunteer={currentVolunteer} onInputChange={handleFormChange} onRatingChange={handleRatingChange} open={volunteerActionModalOpen} handleClose={onVolunteerFormClose} />
      <VolunteerTable data={volunteerData} onDeleteClick={onVolunteerDeleteClick} onEditClick={onVolunteerEditClick} maxHeight="80vh" />
    </div>
  );
}

export default App;
