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
import { useSession } from "next-auth/react";

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { update } = useSession();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null); // Сброс ошибки перед новой попыткой входа

    try {
      const result = await signInWithCredentials(formData);

      if (!result || result.error) {
        setErrorMsg("Ошибка входа. Пожалуйста, проверьте свои учетные данные.");
        return;
      }
      await update(); // Обновляем сессию после успешного входа
      onClose();
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMsg(
        "Произошла ошибка при попытке входа. Пожалуйста, попробуйте снова.",
      );
    }
  };

  return (
    <Form
      className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface p-6"
      onSubmit={handleSubmit}
    >
      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
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
