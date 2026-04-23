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
import { registerUser } from "../actions/register";
import { signInWithCredentials } from "../actions/sign-in";
import { useSession } from "next-auth/react";

type RegistrationFormProps = {
  onClose: () => void;
};

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { update } = useSession();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null); // Сброс ошибки перед новой попыткой регистрации

    try {
      const result = await registerUser(formData);
      if (!result) {
        setErrorMsg("Ошибка регистрации. Пожалуйста, проверьте свои данные.");
        return;
      }

      const signInResult = await signInWithCredentials({
        email: formData.email,
        password: formData.password,
      });
      if (!signInResult || signInResult.error) {
        setErrorMsg(
          "Аккаунт создан, но не удалось войти автоматически. Попробуйте войти вручную.",
        );
        return;
      }

      await update();
      onClose();
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMsg(
        "Произошла ошибка при попытке регистрации. Пожалуйста, попробуйте снова.",
      );
    }
  };

  return (
    <Form className="w-full space-y-4" onSubmit={handleSubmit}>
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
      <div className="flex w-full gap-15 mt-8">
        <Button type="button" className="flex-1" onPress={onClose}>
          Отмена
        </Button>
        <Button type="submit" className="flex-1">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
