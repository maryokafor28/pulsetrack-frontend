import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import Home from "@/app/Home";
import LoginPage from "@/app/auth/SignIn";
import SignupPage from "@/app/auth/SignUp";
import ProtectedRoute from "@/app/protectedRoute";
import UsersPage from "@/app/users/UsersPage";
import EditUserPage from "@/app/users/EditUserPage";
import DoctorsPage from "@/app/doctors/DoctorsPage";
import CreateDoctorPage from "@/app/doctors/CreateDoctorsPage";
import EditDoctorPage from "@/app/doctors/EditDoctorPage";
import AppointmentsPage from "@/app/appointments/AppointmentsPage";
import ActivitiesPage from "@/app/activities/ActivitiesPage";
import Layout from "@/components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* ✅ All protected pages inside Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard pages */}
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />

            {/* Doctor pages */}
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/create" element={<CreateDoctorPage />} />
            <Route path="/doctors/edit/:id" element={<EditDoctorPage />} />

            {/* Other protected features */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
