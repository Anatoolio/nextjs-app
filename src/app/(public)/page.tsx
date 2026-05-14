"use client";

import RecipeCard from "@/app/components/common/recipe-card";
import { useRecipeStore } from "@/store/recipe.store";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { recipes, isLoading, error, loadRecipes } = useRecipeStore();

  useEffect(() => {
    if (recipes.length === 0) {
      loadRecipes();
    }
  }, [recipes.length, loadRecipes]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex w-full justify-center items-center mb-4">
        <Link href="/recipes/new">
          <Button variant="primary" className="h-11 rounded-md">
            Добавить рецепт
          </Button>
        </Link>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {isLoading && (
        <div className="flex justify-center">
          <Spinner size="md" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
