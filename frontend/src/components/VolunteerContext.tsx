import { SetStateAction, createContext, useContext, useState } from "react";
import { Volunteer } from "../ts/interfaces";
import { useEffect } from "react";

interface VolunteerContextProps {
  volunteerData: Volunteer[];
  addNewVolunteer: (newVolunteer: Volunteer) => void;
  editVolunteer: (volunteer: Volunteer) => void;
  deleteVolunteer: (id: number) => void;
}

const VolunteerContext = createContext<VolunteerContextProps | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);
  const [lastUsedKey, setLastUsedKey] = useState<number>(0);

  const updateVolunteerData = (newData: Volunteer[]) => {
    setVolunteerData(newData);
  };

  const retrieveVolunteers = async () => {
    return fetch("http://localhost:8000/api/bog/users")
      .then((response) => response.json())
      .then((data: Volunteer[]) => data);
  };

  const addNewVolunteer = (newVolunteer: Volunteer) => {
    const key = lastUsedKey + 1;
    setLastUsedKey(key);

    fetch("http://localhost:8000/api/bog/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newVolunteer,
        id: key
      }),
    }).then(() => {
      retrieveVolunteers().then((data) => updateVolunteerData(data));
    });
  };

  const editVolunteer = (volunteer: Volunteer) => {
    fetch(`http://localhost:8000/api/bog/users/${volunteer.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(volunteer),
    }).then(() => {
      retrieveVolunteers().then((data) => updateVolunteerData(data));
    });
  };

  const deleteVolunteer = (id: number) => {
    fetch(`http://localhost:8000/api/bog/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      retrieveVolunteers().then((data) => updateVolunteerData(data));
    });
  }

  useEffect(() => {
    retrieveVolunteers().then((data) => {
      const dataWithClicks = data.map((entry: Volunteer) => ({ ...entry, clicks: 0 }));
      setVolunteerData(dataWithClicks);
      setLastUsedKey(dataWithClicks.length);
    });
  }, []);

  return <VolunteerContext.Provider value={{ volunteerData, addNewVolunteer, editVolunteer, deleteVolunteer }}>{children}</VolunteerContext.Provider>;
};

export const useVolunteerContext = () => useContext(VolunteerContext);
