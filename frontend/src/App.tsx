import { useState, useEffect } from 'react';
import VolunteerTable from './components/VolunteerTable';
import { Volunteer } from './ts/interfaces';
import './styles/App.css';

function App() {
  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
    .then((response) => response.json())
    .then((data) => {
      setVolunteerData(data);
    })
  }, []);
  return (
    <div className="App">
      <VolunteerTable data={volunteerData}/>
    </div>
  );
}

export default App;
