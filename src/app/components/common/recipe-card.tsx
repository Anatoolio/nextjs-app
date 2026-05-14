"use client";

import { IRecipe } from "@/types/recipe";
import { Button, Card, Spinner } from "@heroui/react";
import { useRecipeStore } from "@/store/recipe.store";
import Link from "next/link";
import { useTransition } from "react";
import Image from "next/image";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore();
  const { isAuth } = useAuthStore();
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.error("Ошибка при удалении рецепта:", error);
      }
    });
  };

  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(
      (option) => option.value === unit,
    );
    return unitOption ? unitOption.label : unit.toLowerCase();
  };

  return (
    <Card className="w-full min-w-[254px] max-w-md h-[480px] flex flex-col">
      <div className="h-48 overflow-hidden">
        {recipe.imageUrl ? (
          <div className="relative h-48 group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Image
              src={recipe.imageUrl}
              alt="Image for recipe"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Нет изображения</span>
          </div>
        )}
      </div>

      <Card.Header className="flex justify-between items-center text-black">
        <Card.Title className="text-xl font-bold">{recipe.name}</Card.Title>
      </Card.Header>

      <Card.Content className="flex-1 text-black">
        <p className="text-gray-600 line-clamp-6">
          {recipe.description || "Без описания"}
        </p>
        <h3 className="mt-4 font-semibold">Ингредиенты:</h3>
        <ul className="list-disc pl-5 overflow-y-auto max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit)}
            </li>
          ))}
        </ul>
      </Card.Content>

      {isAuth && (
        <Card.Footer className="flex justify-end gap-2 p-4">
          <Link href={`/recipes/${recipe.id}`}>
            <Button variant="outline" className="h-11 rounded-md">
              Редактировать
            </Button>
          </Link>
          <Button
            variant="danger-soft"
            onPress={handleDelete}
            isDisabled={pending}
            className="h-11 rounded-md flex items-center gap-2"
          >
            {pending ? <Spinner size="sm" /> : "Удалить"}
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default RecipeCard;
