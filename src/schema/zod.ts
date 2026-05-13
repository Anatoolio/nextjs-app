import { object, string, email, enum as zEnum, number } from "zod";

export const signInSchema = object({
  email: email("Invalid email").min(1, "Email is required"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "Название обязательно"),
  category: zEnum(["VEGETABLE", "FRUIT", "MEAT", "DAIRY", "SPICES", "OTHER"]),
  unit: zEnum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  pricePerUnit: number({ error: "Цена должна быть числом" })
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: string().optional(),
});
