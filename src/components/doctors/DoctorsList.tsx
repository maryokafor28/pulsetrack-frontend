import type { Doctor } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: Props) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <Card
          key={doctor._id}
          className="flex items-center bg-blue-50 rounded-2xl p-4 hover:shadow-lg transition"
        >
          <CardContent className="flex-1 ml-4">
            <h2 className="text-blue-700 font-semibold text-lg">
              {doctor.name}
            </h2>
            <p className="text-gray-600 text-sm">{doctor.specialization}</p>

            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Info
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/doctors/edit/${doctor._id}`)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
