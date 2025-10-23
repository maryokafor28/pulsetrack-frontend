import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/app/Home";
import UsersPage from "@/app/users/UsersPage";
import CreateUserPage from "@/app/users/CreateUserPage";
import EditUserPage from "@/app/users/EditUserPage";
import DoctorsPage from "@/app/doctors/DoctorsPage";
import AppointmentsPage from "@/app/appointments/AppointmentsPage";
import ActivitiesPage from "@/app/activities/ActivitiesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/create" element={<CreateUserPage />} />
        <Route path="/users/edit/:id" element={<EditUserPage />} />

        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
