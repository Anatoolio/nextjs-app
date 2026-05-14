import type { Recipe, RecipeIngredient } from "@/generated/prisma/client";
import type { IIngredient } from "@/types/ingredient";

export interface IRecipe extends Recipe {
  ingredients: IRecipeIngredients[];
}

export interface IRecipeIngredients extends RecipeIngredient {
  ingredient: IIngredient;
}
