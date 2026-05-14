"use client";

import { useState, useTransition } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  Spinner,
  TextField,
  toast,
} from "@heroui/react";
import { useIngredientsStore } from "@/store/ingredients.store";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { useRouter } from "next/navigation";

interface RecipeFormProps {
  initialRecipe?: IRecipe;
}

interface IIngredientField {
  id: number;
  ingredientId: string;
  quantity: number | null;
}

export const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
  const [formData, setFormData] = useState({
    name: initialRecipe?.name ?? "",
    description: initialRecipe?.description ?? "",
    imageUrl: initialRecipe?.imageUrl ?? "",
  });

  const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
    initialRecipe?.ingredients
      ? initialRecipe.ingredients.map((ing, index) => ({
          id: index,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
        }))
      : [{ id: 0, ingredientId: "", quantity: null }],
  );

  const { ingredients } = useIngredientsStore();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddIngredientField = () => {
    if (ingredientFields.length < 10) {
      setIngredientFields((prev) => [
        ...prev,
        { id: Date.now(), ingredientId: "", quantity: null },
      ]);
    }
  };

  const handleRemoveIngredientField = (id: number) => {
    if (ingredientFields.length > 1) {
      setIngredientFields((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleIngredientChange = (
    id: number,
    field: "ingredientId" | "quantity",
    value: string | number | null,
  ) => {
    setIngredientFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, formData)
        : await addRecipe(formData);

      if (!result.success) {
        toast.danger(result.error || "Ошибка при сохранении рецепта", {
          timeout: 4000,
        });
        return;
      }

      toast.success(initialRecipe ? "Рецепт обновлён" : "Рецепт создан", {
        timeout: 3000,
      });
      router.push("/");
    });
  };

  return (
    <Form className="w-full flex flex-col gap-3" action={handleSubmit}>
      <TextField
        name="name"
        isRequired
        validate={(value) => (!value ? "Название обязательно" : null)}
        className="w-full"
      >
        <Label className="sr-only">Название</Label>
        <Input
          type="text"
          placeholder="Введите название рецепта"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-default-100 text-sm focus:outline-none h-11 rounded-md"
        />
        <FieldError />
      </TextField>

      <TextField name="description" className="w-full">
        <Label className="sr-only">Описание</Label>
        <Input
          type="text"
          placeholder="Введите описание (необязательно)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-default-100 text-sm focus:outline-none h-11 rounded-md"
        />
      </TextField>

      <TextField name="imageUrl" className="w-full">
        <Label className="sr-only">URL изображения</Label>
        <Input
          type="url"
          placeholder="URL изображения (необязательно)"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="bg-default-100 text-sm focus:outline-none h-11 rounded-md"
        />
      </TextField>

      <div className="flex flex-col gap-2 w-full">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 w-full">
            <div className="flex-1">
              <Select
                name={`ingredient_${index}`}
                isRequired
                placeholder="Выберите ингредиент"
                value={field.ingredientId || null}
                onChange={(key) =>
                  handleIngredientChange(
                    field.id,
                    "ingredientId",
                    String(key ?? ""),
                  )
                }
                className="w-full"
              >
                <Label className="sr-only">Ингредиент</Label>
                <Select.Trigger className="bg-default-100 text-sm h-11 rounded-md">
                  <Select.Value className="truncate" />
                  <Select.Indicator className="text-black" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {ingredients.map((ingredient) => (
                      <ListBoxItem
                        key={ingredient.id}
                        id={ingredient.id}
                        className="text-black"
                      >
                        {ingredient.name}
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="w-30">
              <TextField
                name={`quantity_${index}`}
                isRequired
                validate={(value) => {
                  if (!value) return "Обязательно";
                  const num = parseFloat(value);
                  if (isNaN(num) || num <= 0) return "> 0";
                  return null;
                }}
              >
                <Label className="sr-only">Количество</Label>
                <Input
                  type="number"
                  placeholder="Кол-во"
                  value={
                    field.quantity !== null ? field.quantity.toString() : ""
                  }
                  onChange={(e) =>
                    handleIngredientChange(
                      field.id,
                      "quantity",
                      e.target.value ? parseFloat(e.target.value) : null,
                    )
                  }
                  className="bg-default-100 text-sm focus:outline-none h-11 rounded-md w-full"
                />
                <FieldError />
              </TextField>
            </div>

            {ingredientFields.length > 1 && (
              <Button
                type="button"
                variant="danger-soft"
                onPress={() => handleRemoveIngredientField(field.id)}
                className="h-11 rounded-md"
              >
                −
              </Button>
            )}
          </div>
        ))}

        {ingredientFields.length < 10 && (
          <Button
            type="button"
            variant="outline"
            onPress={handleAddIngredientField}
            className="h-11 rounded-md"
          >
            + Добавить ингредиент
          </Button>
        )}
      </div>

      <div className="flex w-full items-center justify-end">
        <Button
          variant="primary"
          type="submit"
          isDisabled={pending}
          className="flex items-center gap-2 h-11 rounded-md"
        >
          {pending ? (
            <Spinner size="sm" />
          ) : initialRecipe ? (
            "Сохранить изменения"
          ) : (
            "Добавить рецепт"
          )}
        </Button>
      </div>
    </Form>
  );
};
