import { useState, useEffect } from 'react';
import VolunteerTable from './components/VolunteerTable';
import { Volunteer } from './ts/interfaces';
import { Button } from '@mui/material';
import './styles/App.css';
import NewVolunteerModal from './components/NewVolunteerModal';
import EditVolunteerModal from './components/EditVolunteerModal';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

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
    status: false
  };

  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);
  const [nvModalOpen, setNVModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(defaultVolunteer);

  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
    .then((response) => response.json())
    .then((data) => {
      setVolunteerData(data);
    })
  }, []);

  const onNVFormClose = (submit: boolean = false) => {
    if (submit) {
      volunteerData.push({
        ...currentVolunteer,
        id: volunteerData.length + 1
      })
    };
    setCurrentVolunteer(defaultVolunteer);
    setNVModalOpen(false);
  }

  const onEditFormClose = (submit: boolean = false) => {
    if (submit) {
      const indexToUpdate = volunteerData.findIndex((volunteer) => volunteer.id === currentVolunteer.id);

      if (indexToUpdate !== -1) {
        volunteerData[indexToUpdate] = { ...currentVolunteer };
      }
    }

    setCurrentVolunteer(defaultVolunteer);
    setEditModalOpen(false);
  }

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
      rating: val! * 2
    }));
  }

  const onVolunteerEditClick = (id: number) => {    
    // deep copy
    setCurrentVolunteer({
      ...volunteerData.filter((v) => v.id == id)[0]
    });
    setEditModalOpen(true);
  }

  const onVolunteerDeleteClick = (id: number) => {
      const indexToDelete = volunteerData.findIndex((volunteer) => volunteer.id === id);

      if (indexToDelete !== -1) {
        setVolunteerData((oldData) => oldData.filter((_, index) => index !== indexToDelete));
      }
  }

  return (
    <div className="App">
      <Button onClick={() => setNVModalOpen(true)}>Add Volunteer</Button>
      <NewVolunteerModal volunteer={currentVolunteer} onInputChange={handleFormChange} onRatingChange={handleRatingChange} open={nvModalOpen} handleClose={onNVFormClose}/>
      <EditVolunteerModal volunteer={currentVolunteer} onInputChange={handleFormChange} open={editModalOpen} handleClose={onEditFormClose}/>
      <VolunteerTable data={volunteerData} onDeleteClick={onVolunteerDeleteClick} onEditClick={onVolunteerEditClick} maxHeight="80vh"/>
    </div>
  );
}

export default App;
