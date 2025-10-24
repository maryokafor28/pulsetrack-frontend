import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DoctorsList from "@/components/doctors/DoctorsList";
import { useDoctors } from "@/hooks/useDoctor";

export default function DoctorsPage() {
  const { doctors, fetchDoctors, loading, error } = useDoctors();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Doctors</h1>
        <Button onClick={() => navigate("/doctors/create")}>Add Doctor</Button>
      </div>

      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <>
          <p className="text-gray-500 text-center mt-10">
            No doctors found. Click "Add Doctor" to create one.
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </>
      ) : (
        <DoctorsList doctors={doctors} />
      )}
    </div>
  );
}
