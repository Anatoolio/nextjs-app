import {
  getIngredients,
  deleteIngredient,
  createIngredient,
} from "@/app/actions/ingredients";
import { IIngredient } from "@/types/ingredient";
import { create } from "zustand";

type ActionResult = { success: true } | { success: false; error: string };

type TIngredientsStore = {
  ingredients: IIngredient[];
  isLoading: boolean;
  loadIngredients: () => Promise<ActionResult>;
  addIngredient: (formData: FormData) => Promise<ActionResult>;
  removeIngredient: (id: string) => Promise<ActionResult>;
};

export const useIngredientsStore = create<TIngredientsStore>((set) => ({
  ingredients: [],
  isLoading: false,
  loadIngredients: async () => {
    set({ isLoading: true });
    const result = await getIngredients();
    set({ isLoading: false });
    if (result.success) {
      set({ ingredients: result.ingredients });
      return { success: true };
    }
    return { success: false, error: result.error };
  },
  addIngredient: async (formData) => {
    set({ isLoading: true });
    const result = await createIngredient(formData);
    set({ isLoading: false });
    if (result.success) {
      set((state) => ({
        ingredients: [...state.ingredients, result.ingredient],
      }));
      return { success: true };
    }
    return { success: false, error: result.error };
  },
  removeIngredient: async (id) => {
    set({ isLoading: true });
    const result = await deleteIngredient(id);
    set({ isLoading: false });
    if (result.success) {
      set((state) => ({
        ingredients: state.ingredients.filter((i) => i.id !== id),
      }));
      return { success: true };
    }
    return { success: false, error: result.error };
  },
}));
