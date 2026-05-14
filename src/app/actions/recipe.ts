"use server";

import { prisma } from "@/utils/prisma";
import { IRecipe } from "@/types/recipe";

type GetRecipesResult =
  | { success: true; recipes: IRecipe[] }
  | { success: false; error: string };

type CreateRecipeResult =
  | { success: true; recipe: IRecipe }
  | { success: false; error: string };

export async function getRecipes(): Promise<GetRecipesResult> {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, recipes };
  } catch {
    return { success: false, error: "Error fetching recipes" };
  }
}

export async function createRecipe(
  formData: FormData,
): Promise<CreateRecipeResult> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_"))
      .map(([key, value]) => ({
        ingredientId: String(value),
        quantity: Number(formData.get(`quantity_${key.split("_")[1]}`)),
      }));

    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Name and at least one ingredient are required",
      };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipe };
  } catch (error) {
    return { success: false, error: "Error creating recipe" };
  }
}

export async function updateRecipe(
  id: string,
  formData: FormData,
): Promise<CreateRecipeResult> {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_"))
      .map(([key, value]) => ({
        ingredientId: String(value),
        quantity: Number(formData.get(`quantity_${key.split("_")[1]}`)),
      }));

    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Name and at least one ingredient are required",
      };
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipe };
  } catch (error) {
    return { success: false, error: "Error updating recipe" };
  }
}

export async function deleteRecipe(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id },
    });

    await prisma.recipe.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error deleting recipe" };
  }
}
