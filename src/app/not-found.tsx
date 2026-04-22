"use client";

import { buttonVariants } from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-8xl font-bold text-gray-300">404</div>

      <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>

      <div className="pt-6">
        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
