"use client";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { signInWithCredentials } from "../actions/sign-in";

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signInWithCredentials(formData);

    console.log("result", result);

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

      <Button type="button" className="w-full" onPress={onClose}>
        Отмена
      </Button>
      <Button type="submit" className="w-full">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
