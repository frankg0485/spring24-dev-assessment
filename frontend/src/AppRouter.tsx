import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteersPage from "./pages/VolunteersPage";
import NotesPage from "./pages/NotesPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VolunteersPage />} />
        <Route path="/notes/:id" element={<NotesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;