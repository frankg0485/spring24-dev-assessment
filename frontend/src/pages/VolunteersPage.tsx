import { useState, useEffect } from "react";
import VolunteerTable from "../components/VolunteerTable";
import { Volunteer } from "../ts/interfaces";
import { Button, Box } from "@mui/material";
import "../styles/VolunteersPage.css";
import VolunteerActionModal from "../components/VolunteerActionModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";
import { useVolunteerContext } from "../components/VolunteerContext";

function VolunteersPage() {
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
    clicks: 0
  };

  const { volunteerData, addNewVolunteer, editVolunteer, deleteVolunteer } = useVolunteerContext()!;
  const [volunteerActionModalOpen, setVolunteerActionModalOpen] = useState<boolean>(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState<boolean>(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(defaultVolunteer);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onVolunteerFormClose = (submit: boolean = false) => {
    if (submit) {
      if (isEditing) {
        // edit existing volunteer
        editVolunteer(currentVolunteer);
      } else {
        // add a new volunteer
        addNewVolunteer(currentVolunteer);
      }
    }
    setCurrentVolunteer(defaultVolunteer);
    setVolunteerActionModalOpen(false);
  };

  const onDeleteFormClose = (confirm: boolean) => {
    if (confirm) {
      console.log("deleteing volunteer with id", currentVolunteer.id);
      deleteVolunteer(currentVolunteer.id);
    }

    setCurrentVolunteer(defaultVolunteer);
    setDeleteConfirmModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = e.target.id;
    let value: any;
    if (!id) {
      id = "status";
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setCurrentVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const handleRatingChange = (e: React.SyntheticEvent<Element>, val: number | null) => {
    setCurrentVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      rating: val ?? 0,
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
    setDeleteConfirmModalOpen(true);
    setCurrentVolunteer(volunteerData.filter((volunteer) => volunteer.id == id)[0]);
  };

  const navigate = useNavigate();
  const onNotesClick = (id: number) => {
    const target = volunteerData.filter((volunteer) => volunteer.id == id)[0];
    target.clicks++;
    navigate(`/notes/${id}`, {
      state: {
        volunteer: target
      }
    });
  };

  const onAddVolunteerClick = () => {
    setIsEditing(false);
    setVolunteerActionModalOpen(true);
  };

  return (
    <div className="VolunteersPage">
      <div className="header">
        <Box className="title">HaHa Heroes VMS</Box>
        <Button className="add-button" onClick={onAddVolunteerClick}>
          Add Volunteer
        </Button>
      </div>
      <br />
      <VolunteerActionModal isEditing={isEditing} volunteer={currentVolunteer} onInputChange={handleFormChange} onRatingChange={handleRatingChange} open={volunteerActionModalOpen} handleClose={onVolunteerFormClose} />
      <DeleteConfirmModal volunteer={currentVolunteer} open={deleteConfirmModalOpen} handleClose={onDeleteFormClose} />
      <VolunteerTable onNotesClick={onNotesClick} data={volunteerData} onDeleteClick={onVolunteerDeleteClick} onEditClick={onVolunteerEditClick} height="70vh" />
    </div>
  );
}

export default VolunteersPage;
