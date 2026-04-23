"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import RegistrationModal from "../modals.tsx/registration.modal";
import LoginModal from "../modals.tsx/login.modal";
import { signOutUser } from "@/app/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

interface HeaderItem {
  label: string;
  href: string;
}

interface HeaderProps {
  brand?: ReactNode;
  items: HeaderItem[];
  rightContent?: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  position?: "static" | "sticky" | "fixed";
}

const maxWidthClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1536px]",
  full: "max-w-full",
};

export function Header({
  brand,
  items,
  rightContent,
  className,
  maxWidth = "lg",
  position = "sticky",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuth, status, session, setAuthState } = useAuthStore();

  const pathName = usePathname();

  console.log("Session is AUTH", isAuth);
  console.log("Session is status", status);

  const handleSignOutUser = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setAuthState(null, "unauthenticated");
  };

  const getNavItems = () => {
    return items.map((item) => {
      const isActive = pathName === item.href;
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`px-3 py-1 rounded-md border border-transparent
            ${isActive ? "text-blue-500" : "text-foreground"}
            hover:text-blue-300 hover:border
            hover:border-blue-300 hover:rounded-md
            transition-colors
            transition-border
            duration-200`}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  const getNavItemsIsOpened = () => {
    return items.map((item) => {
      const isActive = pathName === item.href;
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`block py-2 ${
              isActive ? "font-medium text-accent" : ""
            }`}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav
      className={`h-65px z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg ${
        position === "sticky" ? "sticky top-0" : ""
      } ${position === "fixed" ? "fixed top-0" : ""} ${className ?? ""}`}
    >
      <header
        className={`flex h-16 items-center justify-between px-6 mx-auto ${
          maxWidth !== "full" ? maxWidthClasses[maxWidth] : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {brand}
        </div>
        <ul className="hidden items-center gap-4 md:flex">{getNavItems()}</ul>
        <div className="hidden w-[195px] shrink-0 items-center justify-end gap-4 md:flex">
          {status === "loading" ? (
            <Spinner size="md" />
          ) : isAuth ? (
            <>
              <p className="truncate">Привет, {session?.user?.email}</p>
              <Button
                className="text-white"
                variant="outline"
                onPress={handleSignOutUser}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button
                className="text-white"
                variant="outline"
                onPress={() => setIsLoginOpen(true)}
              >
                Вход
              </Button>
              <Button onPress={() => setIsRegistrationOpen(true)}>
                Регистрация
              </Button>
            </>
          )}
        </div>
      </header>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {getNavItemsIsOpened()}
            {rightContent && (
              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                {rightContent}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
