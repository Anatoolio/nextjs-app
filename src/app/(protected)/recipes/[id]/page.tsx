"use client";

import { RecipeForm } from "@/app/forms/recipe.form";
import { useRecipeStore } from "@/store/recipe.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error, loadRecipes } = useRecipeStore();

  useEffect(() => {
    if (recipes.length === 0) {
      loadRecipes();
    }
  }, [recipes.length, loadRecipes]);

  const recipe = recipes.find((r) => r.id === id) ?? null;
  const hasSearched = recipes.length > 0 || !!error;

  if (isLoading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (hasSearched && !recipe) {
    return <p className="text-red-500 text-center">Рецепт не найден</p>;
  }

  if (!recipe) return <p className="text-center">Загрузка...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Редактировать рецепт: {recipe.name}
      </h1>
      <RecipeForm initialRecipe={recipe} />
    </div>
  );
};

export default EditRecipePage;
