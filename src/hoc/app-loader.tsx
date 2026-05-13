"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Toast } from "@heroui/react";
import { useIngredientsStore } from "@/store/ingredients.store";

type AppLoaderProps = {
  children: React.ReactNode;
};

const AppLoader = ({ children }: AppLoaderProps) => {
  const { data: session, status } = useSession();
  const { loadIngredients } = useIngredientsStore();
  const { isAuth, setAuthState } = useAuthStore();

  useEffect(() => {
    setAuthState(session, status);
  }, [session, status, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  return (
    <>
      {children}
      <Toast.Provider placement="top end" />
    </>
  );
};

export default AppLoader;
