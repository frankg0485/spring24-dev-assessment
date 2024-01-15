import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VolunteersPage from "./pages/VolunteersPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VolunteersPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;