import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import type { User } from "@/lib/types";

interface UserFormProps {
  onSubmit: (data: Partial<User>) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  initialData?: Partial<User>;
  error?: string | null;
  isEditing?: boolean;
}

export default function UserForm({
  onSubmit,
  onCancel,
  loading = false,
  initialData = {},
  isEditing = false,
  error = null,
}: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "height" || name === "weight"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-primary">
        {isEditing ? "Edit User" : "Create User"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink:0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Age</label>
          <Input
            name="age"
            type="number"
            value={formData.age || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Height (cm)</label>
          <Input
            name="height"
            type="number"
            value={formData.height || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Weight (kg)</label>
          <Input
            name="weight"
            type="number"
            value={formData.weight || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-3">
        {isEditing && onCancel && (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className={isEditing ? "flex-1" : "w-full"}
          disabled={loading}
        >
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </form>
  );
}
