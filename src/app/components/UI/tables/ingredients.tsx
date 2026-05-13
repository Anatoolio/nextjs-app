"use client";

import { useAuthStore } from "@/store/auth.store";
import { useIngredientsStore } from "@/store/ingredients.store";
import { Button, Table } from "@heroui/react";
import { getLabel } from "@/utils/helpers";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";

//TODO: Сделать набор ингридиентов уникальными для каждого пользователя

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientsStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    await removeIngredient(id);
  };

  return !isLoading && isAuth ? (
    <Table
      aria-label="Ingredients Table"
      className="mt-4 w-full [&_th]:text-black [&_td]:text-black"
    >
      <Table.Content>
        <Table.Header>
          <Table.Column isRowHeader>Название</Table.Column>
          <Table.Column>Категория</Table.Column>
          <Table.Column>Ед. изм.</Table.Column>
          <Table.Column>Цена за ед.</Table.Column>
          <Table.Column>Описание</Table.Column>
          <Table.Column>Действия</Table.Column>
        </Table.Header>
        <Table.Body>
          {ingredients.map((ingredient) => (
            <Table.Row key={ingredient.id}>
              <Table.Cell>{ingredient.name}</Table.Cell>
              <Table.Cell>
                {getLabel(ingredient.category, CATEGORY_OPTIONS)}
              </Table.Cell>
              <Table.Cell>{getLabel(ingredient.unit, UNIT_OPTIONS)}</Table.Cell>
              <Table.Cell>
                {ingredient.pricePerUnit !== null
                  ? `${ingredient.pricePerUnit} ₽`
                  : "—"}
              </Table.Cell>
              <Table.Cell>{ingredient.description || "—"}</Table.Cell>
              <Table.Cell>
                <Button
                  variant="danger-soft"
                  className="h-11 rounded-md"
                  onPress={() => handleDelete(ingredient.id)}
                >
                  Удалить
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table>
  ) : (
    <p className="mt-4 text-center text-gray-500">Загрузка ингредиентов...</p>
  );
};

export default IngredientsTable;
