import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteersPage from "./pages/VolunteersPage";
import NotesPage from "./pages/NotesPage";
import { VolunteerProvider } from "./components/VolunteerContext";

const AppRouter = () => {
  return (
    <Router>
      <VolunteerProvider>
        <Routes>
          <Route path="/" element={<VolunteersPage />} />
          <Route path="/notes/:id" element={<NotesPage />} />
        </Routes>
      </VolunteerProvider>
    </Router>
  );
};

export default AppRouter;
