"use client";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  ListBoxItem,
  Button,
  Spinner,
  toast,
} from "@heroui/react";
import { useState, useTransition } from "react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientsStore } from "@/store/ingredients.store";

const InitialState = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};

const IngredientForm = () => {
  const [formData, setFormData] = useState(InitialState);
  const [pending, startTransition] = useTransition();
  const { addIngredient } = useIngredientsStore();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addIngredient(formData);
      if (!result.success) {
        toast.danger(result.error, { timeout: 4000 });
        return;
      }
      setFormData(InitialState);
      toast.success("Ингредиент создан", { timeout: 3000 });
    });
  };

  return (
    <Form className="w-full flex flex-col gap-3" action={handleSubmit}>
      <TextField
        name="name"
        isRequired
        validate={(value) => {
          if (!value) return "Название обязательно";
          return null;
        }}
      >
        <Label className="sr-only">Название</Label>
        <Input
          type="text"
          placeholder="Введите название ингредиента"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-default-100 text-sm focus:outline-none h-11 rounded-md"
        />
        <FieldError />
      </TextField>
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            name="category"
            isRequired
            placeholder="Категория"
            value={formData.category || null}
            onChange={(key) =>
              setFormData({ ...formData, category: String(key ?? "") })
            }
            className="w-full"
          >
            <Label className="sr-only">Категория</Label>
            <Select.Trigger className="bg-default-100 text-sm h-11 rounded-md">
              <Select.Value className="truncate" />
              <Select.Indicator className="text-black" />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {CATEGORY_OPTIONS.map((option) => (
                  <ListBoxItem
                    key={option.value}
                    id={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            name="unit"
            isRequired
            placeholder="Ед. изм."
            value={formData.unit || null}
            onChange={(key) =>
              setFormData({ ...formData, unit: String(key ?? "") })
            }
            className="w-full"
          >
            <Label className="sr-only">Ед. изм.</Label>
            <Select.Trigger className="bg-default-100 text-sm h-11 rounded-md">
              <Select.Value className="truncate" />
              <Select.Indicator className="text-black" />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {UNIT_OPTIONS.map((option) => (
                  <ListBoxItem
                    key={option.value}
                    id={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
        <div className="w-1/3">
          <TextField
            name="pricePerUnit"
            isRequired
            validate={(value) => {
              if (!value) return "Цена обязательна";
              const num = parseFloat(value);
              if (isNaN(num) || num < 0)
                return "Цена должна быть положительной";
              return null;
            }}
          >
            <Label className="sr-only">Цена</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Цена"
                value={
                  formData.pricePerUnit !== null
                    ? formData.pricePerUnit.toString()
                    : ""
                }
                onChange={(e) => {
                  const value = e.target.value
                    ? parseFloat(e.target.value)
                    : null;
                  setFormData({ ...formData, pricePerUnit: value });
                }}
                className="bg-default-100 text-sm focus:outline-none pr-8 w-full h-11 rounded-md"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                ₽
              </span>
            </div>
            <FieldError />
          </TextField>
        </div>
      </div>
      <TextField name="description" className="w-full">
        <Label className="sr-only">Описание</Label>
        <Input
          type="text"
          placeholder="Введите описание (необязательно)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-default-100 text-sm focus:outline-none w-full h-11 rounded-md"
        />
      </TextField>

      <div className="flex w-full items-center justify-end">
        <Button
          variant="primary"
          type="submit"
          isDisabled={pending}
          className="flex items-center gap-2 h-11 rounded-md"
        >
          {pending ? <Spinner size="sm" /> : "Добавить ингредиент"}
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
