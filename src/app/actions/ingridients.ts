"use server";

import { prisma } from "@/utils/prisma";
import { ingredientSchema } from "@/schema/zod";
import { ZodError } from "zod";

export async function createIngredient(formData: FormData) {
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
        errors: error.issues.map((err) => err.message).join(", "),
      };
    }
    console.error("Error creating ingredient:", error);
    throw error;
  }
}
