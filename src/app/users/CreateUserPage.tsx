import { useNavigate } from "react-router-dom";
import { useUsers } from "@/hooks/useUsers";
import UserForm from "@/components/users/UserForm";
import type { User } from "@/lib/types";

export default function CreateUserPage() {
  const { createUser, loading, error } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<User>) => {
    try {
      await createUser(data);
      navigate("/users");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <UserForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
