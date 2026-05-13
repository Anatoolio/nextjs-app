"use client";

import { siteConfig } from "@/app/config/siteConfig";
import { usePathname } from "next/navigation";

const Title = () => {
  const pathName = usePathname();
  const currentNavItem =
    siteConfig.pagesContent[pathName as keyof typeof siteConfig.pagesContent];
  const pageTitle = currentNavItem ? currentNavItem.title : siteConfig.title;
  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
