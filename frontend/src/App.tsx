import { useState, useEffect } from 'react';
import VolunteerTable from './components/VolunteerTable';
import { Volunteer } from './ts/interfaces';
import { Button } from '@mui/material';
import './styles/App.css';
import NewVolunteerModal from './components/NewVolunteerModal';
import EditVolunteerModal from './components/EditVolunteerModal';

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
    const { id, value } = e.target;
    setCurrentVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const onVolunteerEditClick = (id: number) => {    
    // deep copy
    setCurrentVolunteer({
      ...volunteerData.filter((v) => v.id == id)[0]
    });
    setEditModalOpen(true);
  }

  return (
    <div className="App">
      <Button onClick={() => setNVModalOpen(true)}>Add Volunteer</Button>
      <NewVolunteerModal volunteer={currentVolunteer} onInputChange={handleFormChange} open={nvModalOpen} handleClose={onNVFormClose}/>
      <EditVolunteerModal volunteer={currentVolunteer} onInputChange={handleFormChange} open={editModalOpen} handleClose={onEditFormClose}/>
      <VolunteerTable data={volunteerData} onEditClick={onVolunteerEditClick} maxHeight="80vh"/>
    </div>
  );
}

export default App;
