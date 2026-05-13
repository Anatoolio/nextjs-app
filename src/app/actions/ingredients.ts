"use server";

import { prisma } from "@/utils/prisma";
import { ingredientSchema } from "@/schema/zod";
import { ZodError } from "zod";
import type { Ingredient } from "@/generated/prisma/client";

type CreateIngredientResult =
  | { success: true; ingredient: Ingredient }
  | { success: false; error: string };

type GetIngredientsResult =
  | { success: true; ingredients: Ingredient[] }
  | { success: false; error: string };

type DeleteIngredientResult =
  | { success: true; ingredient: Ingredient }
  | { success: false; error: string };

export async function createIngredient(
  formData: FormData,
): Promise<CreateIngredientResult> {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: formData.get("description") as string,
    };

    const validatedData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: validatedData,
    });
    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues.map((err) => err.message).join(", "),
      };
    }
    return { success: false, error: "Error creating ingredient" };
  }
}

export async function getIngredients(): Promise<GetIngredientsResult> {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return { success: true, ingredients };
  } catch {
    return { success: false, error: "Error fetching ingredients" };
  }
}

export async function deleteIngredient(
  id: string,
): Promise<DeleteIngredientResult> {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    });
    return { success: true, ingredient };
  } catch {
    return { success: false, error: "Error deleting ingredient" };
  }
}
