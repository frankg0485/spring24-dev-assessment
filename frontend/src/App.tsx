import { useState, useEffect } from 'react';
import VolunteerTable from './components/VolunteerTable';
import { Volunteer } from './ts/interfaces';
import { Button } from '@mui/material';
import './styles/App.css';
import NewVolunteerModal from './components/NewVolunteerModal';

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
  const [newVolunteer, setNewVolunteer] = useState<Volunteer>(defaultVolunteer);
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
        ...newVolunteer,
        id: volunteerData.length + 1
      })
    };
    setNewVolunteer(defaultVolunteer);
    setNVModalOpen(false);
  }

  const handleNVFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  return (
    <div className="App">
      <Button onClick={() => setNVModalOpen(true)}>Add Volunteer</Button>
      <NewVolunteerModal volunteer={newVolunteer} onInputChange={handleNVFormChange} open={nvModalOpen} handleClose={onNVFormClose}/>
      <VolunteerTable data={volunteerData} maxHeight="80vh"/>
    </div>
  );
}

export default App;
