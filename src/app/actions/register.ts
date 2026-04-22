"use server";

import { prisma } from "@/utils/prisma";
import { RegistrationFormData } from "../types/form-data";
import { saltAndHashPassword } from "@/utils/password";

export async function registerUser(formData: RegistrationFormData) {
  const { email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const pwrdHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwrdHash,
      },
    });
    return { id: user.id, email: user.email };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}

//TODO: добавить валидацию данных, например, проверку на совпадение паролей и уникальность email. Также не забыть про хеширование пароля перед сохранением в базу данных!
