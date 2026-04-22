"use client";

import { prisma } from "@/utils/prisma";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { registerUser } from "../actions/register";

type RegistrationFormProps = {
  onClose: () => void;
};

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const result = await registerUser(formData);

    console.log("Registration result:", result);

    onClose();
  };

  return (
    <Form
      className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface p-6"
      onSubmit={handleSubmit}
    >
      <TextField>
        <Label className="text-sm font-medium">Email</Label>
        <Input
          type="email"
          required
          minLength={3}
          className="rounded-full border-border/60"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <FieldError className="text-xs" />
      </TextField>

      <TextField>
        <Label className="text-sm font-medium">Password</Label>
        <Input
          type="password"
          required
          minLength={6}
          className="rounded-full border-border/60"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <FieldError className="text-xs" />
      </TextField>
      <TextField>
        <Label className="text-sm font-medium">Confirm Password</Label>
        <Input
          type="password"
          required
          className="rounded-full border-border/60"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <FieldError className="text-xs" />
      </TextField>
      <Button type="button" className="w-full" onPress={onClose}>
        Отмена
      </Button>
      <Button type="submit" className="w-full">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegistrationForm;
