import '../styles/VolunteerTable.css';
import { useEffect } from 'react';

function VolunteerTable() {
  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
  }, []);

  return (
    <div className="App">
      <p>Testing!</p>
    </div>
  );
}

export default VolunteerTable;
