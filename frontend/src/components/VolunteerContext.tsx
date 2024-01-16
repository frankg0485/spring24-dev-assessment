import { SetStateAction, createContext, useContext, useState } from "react";
import { Volunteer } from "../ts/interfaces";
import { useEffect } from "react";

interface VolunteerContextProps {
  volunteerData: Volunteer[];
  updateVolunteerData: (data: Volunteer[]) => void;
  addNewVolunteer: (newVolunteer: Volunteer) => void;
}

const VolunteerContext = createContext<VolunteerContextProps | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [volunteerData, setVolunteerData] = useState<Volunteer[]>([]);
  const [lastUsedKey, setLastUsedKey] = useState<number>(0);

  const updateVolunteerData = (newData: Volunteer[]) => {
    setVolunteerData(newData);
  };

  const addNewVolunteer = (newVolunteer: Volunteer) => {
    const key = lastUsedKey + 1;
    setLastUsedKey(key);

    const newData = [...volunteerData, { ...newVolunteer, id: key }];
    updateVolunteerData(newData);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/bog/users")
      .then((response) => response.json())
      .then((data) => {
        const dataWithClicks = data.map((entry: Volunteer) => ({ ...entry, clicks: 0 }));
        setVolunteerData(dataWithClicks);
        setLastUsedKey(dataWithClicks.length);
      });
  }, []);

  return <VolunteerContext.Provider value={{ volunteerData, updateVolunteerData, addNewVolunteer }}>{children}</VolunteerContext.Provider>;
};

export const useVolunteerContext = () => useContext(VolunteerContext);
